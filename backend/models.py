import uuid
from datetime import datetime, date
from typing import Optional, List
from pydantic import BaseModel, Field

# --- User & Auth Models ---
class ElderlyLoginRequest(BaseModel):
    name: str
    date_of_birth: str  # Formats: YYYY-MM-DD or DD/MM/YYYY or "15 August 1954"

class CaregiverLoginRequest(BaseModel):
    email: str
    password: str

class UserProfile(BaseModel):
    user_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    age: int
    gender: str = "Female"
    date_of_birth: str
    region: str = "Assam"
    preferred_language: str = "en"
    dementia_stage: Optional[str] = "Mild Cognitive Impairment (Caregiver noted)"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class CaregiverProfile(BaseModel):
    caregiver_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    name: str
    relation: str = "Daughter"
    phone: str = "+91 98765 43210"
    email: str = "caregiver@neuronest.org"
    created_at: datetime = Field(default_factory=datetime.utcnow)

# --- Game & Session Models ---
class GameItem(BaseModel):
    game_id: str
    name: str
    category: str
    difficulty_level: int = 1  # 1: Easy, 2: Medium, 3: Hard
    description: str
    image_url: str = ""
    created_at: datetime = Field(default_factory=datetime.utcnow)

class GameSessionCreate(BaseModel):
    user_id: str
    game_id: str
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    score: int
    accuracy: float
    response_time: float
    attempts: int
    difficulty_level: int = 1

class GameSession(GameSessionCreate):
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)

# --- Recommendation & Difficulty ---
class RecommendationItem(BaseModel):
    rec_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    game_id: str
    game_name: str
    category: str
    recommended_difficulty: int
    recommendation_score: float
    reason: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AdaptiveDifficultyRequest(BaseModel):
    user_id: str
    game_id: str
    recent_accuracy: float
    recent_response_time: float
    current_difficulty: int

class AdaptiveDifficultyResponse(BaseModel):
    game_id: str
    previous_difficulty: int
    adjusted_difficulty: int
    difficulty_label: str
    reason: str
    message: str

# --- Daily Tasks & Memory Companion ---
class DailyTask(BaseModel):
    task_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    title: str
    description: str
    scheduled_time: str
    status: str = "pending"  # "pending", "completed"
    completed_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class DailyTaskCreate(BaseModel):
    user_id: str
    title: str
    description: str
    scheduled_time: str

class MemoryItem(BaseModel):
    memory_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    category: str  # "people", "places", "schedule", "routine", "medicine", "notes"
    title: str
    description: str
    reminder_time: Optional[str] = None
    photo_url: Optional[str] = None
    relation: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MemoryItemCreate(BaseModel):
    user_id: str
    category: str
    title: str
    description: str
    reminder_time: Optional[str] = None
    photo_url: Optional[str] = None
    relation: Optional[str] = None

# --- Voice Interaction ---
class VoiceInteractRequest(BaseModel):
    user_id: str
    user_message: str
    language: str = "en"  # "en", "hi", "te"

class VoiceInteractResponse(BaseModel):
    interaction_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_message: str
    assistant_response: str
    language: str
    intent: str
    action: Optional[str] = None
    action_data: Optional[dict] = None
