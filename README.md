# Reading Tracker

A full-stack web application for tracking your reading progress, managing your book library, and achieving your reading goals.

## Key Features Implemented

✅ **Library Organization**: Three distinct sections (Completed, Currently Reading, To Be Read)
✅ **Reading Goals**: Daily, weekly, monthly, and yearly tracking with progress bars
✅ **Book Management**: Add, update, and organize books
✅ **Reading Logs**: Track daily reading sessions with pages and duration
✅ **Modern UI**: Dark theme inspired by Goodreads and Literal.club
✅ **Progress Tracking**: Visual progress bars for books and goals
✅ **Statistics Dashboard**: Real-time stats for all time periods
✅ **AWS DynamoDB**: Scalable cloud storage for all data

The UI features a modern dark theme with gradients, smooth animations, and an intuitive card-based layout. The stats dashboard provides immediate visual feedback on reading progress against goals!

## Tech Stack

### Frontend
- **React 18.2** - UI framework
- **Vite 5.0** - Fast build tool with hot module reloading
- **Axios** - HTTP client for API requests
- **CSS3** - Dark theme styling with CSS variables
- **Lucide React** - Icon library

### Backend
- **FastAPI 0.104** - Modern Python web framework
- **Uvicorn** - ASGI web server
- **Pydantic** - Data validation using Python type hints
- **Boto3** - AWS SDK for DynamoDB operations

### Infrastructure
- **AWS DynamoDB** - Serverless NoSQL database
- **AWS IAM** - Identity and access management

## Project Structure

```
reading-tracker/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Modal components
│   │   ├── services/        # API client
│   │   ├── styles/          # CSS styling
│   │   └── App.jsx          # Main component
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── models/          # Pydantic models
│   │   ├── services/        # DynamoDB operations
│   │   └── main.py          # API routes
│   ├── config.py            # Configuration
│   ├── requirements.txt
│   └── run.py               # Startup script
│
├── README.md
├── .gitignore
├── .env.example
└── SECURITY.md
```

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js LTS
- AWS Account with IAM credentials
- Git

### Backend Setup

1. **Create and activate virtual environment:**
   ```bash
   cd backend
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure AWS credentials:**
   ```bash
   cp .env.example .env
   # Edit .env with your AWS access key and secret key
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
   # Server runs on http://localhost:5173
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Running Both Servers

Open two terminals:

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

## API Documentation

Once the backend is running, check out:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## API Endpoints

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Create new book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book

### Reading Logs
- `POST /api/reading-logs` - Log reading session
- `GET /api/reading-logs/book/{book_id}` - Get logs for a book
- `GET /api/reading-logs/stats` - Get reading statistics

### Goals
- `GET /api/goals` - Get all goals
- `POST /api/goals` - Create new goal

## Security

- AWS credentials are stored in `.env` (never committed to git)
- See [SECURITY.md](SECURITY.md) for security best practices
- Use `.env.example` as a template for your configuration
- Rotate AWS access keys regularly

## Documentation

- See [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) for comprehensive technical documentation
- See [SECURITY.md](SECURITY.md) for security guidelines and best practices

## Future Enhancements

- User authentication and authorization
- Book API integration (Google Books, Open Library)
- Social features (share progress, follow friends)
- Mobile app (React Native)
- Reading challenge and community features
- Advanced analytics and trends

## License

MIT License - Open source and available for modification and distribution.

## Support

For issues, questions, or suggestions:
1. Check the documentation files
2. Review backend logs for errors
3. Check browser console for frontend errors
4. Verify AWS credentials and DynamoDB tables exist
