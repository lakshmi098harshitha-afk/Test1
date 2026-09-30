import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from database.models.user import User
from database.models.wardrobe import WardrobeItem
from schemas.wardrobe import WardrobeItem as WardrobeItemSchema, WardrobeItemCreate
from services.auth_service import get_current_user

router = APIRouter(prefix="/api/wardrobe", tags=["Wardrobe"])


@router.get("/", response_model=List[WardrobeItemSchema])
def get_wardrobe(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    category: Optional[str] = Query(None, description="Filter by category"),
):
    """Get all wardrobe items for current user."""
    query = db.query(WardrobeItem).filter(WardrobeItem.user_id == current_user.id)

    if category:
        query = query.filter(WardrobeItem.category == category)

    items = query.all()
    return items


@router.get("/{item_id}", response_model=WardrobeItemSchema)
def get_wardrobe_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get specific wardrobe item."""
    item = db.query(WardrobeItem).filter(
        WardrobeItem.id == item_id, WardrobeItem.user_id == current_user.id
    ).first()
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Item not found"
        )
    return item


@router.post("/", response_model=WardrobeItemSchema, status_code=status.HTTP_201_CREATED)
def add_wardrobe_item(
    item: WardrobeItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Add new item to wardrobe."""
    db_item = WardrobeItem(user_id=current_user.id, **item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.put("/{item_id}", response_model=WardrobeItemSchema)
def update_wardrobe_item(
    item_id: int,
    item: WardrobeItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update existing wardrobe item."""
    db_item = db.query(WardrobeItem).filter(
        WardrobeItem.id == item_id, WardrobeItem.user_id == current_user.id
    ).first()
    if not db_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Item not found"
        )

    for key, value in item.dict(exclude_unset=True).items():
        setattr(db_item, key, value)

    db.commit()
    db.refresh(db_item)
    return db_item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_wardrobe_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Delete wardrobe item."""
    db_item = db.query(WardrobeItem).filter(
        WardrobeItem.id == item_id, WardrobeItem.user_id == current_user.id
    ).first()
    if not db_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Item not found"
        )

    db.delete(db_item)
    db.commit()
    return None