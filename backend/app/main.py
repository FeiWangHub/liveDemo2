from typing import List
from uuid import UUID

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .models import Feedback, FeedbackCreate, QAEntry, QAEntryCreate
from .supabase_client import supabase

app = FastAPI(title="ABC AI Community Q&A API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to ABC AI Community Q&A API"}


@app.get("/qa", response_model=List[QAEntry])
async def get_all_qa():
    # Fetch all entries
    response = (
        supabase.table("qa_entries")
        .select("*")
        .order("created_at", desc=True)
        .execute()
    )

    if not response.data:
        return []

    # Organize into questions and answers
    entries = response.data
    questions = [e for e in entries if e["parent_id"] is None]
    answers = [e for e in entries if e["parent_id"] is not None]

    # Map answers to questions
    qa_map = {str(q["id"]): {**q, "answers": []} for q in questions}

    for a in answers:
        parent_id = str(a["parent_id"])
        if parent_id in qa_map:
            qa_map[parent_id]["answers"].append(a)

    return list(qa_map.values())


@app.post("/qa", response_model=QAEntry)
async def create_qa_entry(entry: QAEntryCreate):
    entry_dict = entry.dict()
    if entry_dict["parent_id"]:
        entry_dict["parent_id"] = str(entry_dict["parent_id"])

    response = supabase.table("qa_entries").insert(entry_dict).execute()

    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create entry")

    result = response.data[0]
    result["answers"] = []
    return result


@app.delete("/qa/{entry_id}")
async def delete_qa_entry(entry_id: UUID):
    response = supabase.table("qa_entries").delete().eq("id", str(entry_id)).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Entry not found")
    return {"message": "Entry deleted successfully"}


@app.get("/feedback", response_model=List[Feedback])
async def get_all_feedback():
    response = (
        supabase.table("feedback").select("*").order("created_at", desc=True).execute()
    )
    return response.data or []


@app.post("/feedback", response_model=Feedback)
async def create_feedback(feedback: FeedbackCreate):
    response = supabase.table("feedback").insert(feedback.dict()).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create feedback")
    return response.data[0]
