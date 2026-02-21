import React, { useState } from 'react';
import { X } from 'lucide-react';
import { logsAPI } from '../services/api';

const LogReadingModal = ({ book, onClose, onLogAdded }) => {
  const [formData, setFormData] = useState({
    pages_read: '',
    duration_minutes: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const logData = {
        book_id: book.id,
        date: formData.date,
        pages_read: parseInt(formData.pages_read),
        duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null,
        notes: formData.notes || null,
        id: ''
      };
      
      await logsAPI.create(logData);
      onLogAdded();
      onClose();
    } catch (error) {
      console.error('Error logging reading:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Log Reading Session</h2>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.5rem' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
          <strong>{book.title}</strong> by {book.author}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Pages Read *</label>
            <input
              type="number"
              required
              min="1"
              value={formData.pages_read}
              onChange={(e) => setFormData({ ...formData, pages_read: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Duration (minutes)</label>
            <input
              type="number"
              min="1"
              value={formData.duration_minutes}
              onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogReadingModal;
