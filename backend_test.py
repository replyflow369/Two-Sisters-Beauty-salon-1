#!/usr/bin/env python3
"""
Backend API Tests for Two Sisters Beauty Salon - AI Concierge
Tests all concierge endpoints as specified in the review request.
"""
import requests
import json
import sys
from typing import Dict, Any

# Backend URL from frontend/.env
BASE_URL = "https://award-worthy-design-1.preview.emergentagent.com/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def print_test_header(test_name: str):
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'='*80}{Colors.RESET}")
    print(f"{Colors.BLUE}{Colors.BOLD}TEST: {test_name}{Colors.RESET}")
    print(f"{Colors.BLUE}{Colors.BOLD}{'='*80}{Colors.RESET}")

def print_pass(message: str):
    print(f"{Colors.GREEN}✓ PASS: {message}{Colors.RESET}")

def print_fail(message: str):
    print(f"{Colors.RED}✗ FAIL: {message}{Colors.RESET}")

def print_info(message: str):
    print(f"{Colors.YELLOW}ℹ INFO: {message}{Colors.RESET}")

def print_response(response: requests.Response):
    print(f"\n{Colors.YELLOW}Response Status: {response.status_code}{Colors.RESET}")
    try:
        print(f"{Colors.YELLOW}Response Body:{Colors.RESET}")
        print(json.dumps(response.json(), indent=2))
    except:
        print(f"{Colors.YELLOW}Response Text: {response.text}{Colors.RESET}")

# Test Results Tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "tests": []
}

def record_result(test_name: str, passed: bool, details: str = ""):
    test_results["tests"].append({
        "name": test_name,
        "passed": passed,
        "details": details
    })
    if passed:
        test_results["passed"] += 1
    else:
        test_results["failed"] += 1

