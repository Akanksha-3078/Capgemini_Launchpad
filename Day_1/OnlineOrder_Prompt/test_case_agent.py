from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model


test_case_prompt = ChatPromptTemplate.from_messages([
 (
    "system",
     """
You are an expert software test engineer.

Generate detailed test cases based only on the given requirement
and requirement analysis.

For every test case provide:

Test Case ID
Test Scenario
Test Type
Preconditions
Test Steps
Test Data
Expected Result
Priority

Generate test cases for:

1. Positive scenarios
2. Negative scenarios
3. Boundary scenarios
4. Validation scenarios
5. Cart - add/remove items
6. SAVE20 coupon - 20% discount, above ₹500, maximum ₹150
7. Payment - UPI, Credit/Debit Card, COD
8. Successful and failed orders
9. Order confirmation and Order ID

Important:
- Do not invent functionality.
- Test the ₹500 boundary, including below, exactly ₹500 and above ₹500.
- Verify the ₹150 maximum discount.
- If payment fails, verify that the order is NOT created.
- If a requirement is ambiguous, mention "Requirement clarification needed".
- Avoid duplicate test cases.
"""
 ),
 (
     "human",
     """
Requirement:

{requirement}

Requirement Analysis:

{analysis}
"""
 )
])


test_case_chain = test_case_prompt | chat_model