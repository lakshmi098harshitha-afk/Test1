from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class FavoriteBase(BaseModel):
    outfit_id: int
    outfit_name: Optional[str] = None
    items: Optional[str] = None


class FavoriteCreate(FavoriteBase):
    pass


class Favorite(FavoriteBase):
    id: int
    user_id: int
    created_at: str

    class Config:
        from_attributes = True