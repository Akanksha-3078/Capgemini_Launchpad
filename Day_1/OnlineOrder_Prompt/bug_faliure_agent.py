from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model


bug_analysis_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are an expert software testing engineer.

Create a clear bug faliure report based on the requirement and bug analysis.

1. Bug ID
2. Bug Title
3. Discription
4. Preconditions
5. Test Data
6. Expected Result
7. Actual Result
8. Severity
9. Priority
10. Status

Important:
- Use only the information provided.
- Do not invent missing details.
- Clearly mention the difference between actual and expected results.
- If information is missing please mention "Not Provided".
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}

Bug Report:

{bug}

Bug Analysis:

{analysis}
"""
    )
])


bug_faliure_chain = bug_analysis_prompt | chat_model