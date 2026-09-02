from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model


bug_analysis_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are an expert software testing and bug analysis engineer.

Analyze the reported bug based on the requirement and identify:

1. Bug Summary
2. Expected Result
3. Actual Result
4. Root Cause
5. Severity
6. Priority
7. Impact
8. Recommended Fix

Important:
- Compare the actual behavior with the given requirement.
- Do not invent functionality or causes not supported by the information.
- Clearly mention if the root cause cannot be determined.
- For calculation or validation bugs, explain the expected calculation.
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}

Bug Report:

{bug}
"""
    )
])


bug_analysis_chain = bug_analysis_prompt | chat_model