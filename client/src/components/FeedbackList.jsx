import React, { useState } from 'react';
import FeedbackItem from './FeedbackItem';
import ModalComponent from './ModalComponent';

/**
 * FeedbackList Component
 * Displays table of feedback entries with keyword, date, and rating filters
 */
export default function FeedbackList({
  feedbacks = [],
  loading = false,
  onDeleteFeedback,
  searchKeyword,
  onSearchChange,
  selectedDate,
  onDateChange,
  selectedRating,
  onRatingChange
}) {
  // Modal state for delete confirmation
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Open delete modal
  const handleDeleteClick = (feedback) => {
    setFeedbackToDelete(feedback);
  };

  // Confirm delete handler
  const handleConfirmDelete = async () => {
    if (!feedbackToDelete) return;
    try {
      setIsDeleting(true);
      await onDeleteFeedback(feedbackToDelete._id);
      setFeedbackToDelete(null);
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="feedback-list-section">
      {/* Filter Controls Row */}
      <div className="filter-controls-card">
        {/* Search by Keyword */}
        <div className="filter-field">
          <label>Search Keyword:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, message, email..."
            value={searchKeyword}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filter by Date */}
        <div className="filter-field">
          <label>Filter by Date:</label>
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>

        {/* Filter by Rating */}
        <div className="filter-field">
          <label>Filter by Rating:</label>
          <select
            className="form-control"
            value={selectedRating}
            onChange={(e) => onRatingChange(e.target.value)}
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        {/* Reset Button */}
        {(searchKeyword || selectedDate || selectedRating) && (
          <button
            type="button"
            className="btn btn-secondary btn-clear-filters"
            onClick={() => {
              onSearchChange('');
              onDateChange('');
              onRatingChange('');
            }}
          >
            Clear Filters ✕
          </button>
        )}
      </div>

      {/* Feedback Table */}
      <div className="table-responsive">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Rating</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">Loading feedback...</td>
              </tr>
            ) : feedbacks.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  <p>No feedback entries found.</p>
                </td>
              </tr>
            ) : (
              feedbacks.map((fb) => (
                <FeedbackItem
                  key={fb._id}
                  feedback={fb}
                  onDelete={handleDeleteClick}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <ModalComponent
        isOpen={Boolean(feedbackToDelete)}
        targetFeedback={feedbackToDelete}
        onClose={() => setFeedbackToDelete(null)}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />
    </div>
  );
}
