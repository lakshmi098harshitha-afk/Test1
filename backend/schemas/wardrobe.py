from pydantic import BaseModel
from typing import Optional, List, Any


class WardrobeItemBase(BaseModel):
    name: str
    category: str
    color: Optional[str] = None
    image_url: Optional[str] = None
    description: Optional[str] = None
    price: Optional[str] = None
    brand: Optional[str] = None
    season: Optional[str] = None
    tags: Optional[List[str]] = None


class WardrobeItemCreate(WardrobeItemBase):
    pass


class WardrobeItem(WardrobeItemBase):
    id: int
    user_id: int
    created_at: str
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True