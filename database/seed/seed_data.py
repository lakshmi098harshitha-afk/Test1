from sqlalchemy.orm import Session
from .database import engine, Base
from .models.user import User
from .models.profile import Profile
from .models.wardrobe import WardrobeItem
from .models.outfit import Outfit
from .models.favorite import Favorite
from .models.recommendation import Recommendation
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


def seed_database():
    # Create all tables
    Base.metadata.create_all(bind=engine)

    db = Session(bind=engine)

    # Check if data already exists
    if db.query(User).first():
        print("Database already seeded")
        db.close()
        return

    # Create users with hashed passwords
    users_data = [
        {
            "email": "test@example.com",
            "password": get_password_hash("password123"),
            "is_active": True,
            "is_admin": False,
        },
        {
            "email": "john.doe@example.com",
            "password": get_password_hash("password456"),
            "is_active": True,
            "is_admin": False,
        },
        {
            "email": "jane.smith@example.com",
            "password": get_password_hash("password789"),
            "is_active": True,
            "is_admin": False,
        },
    ]

    users = [User(**user_data) for user_data in users_data]
    db.add_all(users)
    db.commit()

    # Create profiles
    profiles_data = [
        {
            "user_id": 1,
            "name": "Test User",
            "gender": "Male",
            "age": 28,
            "height": "5'10\"",
            "clothing_preferences": "Casual, Smart Casual",
            "favorite_colors": "Blue, White, Grey",
            "preferred_styles": "Modern, Minimalist",
            "occasions": "Work, Casual, Formal",
            "budget": "$50-$200",
        },
        {
            "user_id": 2,
            "name": "John Doe",
            "gender": "Male",
            "age": 32,
            "height": "6'0\"",
            "clothing_preferences": "Business Casual,Athletic",
            "favorite_colors": "Black, Grey, Navy",
            "preferred_styles": "Classic, Modern",
            "occasions": "Work, Evening, Casual",
            "budget": "$100-$300",
        },
        {
            "user_id": 3,
            "name": "Jane Smith",
            "gender": "Female",
            "age": 25,
            "height": "5'6\"",
            "clothing_preferences": "Casual, Business Formal",
            "favorite_colors": "Pink, White, Light Blue",
            "preferred_styles": "Chic, Trendy",
            "occasions": "Work, Party, Casual",
            "budget": "$50-$250",
        },
    ]

    profiles = [Profile(**profile_data) for profile_data in profiles_data]
    db.add_all(profiles)
    db.commit()

    # Create wardrobe items
    wardrobe_items_data = [
        # T-Shirts
        {
            "user_id": 1,
            "name": "Classic White Tee",
            "category": "T-Shirts",
            "color": "White",
            "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
            "description": "Basic white cotton t-shirt",
            "price": "$15",
            "brand": "H&M",
            "season": "All",
            "tags": ["casual", "basic"],
        },
        {
            "user_id": 1,
            "name": "Navy Blue Tee",
            "category": "T-Shirts",
            "color": "Navy",
            "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
            "description": "Navy blue crew neck t-shirt",
            "price": "$18",
            "brand": "Uniqlo",
            "season": "All",
            "tags": ["casual", "basic"],
        },
        # Shirts
        {
            "user_id": 1,
            "name": "White Oxford Shirt",
            "category": "Shirts",
            "color": "White",
            "image_url": "https://images.unsplash.com/photo-1596767719412-3a48dcb61681?w=300",
            "description": "Classic white button-down shirt",
            "price": "$45",
            "brand": "Banana Republic",
            "season": "All",
            "tags": ["formal", "business"],
        },
        {
            "user_id": 2,
            "name": "Light Blue Check Shirt",
            "category": "Shirts",
            "color": "Blue",
            "image_url": "https://images.unsplash.com/photo-1596767719412-3a48dcb61681?w=300",
            "description": "Light blue check pattern shirt",
            "price": "$55",
            "brand": "Ralph Lauren",
            "season": "Spring, Summer",
            "tags": ["casual", "business"],
        },
        # Pants
        {
            "user_id": 1,
            "name": "Khaki Chinos",
            "category": "Pants",
            "color": "Khaki",
            "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
            "description": "Classic khaki chino pants",
            "price": "$50",
            "brand": "Zara",
            "season": "All",
            "tags": ["casual", "business"],
        },
        {
            "user_id": 2,
            "name": "Grey Slim Fit Pants",
            "category": "Pants",
            "color": "Grey",
            "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
            "description": "Slim fit grey dress pants",
            "price": "$70",
            "brand": "H&M",
            "season": "All",
            "tags": ["formal", "business"],
        },
        # Jeans
        {
            "user_id": 1,
            "name": "Dark Denim Jeans",
            "category": "Jeans",
            "color": "Blue",
            "image_url": "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300",
            "description": "Classic dark wash jeans",
            "price": "$65",
            "brand": "Levi's",
            "season": "All",
            "tags": ["casual"],
        },
        # Dresses
        {
            "user_id": 3,
            "name": "Floral Summer Dress",
            "category": "Dresses",
            "color": "Pink",
            "image_url": "https://images.unsplash.com/photo-1567537973326-3f783243f74a?w=300",
            "description": "Floral pattern summer dress",
            "price": "$85",
            "brand": "Zara",
            "season": "Summer",
            "tags": ["casual", "party"],
        },
        # Jackets
        {
            "user_id": 1,
            "name": "Navy Bomber Jacket",
            "category": "Jackets",
            "color": "Navy",
            "image_url": "https://images.unsplash.com/photo-1569324972599-7975026c6813?w=300",
            "description": "Navy blue bomber jacket",
            "price": "$120",
            "brand": "Nike",
            "season": "Spring, Fall",
            "tags": ["casual"],
        },
        # Shoes
        {
            "user_id": 1,
            "name": "White Sneakers",
            "category": "Shoes",
            "color": "White",
            "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
            "description": "Minimalist white sneakers",
            "price": "$90",
            "brand": "Adidas",
            "season": "All",
            "tags": ["casual"],
        },
        {
            "user_id": 2,
            "name": "Brown Leather Boots",
            "category": "Shoes",
            "color": "Brown",
            "image_url": "https://images.unsplash.com/photo-1543349989-75d95c917008?w=300",
            "description": "Brown leather ankle boots",
            "price": "$150",
            "brand": "Dr. Martens",
            "season": "Fall, Winter",
            "tags": ["casual", "outdoor"],
        },
        {
            "user_id": 3,
            "name": "Black Heels",
            "category": "Shoes",
            "color": "Black",
            "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
            "description": "Black pointed-toe heels",
            "price": "$120",
            "brand": "Steve Madden",
            "season": "All",
            "tags": ["formal", "party"],
        },
        # Accessories
        {
            "user_id": 1,
            "name": "Leather Belt",
            "category": "Accessories",
            "color": "Brown",
            "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
            "description": "Brown leather belt",
            "price": "$35",
            "brand": "Fossil",
            "season": "All",
            "tags": ["casual", "formal"],
        },
    ]

    wardrobe_items = [WardrobeItem(**item_data) for item_data in wardrobe_items_data]
    db.add_all(wardrobe_items)
    db.commit()

    # Create sample outfits
    outfits_data = [
        {
            "user_id": 1,
            "name": "Business Casual Look",
            "description": "Professional yet comfortable outfit for work",
            "occasion": "Work",
            "season": "All",
            "style": "Classic",
            "budget": "$200",
            "items": [
                {"item_id": 3, "name": "White Oxford Shirt"},
                {"item_id": 5, "name": "Khaki Chinos"},
                {"item_id": 9, "name": "White Sneakers"},
                {"item_id": 12, "name": "Leather Belt"},
            ],
            "image_url": "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600",
            "is_favorite": "false",
        },
        {
            "user_id": 1,
            "name": "Casual Weekend",
            "description": "Relaxed outfit for weekend activities",
            "occasion": "Casual",
            "season": "All",
            "style": "Modern",
            "budget": "$150",
            "items": [
                {"item_id": 1, "name": "Classic White Tee"},
                {"item_id": 7, "name": "Dark Denim Jeans"},
                {"item_id": 8, "name": "Navy Bomber Jacket"},
                {"item_id": 9, "name": "White Sneakers"},
            ],
            "image_url": "https://images.unsplash.com/photo-1515264058473-82310969677c?w=600",
            "is_favorite": "true",
        },
        {
            "user_id": 2,
            "name": "Smart Office Look",
            "description": "Professional outfit for important meetings",
            "occasion": "Work",
            "season": "All",
            "style": "Classic",
            "budget": "$250",
            "items": [
                {"item_id": 4, "name": "Light Blue Check Shirt"},
                {"item_id": 6, "name": "Grey Slim Fit Pants"},
                {"item_id": 10, "name": "Brown Leather Boots"},
            ],
            "image_url": "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600",
            "is_favorite": "false",
        },
        {
            "user_id": 3,
            "name": "Office Chic",
            "description": "Elegant and professional work outfit",
            "occasion": "Work",
            "season": "Spring",
            "style": "Chic",
            "budget": "$200",
            "items": [
                {"item_id": 7, "name": "Floral Summer Dress"},
                {"item_id": 11, "name": "Black Heels"},
            ],
            "image_url": "https://images.unsplash.com/photo-1567537973326-3f783243f74a?w=600",
            "is_favorite": "true",
        },
    ]

    outfits = [Outfit(**outfit_data) for outfit_data in outfits_data]
    db.add_all(outfits)
    db.commit()

    # Create favorites
    favorites_data = [
        {"user_id": 1, "outfit_id": 2, "outfit_name": "Casual Weekend", "items": "Classic White Tee, Dark Denim Jeans, Navy Bomber Jacket, White Sneakers"},
        {"user_id": 3, "outfit_id": 4, "outfit_name": "Office Chic", "items": "Floral Summer Dress, Black Heels"},
    ]

    favorites = [Favorite(**fav_data) for fav_data in favorites_data]
    db.add_all(favorites)
    db.commit()

    # Create recommendations
    recommendations_data = [
        {"user_id": 1, "occasion": "Work", "season": "All", "style": "Classic", "color": "Blue, White, Grey", "budget": "$100-$200", "recommendation_data": {"top": "White Oxford Shirt", "bottom": "Khaki Chinos", "shoes": "White Sneakers"}},
        {"user_id": 2, "occasion": "Casual", "season": "Spring", "style": "Modern", "color": "Black, Grey, Navy", "budget": "$150-$250", "recommendation_data": {"top": "Light Blue Check Shirt", "bottom": "Dark Denim Jeans", "shoes": "White Sneakers"}},
    ]

    recommendations = [Recommendation(**rec_data) for rec_data in recommendations_data]
    db.add_all(recommendations)
    db.commit()

    print("Database seeded successfully!")
    db.close()