"""Two Sisters Beauty Salon — AI Concierge."""
import os
from datetime import datetime
from typing import List, Optional
from uuid import uuid4

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

concierge_router = APIRouter(prefix="/api/concierge", tags=["concierge"])

EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY")

SYSTEM_MESSAGE = """You are Amaya, the warm, considered concierge for Two Sisters Beauty Salon in Christchurch, New Zealand.

BUSINESS FACTS (only source of truth — never invent):
- Location: 327 Stanmore Road, Richmond, Christchurch 8013
- Phone: 03 930 0449 · Email: twosistersbeautychch@gmail.com
- Hours: Monday–Saturday 9:00am–6:00pm. Closed Sunday.
- Online bookings: https://bookings.gettimely.com (via Timely)
- All prices are in NZD.

SERVICES & PRICES (a full guide):
Threading & Waxing: Eyebrows Shape $14 · Upper Lip/Chin/Forehead $8 · Cheek/Nose/Ear $8 · Side Burns $13 · Neck $15 · Full Face $55 · Underarms $15 · Stomach $18 · Back $32 · Half Arms $18 · ¾ Arms $22 · Full Arms $28 · Half Legs $28 · ¾ Legs $32 · Full Legs $42 · Bikini $20 · Bikini Extended $25 · Bikini & Full Legs $55 · Brazilian Maintenance (within 5 weeks) $40 · Brazilian First Visit $50 · Brazilian Maintenance & Full Legs $78 · Brazilian First Visit & Full Legs $88 · Full Body $190.
Henna Brows: Henna Brows $39 · Henna Brow & Shape $48.
Lash Lift & Perming: Lash Lift $60 · Lash Lift + Tint $70.
Tinting: Eyebrows Tint $12 · Eyelashes Tint $16 · Eyetrio (Brow Shape, Tint & Lash Tint) $39 · Eyetrio + Head Massage $42.
Massage: Coconut Oil Head Massage (20 min) $25.
Facials: Express Facial (45 min) $55 · Calming Anti-Stress Facial (1 hr) $110 · Clear Skin Facial (1 hr) $80 · Deluxe Facial (1 hr) $95.
Men's Threading & Waxing: Eyebrows Shape $15 · Nose/Ear $12 · Back $35 · Chest $30 · Shoulders $20 · Chest & Shoulders $42 · Back & Shoulders $48 · Chest & Stomach $48 · Half Arms $28 · Full Arms $38 · Half Legs $38 · ¾ Legs $48.
Piercing: Ear Piercing from $45 · Ear Piercing – Cubic Zirconia (2mm & 3mm) $45 · Ear Piercing – Mirror Ball $50 · Nose Piercing $55.
Manicure: Express Tidy (no polish) $30 · Express Tidy (polish) $35 · Express Tidy gel (no removal) $40 · Express Tidy gel (with removal) $45 · Classic (traditional polish) $50 · Classic (gel) $55 · Gel Polish Colour Add-On $15 · Gel Removal Only $15 · French Finish $10 · Nail Art per nail $5 · Nail Repair per nail $8 · Children's Gel Manicure (under 12) $35 · Children's Manicure traditional (under 12) $25 · Children's Manicure polish only (under 12) $15.
Pedicure: Express Tidy (traditional polish) $40 · Express Tidy (gel) $45 · Classic (traditional polish) $60 · Classic (gel) $65 · 10-Min Massage Add-On $10 · Children's Gel Pedicure (under 12) $40 · Children's Pedicure traditional (under 12) $30 · Children's Pedicure polish only (under 12) $15.
Nail Trim & Shape: Hands $12 · Toes $15.

STYLE:
- Warm, elegant, unhurried. Use short paragraphs and gentle language.
- Prefer plain sentences over long bullet lists. When listing more than three prices, use tidy bullets.
- Always give the exact NZD price when asked, and mention combinations that save money when relevant.
- If asked something outside our services (medical advice, third-party products, etc.), politely redirect to booking a consult or contacting the salon.
- Never invent staff names, promotions, or availability. If you don't know something, say so and suggest calling 03 930 0449.
- End replies gently, occasionally inviting the guest to book online or call — do not be pushy.
- Keep replies under ~120 words unless the guest asked for a full price list.
"""

# ------------------------- Models -------------------------
class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    session_id: str
    role: str  # 'user' | 'assistant'
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    message: str


class ChatResponse(BaseModel):
    session_id: str
    reply: str


class HistoryResponse(BaseModel):
    session_id: str
    messages: List[dict]


# ------------------------- Helpers -------------------------
async def _load_history(db, session_id: str) -> List[dict]:
    cur = db.concierge_messages.find({"session_id": session_id}).sort("created_at", 1)
    return [{"role": m["role"], "content": m["content"], "created_at": m["created_at"].isoformat()} async for m in cur]


async def _save_message(db, session_id: str, role: str, content: str) -> None:
    doc = ChatMessage(session_id=session_id, role=role, content=content).dict()
    await db.concierge_messages.insert_one(doc)


def _make_chat(session_id: str) -> LlmChat:
    if not EMERGENT_LLM_KEY:
        raise HTTPException(500, "EMERGENT_LLM_KEY is not configured on the server")
    return LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id,
        system_message=SYSTEM_MESSAGE,
    ).with_model("openai", "gpt-5.4")


# ------------------------- Routes -------------------------
def register_concierge(app, db):
    """Mount the concierge routes onto `app`, using the provided Mongo `db`."""

    @concierge_router.post("/chat", response_model=ChatResponse)
    async def chat(req: ChatRequest):
        if not req.message or not req.message.strip():
            raise HTTPException(400, "Message is required")

        session_id = req.session_id or str(uuid4())

        # Restore memory: create a fresh LlmChat and replay stored turns via get/set is
        # not exposed, so we prepend history into the current user message as gentle
        # context if needed. However LlmChat maintains its own memory in-process only,
        # so for persistence across cold requests we manually feed history.
        chat_client = _make_chat(session_id)

        # Rehydrate: replay any prior turns as UserMessage/AssistantMessage silently.
        history = await _load_history(db, session_id)
        if history:
            # Feed context via a compact system-style preface in this turn so that
            # returning visitors get consistent replies without doubling costs.
            preface_parts = []
            for h in history[-12:]:  # last 12 turns is plenty
                who = "Guest" if h["role"] == "user" else "Amaya"
                preface_parts.append(f"{who}: {h['content']}")
            preface = (
                "Recent conversation with this guest (for your memory only, do not repeat):\n"
                + "\n".join(preface_parts)
                + "\n\nNew message from the guest:\n"
            )
            user_text = preface + req.message
        else:
            user_text = req.message

        try:
            reply = await chat_client.send_message(UserMessage(text=user_text))
        except Exception as e:
            raise HTTPException(502, f"Concierge is unavailable right now: {e}")

        await _save_message(db, session_id, "user", req.message)
        await _save_message(db, session_id, "assistant", reply)

        return ChatResponse(session_id=session_id, reply=reply)

    @concierge_router.get("/history/{session_id}", response_model=HistoryResponse)
    async def history(session_id: str):
        msgs = await _load_history(db, session_id)
        return HistoryResponse(session_id=session_id, messages=msgs)

    @concierge_router.delete("/history/{session_id}")
    async def clear_history(session_id: str):
        await db.concierge_messages.delete_many({"session_id": session_id})
        return {"ok": True}

    app.include_router(concierge_router)
