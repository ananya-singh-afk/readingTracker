import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Books API
export const booksAPI = {
  getAll: (status) => api.get('/books', { params: { status } }),
  create: (bookData) => api.post('/books', bookData),
  update: (bookId, updates) => api.put(`/books/${bookId}`, updates),
  delete: (bookId) => api.delete(`/books/${bookId}`),
};

// Reading Logs API
export const logsAPI = {
  create: (logData) => api.post('/reading-logs', logData),
  getByBook: (bookId) => api.get(`/reading-logs/book/${bookId}`),
  getStats: () => api.get('/reading-logs/stats'),
};

// Goals API
export const goalsAPI = {
  create: (goalData) => api.post('/goals', goalData),
  getAll: () => api.get('/goals'),
};

export default api;
