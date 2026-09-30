import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from database import get_db
from database.models.user import User
from database.models.outfit import Outfit
from database.models.profile import Profile
from schemas.recommendation import Recommendation as RecommendationSchema, RecommendationCreate
from services.auth_service import get_current_user
from services.ai_stylist_service import AIStylistService

router = APIRouter(prefix="/api/recommendations", tags=["Recommendations"])


@router.get("/preview", response_model=dict)
def preview_recommendation(
    occasion: str = Query("Casual", description="Occasion for outfit"),
    gender: str = Query("Male", description="User's gender"),
    season: Optional[str] = Query(None, description="Season"),
    style: Optional[str] = Query(None, description="Preferred style"),
    color: Optional[str] = Query(None, description="Preferred colors"),
    budget: Optional[str] = Query(None, description="Budget range"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Preview AI-generated outfit recommendation."""
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    use_gender = gender
    if profile and profile.gender:
        use_gender = profile.gender

    ai_service = AIStylistService()
    recommendation = ai_service.generate_full_outfit(
        occasion=occasion,
        gender=use_gender,
        season=season,
        style=style,
        color=color,
        budget=budget,
    )

    return recommendation


@router.post("/", response_model=Outfit)
def save_recommendation(
    outfit_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Save a recommendation as an outfit."""
    outfit = Outfit(
        user_id=current_user.id,
        name=outfit_data.get("name", "Saved Outfit"),
        description=outfit_data.get("description", "AI-generated outfit"),
        occasion=outfit_data.get("occasion", "Casual"),
        season=outfit_data.get("season"),
        style=outfit_data.get("style"),
        budget=outfit_data.get("budget"),
        items=outfit_data.get("items"),
        image_url=outfit_data.get("image_url"),
        is_favorite="false",
    )
    db.add(outfit)
    db.commit()
    db.refresh(outfit)
    return outfit


@router.get("/history", response_model=List[dict])
def get_recommendation_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    limit: int = Query(10, description="Number of results"),
):
    """Get recommendation history."""
    outfits = (
        db.query(Outfit)
        .filter(Outfit.user_id == current_user.id)
        .order_by(Outfit.created_at.desc())
        .limit(limit)
        .all()
    )
    return [outfit for outfit in outfits]