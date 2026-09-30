# AI FitStylist

AI-powered personal fashion styling platform that helps users choose outfits based on their style, occasion, color preferences, and personal profile.

## Features

- 🤖 AI-powered outfit recommendations
- 👗 Personalized styling suggestions
- 🎨 Smart color and style matching
- 👔 Digital wardrobe organization
- 💾 Save and organize favorite outfits
- 📱 Fully responsive design

## Tech Stack

### Frontend
- React + Vite
- HTML5/CSS3
- JavaScript
- Responsive design with modern CSS

### Backend
- Python + FastAPI
- SQLAlchemy (SQLite)
- Pydantic for data validation
- JWT authentication

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.9 or higher)
- npm or yarn

### Installation

#### 1. Frontend Setup

```bash
# Navigate to the project directory
cd AI-FitStylist

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the development server
uvicorn main:app --reload
```

The backend API will be available at `http://localhost:8000`

### Development

#### Frontend Commands
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

#### Backend Commands
```bash
uvicorn main:app --reload    # Start development server
```

## Project Structure

```
AI-FitStylist/
├── index.html                 # Main landing page
├── style.css                  # Main styles
├── script.js                  # Frontend JavaScript
├── .env                       # Environment variables
├── README.md                  # Project documentation
├── backend/
│   ├── api/
│   │   └── routes/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── main.py
│   └── requirements.txt
├── database/
│   ├── models/
│   ├── seed/
│   └── database.py
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── hooks/
    │   └── context/
    ├── package.json
    └── vite.config.js
```

## Running the Project

### Option 1: Run Both Backend and Frontend

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
npm install
npm run dev
```

### Option 2: Use Docker (Coming Soon)

## API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Features Overview

### Landing Page
- Hero section with AI styling pitch
- Features showcase
- How it works (3 steps)
- Call to action section
- Responsive design

### Authentication (Coming Soon)
- User registration
- Login/logout
- Password hashing with bcrypt

### User Profile (Coming Soon)
- Personal information
- Style preferences
- Body measurements
- Budget preferences

### AI Recommendations (Coming Soon)
- Occasion-based styling
- Seasonal recommendations
- Color matching
- Budget-conscious suggestions

### Wardrobe Management (Coming Soon)
- Add clothing items
- Edit wardrobe items
- Delete items
- Filter by category

### Favorites (Coming Soon)
- Save favorite outfits
- Access saved styles quickly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License

## Contact

For questions or support, please contact us.