from pydantic import BaseModel
from typing import Optional, List, Any


class OutfitItem(BaseModel):
    item_id: int
    name: str


class OutfitBase(BaseModel):
    name: str
    description: Optional[str] = None
    occasion: Optional[str] = None
    season: Optional[str] = None
    style: Optional[str] = None
    budget: Optional[str] = None
    items: Optional[List[OutfitItem]] = None
    image_url: Optional[str] = None
    is_favorite: Optional[str] = None


class OutfitCreate(OutfitBase):
    pass


class Outfit(OutfitBase):
    id: int
    user_id: int
    created_at: str
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True