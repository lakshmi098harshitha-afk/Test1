import sys
import os

# Add project root to path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
sys.path.insert(0, os.path.join(project_root, 'backend'))
sys.path.insert(0, os.path.join(project_root, 'database'))
sys.path.insert(0, os.path.join(project_root, 'backend', 'api', 'routes'))
sys.path.insert(0, os.path.join(project_root, 'backend', 'services'))
sys.path.insert(0, os.path.join(project_root, 'backend', 'schemas'))
sys.path.insert(0, os.path.join(project_root, 'backend', 'models'))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

# Import database and models
from database import Base, engine, SessionLocal, get_db
from database.models import User, Profile, WardrobeItem, Outfit, Favorite, Recommendation

# Import routes
import auth as auth_route
import profile as profile_route
import wardrobe as wardrobe_route
import recommendations as recommendations_route
import favorites as favorites_route

# Import services
from services.auth_service import get_password_hash, authenticate_user, create_access_token, get_current_user
from services.ai_stylist_service import AIStylistService

# Import schemas
from schemas.user import UserCreate, Token
from schemas.profile import Profile, ProfileCreate
from schemas.wardrobe import WardrobeItem, WardrobeItemCreate
from schemas.outfit import Outfit, OutfitCreate
from schemas.favorite import Favorite, FavoriteCreate
from schemas.recommendation import Recommendation, RecommendationCreate

def create_app():
    app = FastAPI(
        title="AI FitStylist API",
        description="AI-powered personal fashion styling platform",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include routers
    app.include_router(auth_route.router)
    app.include_router(profile_route.router)
    app.include_router(wardrobe_route.router)
    app.include_router(recommendations_route.router)
    app.include_router(favorites_route.router)

    # Health check endpoint
    @app.get("/health")
    def health_check():
        return {"status": "healthy", "service": "AI FitStylist API"}

    # Root redirect to docs
    @app.get("/")
    def root():
        return RedirectResponse(url="/docs")

    return app


app = create_app()


@app.on_event("startup")
def startup_event():
    """Initialize database on startup."""
    # Create tables
    Base.metadata.create_all(bind=engine)

    # Seed database
    try:
        from database.seed.seed_data import seed_database
        seed_database()
    except Exception as e:
        print(f"Database seeding failed: {e}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)