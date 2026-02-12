from datetime import datetime
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel


class QAEntryBase(BaseModel):
    content: str
    author_name: str
    author_email: Optional[str] = None
    parent_id: Optional[UUID] = None


class QAEntryCreate(QAEntryBase):
    pass


class QAEntry(QAEntryBase):
    id: UUID
    created_at: datetime
    answers: List["QAEntry"] = []

    class Config:
        from_attributes = True


class FeedbackBase(BaseModel):
    content: str
    name: str
    email: Optional[str] = None


class FeedbackCreate(FeedbackBase):
    pass


class Feedback(FeedbackBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
