from pydantic import BaseModel
from typing import Optional


class ProfileBase(BaseModel):
    name: Optional[str] = None
    gender: Optional[str] = None
    age: Optional[int] = None
    height: Optional[str] = None
    clothing_preferences: Optional[str] = None
    favorite_colors: Optional[str] = None
    preferred_styles: Optional[str] = None
    occasions: Optional[str] = None
    budget: Optional[str] = None


class ProfileCreate(ProfileBase):
    pass


class Profile(ProfileBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True