def test_1_first_chat_without_session():
    """Test 1: POST /api/concierge/chat without session_id"""
    print_test_header("Test 1: First Chat Without Session ID")
    
    try:
        payload = {"message": "What are your opening hours?"}
        print_info(f"POST {BASE_URL}/concierge/chat")
        print_info(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(f"{BASE_URL}/concierge/chat", json=payload, timeout=30)
        print_response(response)
        
        # Check HTTP 200
        if response.status_code != 200:
            print_fail(f"Expected status 200, got {response.status_code}")
            record_result("Test 1: First chat without session_id", False, f"Status code: {response.status_code}")
            return None
        
        print_pass("Status code is 200")
        
        # Check response structure
        data = response.json()
        
        if "session_id" not in data:
            print_fail("Response missing 'session_id' field")
            record_result("Test 1: First chat without session_id", False, "Missing session_id field")
            return None
        
        print_pass(f"session_id present: {data['session_id']}")
        
        if "reply" not in data:
            print_fail("Response missing 'reply' field")
            record_result("Test 1: First chat without session_id", False, "Missing reply field")
            return None
        
        reply = data["reply"]
        print_pass(f"reply present (length: {len(reply)} chars)")
        
        # Print the actual reply for manual verification
        print(f"\n{Colors.BOLD}ACTUAL REPLY TEXT:{Colors.RESET}")
        print(f"{Colors.YELLOW}{reply}{Colors.RESET}")
        
        # Check if reply contains business hours information
        reply_lower = reply.lower()
        has_9 = "9" in reply
        has_6 = "6" in reply
        has_day = "monday" in reply_lower or "sunday" in reply_lower or "saturday" in reply_lower
        
        if has_9 and has_6 and has_day:
            print_pass("Reply contains business hours info (9, 6, and day mention)")
        else:
            print_fail(f"Reply missing expected business hours info (has_9={has_9}, has_6={has_6}, has_day={has_day})")
            record_result("Test 1: First chat without session_id", False, "Reply missing business hours info")
            return data["session_id"]
        
        record_result("Test 1: First chat without session_id", True, f"session_id: {data['session_id']}")
        return data["session_id"]
        
    except Exception as e:
        print_fail(f"Exception occurred: {str(e)}")
        record_result("Test 1: First chat without session_id", False, str(e))
        return None

def test_2_chat_with_session(session_id: str):
    """Test 2: POST /api/concierge/chat with session_id asking about price"""
    print_test_header("Test 2: Chat With Session ID - Price Query")
    
    if not session_id:
        print_fail("No session_id from Test 1, skipping")
        record_result("Test 2: Chat with session_id", False, "No session_id available")
        return False
    
    try:
        payload = {
            "session_id": session_id,
            "message": "How much is a Deluxe Facial?"
        }
        print_info(f"POST {BASE_URL}/concierge/chat")
        print_info(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(f"{BASE_URL}/concierge/chat", json=payload, timeout=30)
        print_response(response)
        
        # Check HTTP 200
        if response.status_code != 200:
            print_fail(f"Expected status 200, got {response.status_code}")
            record_result("Test 2: Chat with session_id", False, f"Status code: {response.status_code}")
            return False
        
        print_pass("Status code is 200")
        
        data = response.json()
        reply = data.get("reply", "")
        
        # Print the actual reply for manual verification
        print(f"\n{Colors.BOLD}ACTUAL REPLY TEXT:{Colors.RESET}")
        print(f"{Colors.YELLOW}{reply}{Colors.RESET}")
        
        # Check if reply contains $95
        if "$95" in reply:
            print_pass("Reply contains '$95' (Deluxe Facial price)")
            record_result("Test 2: Chat with session_id", True, "Price $95 found in reply")
            return True
        else:
            print_fail("Reply does not contain '$95'")
            record_result("Test 2: Chat with session_id", False, "Price $95 not found in reply")
            return False
        
    except Exception as e:
        print_fail(f"Exception occurred: {str(e)}")
        record_result("Test 2: Chat with session_id", False, str(e))
        return False

def test_3_get_history(session_id: str):
    """Test 3: GET /api/concierge/history/{session_id}"""
    print_test_header("Test 3: Get Chat History")
    
    if not session_id:
        print_fail("No session_id from Test 1, skipping")
        record_result("Test 3: Get chat history", False, "No session_id available")
        return False
    
    try:
        url = f"{BASE_URL}/concierge/history/{session_id}"
        print_info(f"GET {url}")
        
        response = requests.get(url, timeout=10)
        print_response(response)
        
        # Check HTTP 200
        if response.status_code != 200:
            print_fail(f"Expected status 200, got {response.status_code}")
            record_result("Test 3: Get chat history", False, f"Status code: {response.status_code}")
            return False
        
        print_pass("Status code is 200")
        
        data = response.json()
        
        if "messages" not in data:
            print_fail("Response missing 'messages' field")
            record_result("Test 3: Get chat history", False, "Missing messages field")
            return False
        
        messages = data["messages"]
        print_pass(f"messages array present with {len(messages)} items")
        
        # Should have at least 4 messages (2 user + 2 assistant)
        if len(messages) < 4:
            print_fail(f"Expected at least 4 messages, got {len(messages)}")
            record_result("Test 3: Get chat history", False, f"Only {len(messages)} messages")
            return False
        
        print_pass(f"Has at least 4 messages ({len(messages)} total)")
        
        # Check roles alternate starting with user
        if messages[0]["role"] != "user":
            print_fail(f"First message should be 'user', got '{messages[0]['role']}'")
            record_result("Test 3: Get chat history", False, "First message not from user")
            return False
        
        print_pass("First message is from 'user'")
        
        # Check alternating pattern
        expected_roles = ["user", "assistant", "user", "assistant"]
        actual_roles = [m["role"] for m in messages[:4]]
        
        if actual_roles == expected_roles:
            print_pass("Roles alternate correctly (user, assistant, user, assistant)")
        else:
            print_fail(f"Roles don't alternate correctly. Expected {expected_roles}, got {actual_roles}")
            record_result("Test 3: Get chat history", False, f"Roles: {actual_roles}")
            return False
        
        record_result("Test 3: Get chat history", True, f"{len(messages)} messages with correct structure")
        return True
        
    except Exception as e:
        print_fail(f"Exception occurred: {str(e)}")
        record_result("Test 3: Get chat history", False, str(e))
        return False

def test_4_empty_message():
    """Test 4: POST /api/concierge/chat with empty message"""
    print_test_header("Test 4: Chat With Empty Message (Error Handling)")
    
    try:
        payload = {"message": ""}
        print_info(f"POST {BASE_URL}/concierge/chat")
        print_info(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(f"{BASE_URL}/concierge/chat", json=payload, timeout=10)
        print_response(response)
        
        # Should return HTTP 400
        if response.status_code == 400:
            print_pass("Status code is 400 (Bad Request) as expected")
            record_result("Test 4: Empty message error handling", True, "Returns 400 for empty message")
            return True
        else:
            print_fail(f"Expected status 400, got {response.status_code}")
            record_result("Test 4: Empty message error handling", False, f"Status code: {response.status_code}")
            return False
        
    except Exception as e:
        print_fail(f"Exception occurred: {str(e)}")
        record_result("Test 4: Empty message error handling", False, str(e))
        return False

def test_5_delete_history(session_id: str):
    """Test 5: DELETE /api/concierge/history/{session_id}"""
    print_test_header("Test 5: Delete Chat History")
    
    if not session_id:
        print_fail("No session_id from Test 1, skipping")
        record_result("Test 5: Delete chat history", False, "No session_id available")
        return False
    
    try:
        url = f"{BASE_URL}/concierge/history/{session_id}"
        print_info(f"DELETE {url}")
        
        response = requests.delete(url, timeout=10)
        print_response(response)
        
        # Check response
        if response.status_code != 200:
            print_fail(f"Expected status 200, got {response.status_code}")
            record_result("Test 5: Delete chat history", False, f"Status code: {response.status_code}")
            return False
        
        print_pass("Status code is 200")
        
        data = response.json()
        if data.get("ok") == True:
            print_pass("Response contains {ok: true}")
        else:
            print_fail(f"Expected {{ok: true}}, got {data}")
            record_result("Test 5: Delete chat history", False, f"Unexpected response: {data}")
            return False
        
        # Verify history is now empty
        print_info("Verifying history is now empty...")
        get_response = requests.get(url, timeout=10)
        
        if get_response.status_code == 200:
            get_data = get_response.json()
            messages = get_data.get("messages", [])
            
            if len(messages) == 0:
                print_pass("History is now empty (0 messages)")
                record_result("Test 5: Delete chat history", True, "History cleared successfully")
                return True
            else:
                print_fail(f"History still has {len(messages)} messages after delete")
                record_result("Test 5: Delete chat history", False, f"History not cleared: {len(messages)} messages remain")
                return False
        else:
            print_fail(f"Could not verify empty history, status: {get_response.status_code}")
            record_result("Test 5: Delete chat history", False, "Could not verify empty history")
            return False
        
    except Exception as e:
        print_fail(f"Exception occurred: {str(e)}")
        record_result("Test 5: Delete chat history", False, str(e))
        return False

def test_6_legacy_endpoint():
    """Test 6: GET /api/ (legacy endpoint)"""
    print_test_header("Test 6: Legacy Root Endpoint")
    
    try:
        url = f"{BASE_URL}/"
        print_info(f"GET {url}")
        
        response = requests.get(url, timeout=10)
        print_response(response)
        
        # Check HTTP 200
        if response.status_code != 200:
            print_fail(f"Expected status 200, got {response.status_code}")
            record_result("Test 6: Legacy endpoint", False, f"Status code: {response.status_code}")
            return False
        
        print_pass("Status code is 200")
        
        data = response.json()
        
        if data.get("message") == "Hello World":
            print_pass("Response contains {message: 'Hello World'}")
            record_result("Test 6: Legacy endpoint", True, "Returns Hello World")
            return True
        else:
            print_fail(f"Expected {{message: 'Hello World'}}, got {data}")
            record_result("Test 6: Legacy endpoint", False, f"Unexpected response: {data}")
            return False
        
    except Exception as e:
        print_fail(f"Exception occurred: {str(e)}")
        record_result("Test 6: Legacy endpoint", False, str(e))
        return False

def print_summary():
    """Print final test summary"""
    print(f"\n{Colors.BOLD}{'='*80}{Colors.RESET}")
    print(f"{Colors.BOLD}TEST SUMMARY{Colors.RESET}")
    print(f"{Colors.BOLD}{'='*80}{Colors.RESET}")
    
    total = test_results["passed"] + test_results["failed"]
    print(f"\nTotal Tests: {total}")
    print(f"{Colors.GREEN}Passed: {test_results['passed']}{Colors.RESET}")
    print(f"{Colors.RED}Failed: {test_results['failed']}{Colors.RESET}")
    
    print(f"\n{Colors.BOLD}Detailed Results:{Colors.RESET}")
    for i, test in enumerate(test_results["tests"], 1):
        status = f"{Colors.GREEN}✓ PASS{Colors.RESET}" if test["passed"] else f"{Colors.RED}✗ FAIL{Colors.RESET}"
        print(f"{i}. {status} - {test['name']}")
        if test["details"]:
            print(f"   Details: {test['details']}")
    
    print(f"\n{Colors.BOLD}{'='*80}{Colors.RESET}\n")
    
    return test_results["failed"] == 0

def main():
    print(f"\n{Colors.BOLD}{Colors.BLUE}Two Sisters Beauty Salon - AI Concierge Backend Tests{Colors.RESET}")
    print(f"{Colors.BOLD}Backend URL: {BASE_URL}{Colors.RESET}\n")
    
    # Run tests in sequence
    session_id = test_1_first_chat_without_session()
    test_2_chat_with_session(session_id)
    test_3_get_history(session_id)
    test_4_empty_message()
    test_5_delete_history(session_id)
    test_6_legacy_endpoint()
    
    # Print summary
    all_passed = print_summary()
    
    # Exit with appropriate code
    sys.exit(0 if all_passed else 1)

if __name__ == "__main__":
    main()
