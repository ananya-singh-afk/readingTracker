import React, { useState, useEffect } from 'react';
import { PlusCircle, BookOpen, BarChart3, Target } from 'lucide-react';
import './styles/App.css';
import { booksAPI, logsAPI, goalsAPI } from './services/api';
import AddBookModal from './components/AddBookModal';
import LogReadingModal from './components/LogReadingModal';
import SetGoalModal from './components/SetGoalModal';

function App() {
  const [books, setBooks] = useState({
    toRead: [],
    reading: [],
    completed: []
  });

  const [stats, setStats] = useState({
    today: 0,
    week: 0,
    month: 0,
    total: 0
  });

  const [goals, setGoals] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
    loadStats();
    loadGoals();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await booksAPI.getAll();
      const booksByStatus = {
        toRead: response.filter(b => b.status === 'to-read'),
        reading: response.filter(b => b.status === 'reading'),
        completed: response.filter(b => b.status === 'completed')
      };
      setBooks(booksByStatus);
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  const loadStats = async () => {
    try {
      const response = await logsAPI.getStats();
      setStats(response);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadGoals = async () => {
    try {
      const response = await goalsAPI.getAll();
      setGoals(response);
    } catch (error) {
      console.error('Error loading goals:', error);
    }
  };

  const handleBookAdded = () => {
    loadBooks();
  };

  const handleLogAdded = () => {
    loadBooks();
    loadStats();
  };

  const handleGoalAdded = () => {
    loadGoals();
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await booksAPI.delete(bookId);
        loadBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleUpdateBookStatus = async (book, newStatus) => {
    try {
      await booksAPI.update(book.id, { ...book, status: newStatus });
      loadBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const BookCard = ({ book }) => (
    <div className="book-card">
      {book.cover_url && (
        <img src={book.cover_url} alt={book.title} className="book-cover" />
      )}
      <div className="book-card-content">
        <h3>{book.title}</h3>
        <p className="author">{book.author}</p>
        <p className="pages">{book.total_pages} pages</p>
        <div className="book-actions">
          <select
            value={book.status}
            onChange={(e) => handleUpdateBookStatus(book, e.target.value)}
            className="status-select"
          >
            <option value="to-read">To Read</option>
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={() => {
              setSelectedBook(book);
              setShowLogModal(true);
            }}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            Log Reading
          </button>
          <button
            onClick={() => handleDeleteBook(book.id)}
            className="btn btn-danger"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <BookOpen size={32} />
            <h1>Reading Tracker</h1>
          </div>
          <div className="header-actions">
            <button
              onClick={() => setShowAddBookModal(true)}
              className="btn btn-primary"
            >
              <PlusCircle size={20} /> Add Book
            </button>
            <button
              onClick={() => setShowGoalModal(true)}
              className="btn btn-secondary"
            >
              <Target size={20} /> Set Goal
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Statistics Dashboard */}
        <section className="stats-dashboard">
          <div className="stat-card">
            <div className="stat-icon today">
              <BarChart3 size={24} />
            </div>
            <div>
              <p className="stat-label">Today</p>
              <p className="stat-value">{stats.today}</p>
              <p className="stat-unit">pages</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon week">
              <BarChart3 size={24} />
            </div>
            <div>
              <p className="stat-label">This Week</p>
              <p className="stat-value">{stats.week}</p>
              <p className="stat-unit">pages</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon month">
              <BarChart3 size={24} />
            </div>
            <div>
              <p className="stat-label">This Month</p>
              <p className="stat-value">{stats.month}</p>
              <p className="stat-unit">pages</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon total">
              <BarChart3 size={24} />
            </div>
            <div>
              <p className="stat-label">Total</p>
              <p className="stat-value">{stats.total}</p>
              <p className="stat-unit">pages</p>
            </div>
          </div>
        </section>

        {/* Books Sections */}
        <section className="books-section">
          <h2>To Read ({books.toRead.length})</h2>
          {books.toRead.length > 0 ? (
            <div className="books-grid">
              {books.toRead.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <BookOpen size={48} />
              <p>No books in your to-read list. Add one to get started!</p>
            </div>
          )}
        </section>

        <section className="books-section">
          <h2>Currently Reading ({books.reading.length})</h2>
          {books.reading.length > 0 ? (
            <div className="books-grid">
              {books.reading.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <BookOpen size={48} />
              <p>You're not currently reading any books.</p>
            </div>
          )}
        </section>

        <section className="books-section">
          <h2>Completed ({books.completed.length})</h2>
          {books.completed.length > 0 ? (
            <div className="books-grid">
              {books.completed.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <BookOpen size={48} />
              <p>No completed books yet. Keep reading!</p>
            </div>
          )}
        </section>

        {/* Active Goals */}
        {goals.length > 0 && (
          <section className="goals-section">
            <h2>Your Goals</h2>
            <div className="goals-list">
              {goals.map(goal => (
                <div key={goal.id} className="goal-item">
                  <div className="goal-icon">
                    <Target size={20} />
                  </div>
                  <div>
                    <h4>{goal.goal_type.charAt(0).toUpperCase() + goal.goal_type.slice(1)} Goal</h4>
                    <p>
                      {goal.target_pages && `${goal.target_pages} pages`}
                      {goal.target_pages && goal.target_books && ' | '}
                      {goal.target_books && `${goal.target_books} books`}
                    </p>
                    {goal.notes && <p className="goal-notes">{goal.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Modals */}
      {showAddBookModal && (
        <AddBookModal
          onClose={() => setShowAddBookModal(false)}
          onBookAdded={handleBookAdded}
        />
      )}

      {showLogModal && selectedBook && (
        <LogReadingModal
          book={selectedBook}
          onClose={() => {
            setShowLogModal(false);
            setSelectedBook(null);
          }}
          onLogAdded={handleLogAdded}
        />
      )}

      {showGoalModal && (
        <SetGoalModal
          onClose={() => setShowGoalModal(false)}
          onGoalAdded={handleGoalAdded}
        />
      )}
    </div>
  );
}

export default App;
