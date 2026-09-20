import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MessageCircle, Send, Sparkles, X, RefreshCcw } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api/concierge`;
const SESSION_KEY = 'tsb-concierge-session';

const SUGGESTIONS = [
  'What are your opening hours?',
  'How much is a Deluxe Facial?',
  'Recommend a treatment for tired skin',
  'Can I combine brows and a manicure?',
];

const GREETING = "Hi, I'm Amaya — your concierge at Two Sisters Beauty Salon. Ask me about services, pricing, or opening hours, and I'll help you plan your visit.";

export default function Concierge() {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [unread, setUnread] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Initialise session id + prior history from server
  useEffect(() => {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) {
      setSessionId(existing);
      axios.get(`${API}/history/${existing}`)
        .then(({ data }) => {
          const hist = (data.messages || []).map((m, i) => ({ id: `h-${i}`, role: m.role, content: m.content }));
          setMessages(hist.length ? hist : [{ id: 'greet', role: 'assistant', content: GREETING }]);
        })
        .catch(() => setMessages([{ id: 'greet', role: 'assistant', content: GREETING }]));
    } else {
      setMessages([{ id: 'greet', role: 'assistant', content: GREETING }]);
    }
  }, []);

  // Auto-scroll on new message
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, sending]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const send = async (text) => {
    const message = (text ?? input).trim();
    if (!message || sending) return;
    setError('');
    setInput('');
    const userMsg = { id: `u-${Date.now()}`, role: 'user', content: message };
    setMessages((prev) => [...prev, userMsg]);
    setSending(true);
    try {
      const { data } = await axios.post(`${API}/chat`, { session_id: sessionId, message });
      if (!sessionId && data.session_id) {
        setSessionId(data.session_id);
        sessionStorage.setItem(SESSION_KEY, data.session_id);
      }
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', content: data.reply }]);
      if (!open) setUnread(true);
    } catch (e) {
      setError('Sorry — I could not reach the concierge just now. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const reset = async () => {
    if (sessionId) {
      try { await axios.delete(`${API}/history/${sessionId}`); } catch {}
    }
    sessionStorage.removeItem(SESSION_KEY);
    setSessionId(null);
    setMessages([{ id: 'greet', role: 'assistant', content: GREETING }]);
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        aria-label={open ? 'Close concierge' : 'Open concierge'}
        onClick={() => setOpen((v) => !v)}
        className={`fixed z-[70] bottom-6 right-6 h-14 w-14 rounded-full flex items-center justify-center shadow-[0_20px_40px_-15px_hsl(var(--ink)/0.45)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'bg-[hsl(var(--ink))] text-[hsl(var(--gold))] rotate-90' : 'bg-[hsl(var(--gold))] text-[hsl(var(--ink))] hover:-translate-y-0.5 hover:shadow-[0_28px_50px_-15px_hsl(var(--gold)/0.55)]'}`}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
        {!open && unread && <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background animate-pulse" />}
      </button>

      {/* Panel */}
      <div
        className={`fixed z-[69] right-6 bottom-24 w-[min(400px,calc(100vw-2.5rem))] origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}
      >
        <div className="rounded-3xl overflow-hidden border border-border/70 bg-background/95 backdrop-blur-xl shadow-[0_40px_80px_-20px_hsl(var(--ink)/0.35)]">
          {/* Header */}
          <div className="relative flex items-center gap-3 px-5 py-4 bg-[hsl(var(--ink))] text-[hsl(var(--paper))] overflow-hidden">
            <span className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-[hsl(var(--gold))]/25 blur-[60px]" />
            <span className="relative h-10 w-10 rounded-full border border-[hsl(var(--gold))]/50 bg-[hsl(var(--gold))]/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-[hsl(var(--gold-soft))]" />
            </span>
            <div className="relative flex-1">
              <p className="font-display text-[20px] leading-none">Ask Amaya</p>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[hsl(var(--gold-soft))] mt-1">Beauty concierge</p>
            </div>
            <button onClick={reset} title="Start a new chat" className="relative h-8 w-8 rounded-full border border-white/15 flex items-center justify-center text-white/75 hover:text-white hover:bg-white/10 transition">
              <RefreshCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="max-h-[52vh] min-h-[280px] overflow-y-auto px-5 py-5 space-y-3 bg-background">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] text-[14.5px] leading-relaxed px-4 py-2.5 rounded-2xl whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-[hsl(var(--ink))] text-[hsl(var(--paper))] rounded-br-md'
                    : 'bg-[hsl(var(--paper))] dark:bg-[hsl(var(--ink-soft))] text-foreground border border-border/60 rounded-bl-md'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-[hsl(var(--paper))] dark:bg-[hsl(var(--ink-soft))] border border-border/60 rounded-bl-md">
                  <span className="inline-flex gap-1.5">
                    {[0,1,2].map(i => (
                      <span key={i} className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--gold-deep))] animate-bounce" style={{ animationDelay: `${i*140}ms` }} />
                    ))}
                  </span>
                </div>
              </div>
            )}
            {error && <p className="text-[12px] text-red-500">{error}</p>}
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && !sending && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="text-[12px] px-3 py-1.5 rounded-full border border-border/70 text-foreground/80 hover:border-[hsl(var(--gold))]/60 hover:text-foreground transition">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 pb-4 pt-2 border-t border-border/60 bg-background">
            <div className="flex items-end gap-2 rounded-2xl border border-border/70 focus-within:border-[hsl(var(--gold))]/70 bg-background px-3 py-2 transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Ask about services, pricing or hours…"
                rows={1}
                className="flex-1 resize-none bg-transparent outline-none text-[14.5px] max-h-[120px] py-1.5"
              />
              <button
                onClick={() => send()}
                disabled={sending || !input.trim()}
                aria-label="Send message"
                className="h-9 w-9 shrink-0 rounded-full bg-[hsl(var(--ink))] text-[hsl(var(--gold))] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-transform hover:-translate-y-0.5 dark:bg-[hsl(var(--gold))] dark:text-[hsl(var(--ink))]"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground text-center">AI concierge · answers may be approximate — call 03 930 0449 to confirm</p>
          </div>
        </div>
      </div>
    </>
  );
}
