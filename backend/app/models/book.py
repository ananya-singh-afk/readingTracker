from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Book(BaseModel):
    id: Optional[str] = None
    title: str
    author: str
    cover_url: Optional[str] = None
    total_pages: int
    current_page: int = 0
    status: str  # "to-read", "reading", "completed"
    start_date: Optional[str] = None
    completed_date: Optional[str] = None
    rating: Optional[int] = None
    notes: Optional[str] = None
    created_at: Optional[str] = None

class ReadingLog(BaseModel):
    id: Optional[str] = None
    book_id: str
    date: str
    pages_read: int
    duration_minutes: Optional[int] = None
    notes: Optional[str] = None
    created_at: Optional[str] = None

class Goal(BaseModel):
    id: Optional[str] = None
    goal_type: str  # "daily", "weekly", "monthly", "yearly"
    target_pages: Optional[int] = None
    target_books: Optional[int] = None
    period_start: str
    period_end: str
    created_at: str
