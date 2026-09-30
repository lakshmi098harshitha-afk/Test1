import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from database.models.user import User
from database.models.profile import Profile
from schemas.profile import Profile as ProfileSchema, ProfileCreate
from services.auth_service import get_current_user

router = APIRouter(prefix="/api/profile", tags=["Profile"])


@router.get("/", response_model=ProfileSchema)
def get_profile(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Get current user's profile."""
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        return {
            "id": None,
            "user_id": current_user.id,
            "name": None,
            "gender": None,
            "age": None,
            "height": None,
            "clothing_preferences": None,
            "favorite_colors": None,
            "preferred_styles": None,
            "occasions": None,
            "budget": None,
        }
    return profile


@router.put("/", response_model=ProfileSchema)
def update_profile(
    profile_data: ProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update current user's profile."""
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()

    if profile:
        for key, value in profile_data.dict(exclude_unset=True).items():
            setattr(profile, key, value)
    else:
        profile = Profile(user_id=current_user.id, **profile_data.dict())

    db.commit()
    db.refresh(profile)
    return profile


@router.post("/", response_model=ProfileSchema, status_code=status.HTTP_201_CREATED)
def create_profile(
    profile_data: ProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create new profile for current user."""
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if profile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Profile already exists"
        )

    profile = Profile(user_id=current_user.id, **profile_data.dict())
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile