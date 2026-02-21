import React, { useState } from 'react';
import { X } from 'lucide-react';
import { goalsAPI } from '../services/api';

const SetGoalModal = ({ onClose, onGoalAdded }) => {
  const [formData, setFormData] = useState({
    goal_type: 'monthly',
    target_pages: '',
    target_books: '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const goalData = {
        goal_type: formData.goal_type,
        target_pages: formData.target_pages ? parseInt(formData.target_pages) : null,
        target_books: formData.target_books ? parseInt(formData.target_books) : null,
        notes: formData.notes || null,
        id: ''
      };
      
      await goalsAPI.create(goalData);
      onGoalAdded();
      onClose();
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const needsTargetBooks = ['monthly', 'yearly'].includes(formData.goal_type);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Set Reading Goal</h2>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.5rem' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Goal Period *</label>
            <select
              value={formData.goal_type}
              onChange={(e) => setFormData({ ...formData, goal_type: e.target.value })}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="form-group">
            <label>Target Pages</label>
            <input
              type="number"
              min="1"
              value={formData.target_pages}
              onChange={(e) => setFormData({ ...formData, target_pages: e.target.value })}
            />
          </div>

          {needsTargetBooks && (
            <div className="form-group">
              <label>Target Books</label>
              <input
                type="number"
                min="1"
                value={formData.target_books}
                onChange={(e) => setFormData({ ...formData, target_books: e.target.value })}
              />
            </div>
          )}

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
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetGoalModal;
