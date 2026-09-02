import test_case_agent
from requirement_agent import requirement_agent
from test_case_agent import test_case_chain
from bug_Analysis_Agent import bug_analysis_chain
from bug_faliure_agent import bug_faliure_agent


requirement = """
A customer should be able to log in to a food delivery application, search for a restaurant, add food items to the cart, apply a coupon, select a delivery address, make payment, and place the order.

The application supports UPI, credit/debit cards, and Cash on Delivery. A coupon SAVE20 gives 20% off on orders above ₹500, with a maximum discount of ₹150.
If payment fails, the order should not be created. If payment succeeds, the customer should receive an order confirmation with an order ID.

"""


# ==========================================
# AGENT 1 - REQUIREMENT ANALYSIS
# ==========================================

print("\n" + "=" * 70)
print("AGENT 1 - REQUIREMENT ANALYSIS")
print("=" * 70)

analysis_response = requirement_agent.invoke({
    "requirement": requirement
})

analysis = analysis_response.content

print(analysis)


# ==========================================
# AGENT 2 - TEST CASE GENERATION
# ==========================================

print("\n" + "=" * 70)
print("AGENT 2 - TEST CASE GENERATION")
print("=" * 70)

test_case_response = test_case_chain.invoke({
    "requirement": requirement,
    "analysis": analysis
})

test_cases = test_case_response.content

print(test_cases)

print("\nFULL RESPONSE:")
print(test_case_response)

print("\nCONTENT:")
print(test_case_response.content)


# ==========================================
#  BUG REPORT
# ==========================================

bug= """ 
A customer adds food worth 600 to the cart and applies the SAVE20 coupon.
Instead of giving a 120 discount, the syastem gives a discount of 200.
"""

# ==========================================
# AGENT 3 - BUG ANALYSIS
# ==========================================

print("\n" + "=" * 70)
print("AGENT 3 - BUG ANALYSIS")
print("=" * 70)

bug_analysis_response = bug_analysis_chain.invoke({
    "requirement": requirement,
    "bug": bug
})

bug_Analysis = bug_analysis_response.content


print(bug_Analysis)



# ==========================================
# AGENT 4 - BUG FALIURE
# ==========================================

print("\n" + "=" * 70)
print("AGENT 4 - BUG FALIURE REPORT")
print("=" * 70)

bug_faliure_agent = bug_faliure_chain.invoke({
    "requirement": requirement,
    "bug": bug,
    "analysis": bug_Analysis
})

bug_faliure= bug_faliure_agent.content

print(bug_faliure)

