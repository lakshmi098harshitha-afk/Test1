from pydantic import BaseModel
from typing import Optional, Dict, Any


class RecommendationBase(BaseModel):
    occasion: Optional[str] = None
    season: Optional[str] = None
    style: Optional[str] = None
    color: Optional[str] = None
    budget: Optional[str] = None
    recommendation_data: Optional[Dict[str, Any]] = None


class RecommendationCreate(RecommendationBase):
    pass


class Recommendation(RecommendationBase):
    id: int
    user_id: int
    created_at: str

    class Config:
        from_attributes = True