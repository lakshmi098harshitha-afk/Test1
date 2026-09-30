import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from database.models.user import User
from database.models.outfit import Outfit
from database.models.favorite import Favorite
from schemas.favorite import Favorite as FavoriteSchema, FavoriteCreate
from services.auth_service import get_current_user

router = APIRouter(prefix="/api/favorites", tags=["Favorites"])


@router.get("/", response_model=List[FavoriteSchema])
def get_favorites(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get all favorites for current user."""
    favorites = db.query(Favorite).filter(Favorite.user_id == current_user.id).all()
    return favorites


@router.post("/", response_model=FavoriteSchema, status_code=status.HTTP_201_CREATED)
def add_favorite(
    favorite: FavoriteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Add outfit to favorites."""
    existing = (
        db.query(Favorite)
        .filter(
            Favorite.user_id == current_user.id, Favorite.outfit_id == favorite.outfit_id
        )
        .first()
    )
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Outfit already in favorites",
        )

    db_favorite = Favorite(
        user_id=current_user.id, outfit_id=favorite.outfit_id, **favorite.dict()
    )
    db.add(db_favorite)
    db.commit()
    db.refresh(db_favorite)
    return db_favorite


@router.delete("/{favorite_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_favorite(
    favorite_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Remove outfit from favorites."""
    favorite = (
        db.query(Favorite)
        .filter(
            Favorite.id == favorite_id, Favorite.user_id == current_user.id
        )
        .first()
    )
    if not favorite:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Favorite not found"
        )

    db.delete(favorite)
    db.commit()
    return None


@router.post("/outfit/{outfit_id}/toggle")
def toggle_favorite(
    outfit_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Toggle favorite status for an outfit."""
    existing = (
        db.query(Favorite)
        .filter(
            Favorite.user_id == current_user.id, Favorite.outfit_id == outfit_id
        )
        .first()
    )

    if existing:
        db.delete(existing)
        db.commit()
        return {"message": "Removed from favorites", "is_favorite": False}
    else:
        outfit = db.query(Outfit).filter(Outfit.id == outfit_id).first()
        if not outfit:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Outfit not found"
            )

        db_favorite = Favorite(
            user_id=current_user.id,
            outfit_id=outfit_id,
            outfit_name=outfit.name,
            items=str(outfit.items),
        )
        db.add(db_favorite)
        db.commit()
        db.refresh(db_favorite)
        return {"message": "Added to favorites", "is_favorite": True}