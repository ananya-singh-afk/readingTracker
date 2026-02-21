# Reading Tracker - Comprehensive Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Backend Implementation](#backend-implementation)
6. [Frontend Implementation](#frontend-implementation)
7. [API Endpoints](#api-endpoints)
8. [Database Schema](#database-schema)
9. [Setup Instructions](#setup-instructions)
10. [Development Workflow](#development-workflow)
11. [Feature Documentation](#feature-documentation)
12. [Limitations and Roadmap](#limitations-and-roadmap)

---

## Project Overview

**Reading Tracker** is a full-stack web application designed to help users track their reading progress, manage a personal book library, and set reading goals. The application features a modern React UI with a FastAPI backend and AWS DynamoDB for data persistence.

### Key Features
- **Book Library Management**: Add, view, update, and delete books with status tracking (To Read, Reading, Completed)
- **Reading Logs**: Log reading sessions with date, pages read, duration, and notes
- **Reading Statistics**: View reading progress over different time periods (today, weekly, monthly, total)
- **Goal Setting**: Create and track reading goals for different periods
- **Responsive Design**: Dark theme UI optimized for readability

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ App.jsx (State Management)                              ││
│  │ ├─ Books Management (to-read, reading, completed)      ││
│  │ ├─ Statistics Dashboard                                ││
│  │ ├─ Goals Management                                    ││
│  │ └─ Modal Components (Add/Log/Goal)                     ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │ API Service Layer (api.js)                              ││
│  │ ├─ booksAPI                                             ││
│  │ ├─ logsAPI                                              ││
│  │ └─ goalsAPI                                             ││
│  └─────────────────────────────────────────────────────────┘│
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP (Axios)
                     │ localhost:8000
                     │
┌────────────────────┴────────────────────────────────────────┐
│                   Backend (FastAPI)                         │
│  ┌──────────────────────────────────────────────────────┐│
│  │ main.py (API Routes)                                ││
│  │ ├─ GET/POST /api/books (Book operations)           ││
│  │ ├─ PUT/DELETE /api/books/{id}                       ││
│  │ ├─ POST/GET /api/reading-logs (Logging)            ││
│  │ ├─ GET /api/reading-logs/stats (Statistics)        ││
│  │ └─ POST/GET /api/goals (Goal management)           ││
│  └──────────────────────────────────────────────────────┘│
│  ┌──────────────────────────────────────────────────────┐│
│  │ Services Layer                                      ││
│  │ └─ dynamodb_service.py (DynamoDB Operations)        ││
│  └──────────────────────────────────────────────────────┘│
│  ┌──────────────────────────────────────────────────────┐│
│  │ Models (Pydantic)                                   ││
│  │ ├─ Book                                              ││
│  │ ├─ ReadingLog                                        ││
│  │ └─ Goal                                              ││
│  └──────────────────────────────────────────────────────┘│
└────────────────────┬────────────────────────────────────────┘
                     │ Boto3
                     │
┌────────────────────┴────────────────────────────────────────┐
│              AWS DynamoDB (NoSQL Database)                  │
│  ├─ reading_tracker_books (Store book metadata)             │
│  ├─ reading_tracker_logs (Store reading sessions)           │
│  └─ reading_tracker_goals (Store user goals)                │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
- **React 18.2.0**: UI framework for building interactive components
- **Vite 5.0.8**: Modern build tool with fast HMR
- **Axios 1.6.2**: HTTP client for API requests
- **Lucide React 0.294.0**: Icon library
- **date-fns 2.30.0**: Date manipulation library
- **React Router DOM 6.20.0**: Client-side routing

### Backend
- **FastAPI 0.104.1**: Modern Python web framework with auto documentation
- **Uvicorn 0.24.0**: ASGI web server
- **Pydantic 2.4.2**: Data validation using Python type hints
- **Boto3 1.29.7**: AWS SDK for Python

### Infrastructure
- **AWS DynamoDB**: Serverless NoSQL database
- **AWS IAM**: Access management and credentials
- **Python 3.13.12**: Backend runtime
- **Node.js LTS**: Frontend runtime

---

## Project Structure

```
reading_tracker/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddBookModal.jsx      # Form modal for adding books
│   │   │   ├── LogReadingModal.jsx   # Form modal for logging reading
│   │   │   └── SetGoalModal.jsx      # Form modal for setting goals
│   │   ├── services/
│   │   │   └── api.js                # Axios API client
│   │   ├── styles/
│   │   │   └── App.css               # Dark theme CSS
│   │   ├── App.jsx                   # Main component with state management
│   │   └── main.jsx                  # React entry point
│   ├── package.json                  # NPM dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── index.html                    # HTML entry point
│   └── README.md                     # Frontend documentation
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   │   ├── book.py               # Pydantic models
│   │   │   └── __init__.py
│   │   ├── services/
│   │   │   ├── dynamodb_service.py   # DynamoDB CRUD operations
│   │   │   └── __init__.py
│   │   ├── main.py                   # FastAPI application & routes
│   │   └── __init__.py
│   ├── config.py                     # Configuration and credentials
│   ├── requirements.txt              # Python dependencies
│   ├── run.py                        # Startup script
│   ├── create_tables.py              # DynamoDB table creation
│   ├── .env                          # Environment variables
│   └── README.md                     # Backend documentation
│
├── .gitignore                        # Git ignore rules
├── .env.example                      # Environment variable template
├── SECURITY.md                       # Security best practices
├── README.md                         # Main project README
└── PROJECT_DOCUMENTATION.md          # This file
```

---

## Backend Implementation

### config.py
Centralized configuration management using environment variables.

```python
Key Configurations:
- AWS_ACCESS_KEY_ID: AWS authentication
- AWS_SECRET_ACCESS_KEY: AWS authentication
- AWS_REGION: DynamoDB region
- Table names for books, logs, goals
```

### dynamodb_service.py
Service layer for all database operations with CRUD methods:

**Book Methods:**
- `create_book(book: dict)`: Insert new book
- `get_all_books()`: Retrieve all books
- `get_books_by_status(status: str)`: Filter books by status
- `update_book(book_id: str, book: dict)`: Update book details
- `delete_book(book_id: str)`: Remove book

**Reading Log Methods:**
- `create_reading_log(log: dict)`: Create reading session record
- `get_logs_by_book(book_id: str)`: Get all logs for a book
- `get_logs_by_date_range(start_date: str, end_date: str)`: Filter logs by date
- `get_statistics()`: Aggregate statistics

**Goal Methods:**
- `create_goal(goal: dict)`: Create reading goal
- `get_all_goals()`: Retrieve all goals
- `get_goals_by_type(goal_type: str)`: Filter goals by type

### main.py (FastAPI Routes)

**Book Endpoints:**
- `POST /api/books`: Create new book
- `GET /api/books`: List all books
- `PUT /api/books/{book_id}`: Update book
- `DELETE /api/books/{book_id}`: Delete book

**Reading Log Endpoints:**
- `POST /api/reading-logs`: Log reading session
- `GET /api/reading-logs/book/{book_id}`: Get book's reading logs
- `GET /api/reading-logs/stats`: Get reading statistics

**Goal Endpoints:**
- `POST /api/goals`: Create reading goal
- `GET /api/goals`: List all goals

---

## Frontend Implementation

### App.jsx - Main Component
Central state management component handling:
- Books state (organized by status: toRead, reading, completed)
- Statistics state (today, week, month, total pages)
- Goals state
- Modal visibility states

Key methods:
- `loadBooks()`: Fetch all books from API
- `loadStats()`: Fetch reading statistics
- `loadGoals()`: Fetch user's reading goals
- `handleBookAdded()`: Update UI after adding book
- `handleLogAdded()`: Update UI after logging reading
- `handleUpdateBookStatus()`: Change book status
- `handleDeleteBook()`: Remove book

### Modal Components

**AddBookModal.jsx:**
- Form inputs: title, author, pages, status, cover_url
- Form validation required fields
- Calls `booksAPI.create()`

**LogReadingModal.jsx:**
- Form inputs: date, pages_read (required), duration_minutes, notes
- Tracks reading sessions
- Calls `logsAPI.create()`

**SetGoalModal.jsx:**
- Conditional fields based on goal_type
- Types: daily, weekly, monthly, yearly
- Dynamic target_books field for monthly/yearly goals
- Calls `goalsAPI.create()`

### API Service Layer (api.js)
Organized API endpoint methods using Axios:

```javascript
booksAPI:
- getAll()
- create(bookData)
- update(id, bookData)
- delete(id)

logsAPI:
- create(logData)
- getByBook(bookId)
- getStats()

goalsAPI:
- create(goalData)
- getAll()
```

### CSS Styling (App.css)
Dark theme with CSS variables:
- Color scheme: primary, secondary, success, danger
- Component styles: header, cards, buttons, modals, forms
- Responsive grid layouts
- Smooth transitions and animations

---

## API Endpoints

### Books API

**POST /api/books**
Create a new book
```json
Request:
{
  "id": "uuid",
  "title": "Book Title",
  "author": "Author Name",
  "pages": 300,
  "status": "to-read",
  "cover_url": "https://..."
}
Response: {"id": "uuid", ...}
```

**GET /api/books**
Get all books
Response: Array of book objects

**PUT /api/books/{id}**
Update book
Request: Updated book object
Response: {"id": "uuid", ...}

**DELETE /api/books/{id}**
Delete book
Response: {"message": "Book deleted"}

### Reading Logs API

**POST /api/reading-logs**
Log reading session
```json
Request:
{
  "id": "uuid",
  "book_id": "uuid",
  "date": "2024-01-15",
  "pages_read": 25,
  "duration_minutes": 45,
  "notes": "Great chapter..."
}
```

**GET /api/reading-logs/stats**
Get reading statistics
```json
Response:
{
  "today": 50,
  "week": 200,
  "month": 800,
  "total": 5000
}
```

### Goals API

**POST /api/goals**
Create reading goal
```json
Request:
{
  "id": "uuid",
  "goal_type": "monthly",
  "target_pages": 500,
  "target_books": 2,
  "notes": "..."
}
```

**GET /api/goals**
Get all goals
Response: Array of goal objects

---

## Database Schema

### reading_tracker_books Table
```
Partition Key: id (String)
Attributes:
- id: string (UUID)
- title: string
- author: string
- pages: number
- status: string (to-read, reading, completed)
- cover_url: string (optional)
- created_at: string (ISO 8601)
- updated_at: string (ISO 8601)
```

### reading_tracker_logs Table
```
Partition Key: id (String)
Attributes:
- id: string (UUID)
- book_id: string (UUID)
- date: string (YYYY-MM-DD)
- pages_read: number
- duration_minutes: number (optional)
- notes: string (optional)
- created_at: string (ISO 8601)
```

### reading_tracker_goals Table
```
Partition Key: id (String)
Attributes:
- id: string (UUID)
- goal_type: string (daily, weekly, monthly, yearly)
- target_pages: number (optional)
- target_books: number (optional)
- notes: string (optional)
- created_at: string (ISO 8601)
- updated_at: string (ISO 8601)
```

---

## Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js LTS
- AWS Account with IAM user credentials
- Git

### Backend Setup

1. **Create virtual environment:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your AWS credentials
   ```

4. **Create DynamoDB tables:**
   ```bash
   python create_tables.py
   ```

5. **Start backend server:**
   ```bash
   python run.py
   # Server runs on http://localhost:8000
   ```

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   # Accessible on http://localhost:5173
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## Development Workflow

### Running Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python run.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then open http://localhost:5173 in your browser.

### Key Development Commands

**Backend:**
- `python run.py` - Start Uvicorn server
- `python create_tables.py` - Create/recreate DynamoDB tables
- `pip install -r requirements.txt` - Install dependencies

**Frontend:**
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm install` - Install NPM dependencies

### API Testing
- Access Swagger UI: http://localhost:8000/docs
- Access ReDoc: http://localhost:8000/redoc

---

## Feature Documentation

### Book Library Management
Users can:
- Add books with title, author, page count, and cover image
- View books organized by status (To Read, Reading, Completed)
- Update book status as they progress
- Delete books from their library
- See total book count in each category

### Reading Logs
Users can:
- Log reading sessions with date, pages read, and duration
- Add notes about their reading experience
- View logs for each book
- Track reading habit patterns

### Statistics Dashboard
Real-time statistics showing:
- Pages read today
- Pages read this week
- Pages read this month
- Total pages read (all-time)

### Reading Goals
Users can:
- Set daily, weekly, monthly, or yearly reading goals
- Specify target pages and/or target books
- Add notes to their goals
- View all active goals

---

## Limitations and Roadmap

### Current Limitations
1. **No Authentication**: Anyone can access the data
2. **Single User**: No multi-user support
3. **No Backup**: Data loss risk if DynamoDB is deleted
4. **No Search**: Can't search/filter books by properties
5. **No Notifications**: No alerts for goal deadlines
6. **No Book Details**: Limited metadata per book

### Planned Features

**Phase 2 - User Management:**
- User authentication (JWT)
- User profiles
- Data isolation per user

**Phase 3 - Advanced Features:**
- Book search via ISBN
- Integration with book APIs (Google Books, Open Library)
- Social features (share progress, follow friends)
- Reading challenges
- Book ratings and reviews

**Phase 4 - Analytics:**
- Reading trend analysis
- Genre-based statistics
- Reading speed metrics
- Goal achievement tracking

**Phase 5 - Mobile & UX:**
- Mobile app (React Native)
- Progressive Web App (PWA)
- Offline support
- Push notifications

### Technical Debt
- Add comprehensive error handling
- Implement input validation on frontend
- Add unit tests for components and API
- Add integration tests for backend
- Implement proper logging
- Add database transaction support
- Optimize DynamoDB queries

---

## Troubleshooting

### Backend Issues

**ValueError: unable to import pydantic:**
- Solution: Use Python 3.13 virtual environment with pydantic 2.4.2

**ModuleNotFoundError: No module named 'app':**
- Solution: Run python with full path to venv, not system Python
- Use: `/path/to/venv/Scripts/python run.py`

**DynamoDB connection errors:**
- Verify AWS credentials in .env
- Check AWS region setting
- Ensure IAM user has DynamoDB permissions

### Frontend Issues

**API requests failing (CORS errors):**
- Verify backend is running on port 8000
- Check Vite proxy configuration in vite.config.js
- Browser console will show specific error

**npm install fails:**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and package-lock.json
- Run `npm install` again

---

## Contributing

To contribute to this project:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request
5. Follow the existing code style

---

## License

This project is open source and available under the MIT License.

---

## Support

For issues, questions, or suggestions:
1. Check existing documentation
2. Review error messages and logs
3. Consult AWS DynamoDB documentation
4. Open an issue on GitHub

---

**Last Updated:** January 2024
**Version:** 1.0.0
