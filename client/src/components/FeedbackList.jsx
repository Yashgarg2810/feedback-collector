import React, { useState } from 'react';
import FeedbackItem from './FeedbackItem';
import ModalComponent from './ModalComponent';

/**
 * Renders the interactive feedback moderation table with filtering and deletion modal
 * @param {Object} props
 * @param {Array} props.feedbacks - Feedback records to display
 * @param {Array} props.items - Available catalog items for filter dropdown
 * @param {boolean} props.loading - Loading state indicator
 * @param {Function} props.onDelete - Callback when feedback deletion is confirmed
 * @param {Function} props.onSearchChange - Callback when search keyword changes
 * @param {string} props.searchKeyword - Current keyword filter
 * @param {Function} props.onDateChange - Callback when date filter changes
 * @param {string} props.selectedDate - Current date filter
 * @param {Function} props.onSentimentChange - Callback when sentiment filter changes
 * @param {string} props.selectedSentiment - Current sentiment filter ('all', 'excellent', 'good', 'needs_review')
 * @param {Function} props.onItemFilterChange - Callback when item dropdown filter changes
 * @param {string} props.selectedItem - Currently selected item name filter
 * @param {Function} props.onRefresh - Callback to re-fetch feedback
 * @returns {React.ReactElement}
 */
export default function FeedbackList({
  feedbacks = [],
  items = [],
  loading = false,
  onDelete,
  onSearchChange,
  searchKeyword = '',
  onDateChange,
  selectedDate = '',
  onSentimentChange,
  selectedSentiment = 'all',
  onItemFilterChange,
  selectedItem = 'All Items & Products',
  onRefresh
}) {
  // Modal state for delete confirmation
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pagination state (5 rows per page matching screen 3)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalResults = feedbacks.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedFeedbacks = feedbacks.slice(startIndex, startIndex + pageSize);

  /**
   * Opens delete confirmation modal
   * @param {Object} feedback - Selected feedback item
   */
  const handleDeleteClick = (feedback) => {
    setFeedbackToDelete(feedback);
  };

  /**
   * Confirms deletion of selected feedback
   */
  const handleConfirmDelete = async () => {
    if (!feedbackToDelete) return;
    try {
      setIsDeleting(true);
      await onDelete(feedbackToDelete._id);
      setFeedbackToDelete(null);
    } catch (err) {
      console.error('Failed to delete feedback:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Clears all active filters
   */
  const handleResetFilters = () => {
    onSearchChange('');
    onDateChange('');
    onSentimentChange('all');
    onItemFilterChange('All Items & Products');
    setCurrentPage(1);
    if (onRefresh) onRefresh();
  };

  return (
    <div className="feedback-list-container">
      {/* Top Filter and Controls Bar */}
      <div className="filter-bar-card">
        <div className="filter-bar-row">
          {/* Keyword Search Input */}
          <div className="search-input-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search feedback by keyword, user, email..."
              value={searchKeyword}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setCurrentPage(1);
              }}
            />
            {searchKeyword && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => {
                  onSearchChange('');
                  setCurrentPage(1);
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Product Dropdown Filter */}
          <div className="filter-dropdown-wrapper">
            <select
              className="filter-select"
              value={selectedItem}
              onChange={(e) => {
                onItemFilterChange(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All Items & Products">All Items & Products</option>
              {items.map((item) => (
                <option key={item._id || item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker Filter */}
          <div className="filter-date-wrapper">
            <input
              type="date"
              className="filter-date-input"
              title="Filter by submission date"
              value={selectedDate}
              onChange={(e) => {
                onDateChange(e.target.value);
                setCurrentPage(1);
              }}
            />
            {selectedDate && (
              <button
                type="button"
                className="date-clear-btn"
                title="Clear date filter"
                onClick={() => {
                  onDateChange('');
                  setCurrentPage(1);
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Refresh / Reset Button */}
          <button
            type="button"
            className="btn-refresh"
            title="Refresh list"
            onClick={handleResetFilters}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </button>
        </div>

        {/* Sentiment Filter Chips */}
        <div className="filter-chips-row">
          <span className="filter-chips-label">FILTER:</span>
          <button
            type="button"
            className={`filter-chip ${selectedSentiment === 'all' ? 'active' : ''}`}
            onClick={() => {
              onSentimentChange('all');
              setCurrentPage(1);
            }}
          >
            All <span className="chip-count">{totalResults}</span>
          </button>
          <button
            type="button"
            className={`filter-chip ${selectedSentiment === 'excellent' ? 'active' : ''}`}
            onClick={() => {
              onSentimentChange('excellent');
              setCurrentPage(1);
            }}
          >
            ● Excellent
          </button>
          <button
            type="button"
            className={`filter-chip ${selectedSentiment === 'good' ? 'active' : ''}`}
            onClick={() => {
              onSentimentChange('good');
              setCurrentPage(1);
            }}
          >
            ● Good
          </button>
          <button
            type="button"
            className={`filter-chip ${selectedSentiment === 'needs_review' ? 'active' : ''}`}
            onClick={() => {
              onSentimentChange('needs_review');
              setCurrentPage(1);
            }}
          >
            ● Needs Review
          </button>
        </div>
      </div>

      {/* Feedback Moderation Table */}
      <div className="table-responsive">
        <table className="feedback-table">
          <thead>
            <tr>
              <th style={{ width: '150px' }}>SENTIMENT</th>
              <th style={{ width: '220px' }}>CUSTOMER</th>
              <th style={{ width: '190px' }}>ITEM / PRODUCT</th>
              <th>MESSAGE PREVIEW</th>
              <th style={{ width: '120px' }}>DATE / TIME</th>
              <th style={{ width: '110px', textAlign: 'center' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="table-status-cell">
                  <div className="table-loading-spinner" />
                  <p>Loading feedback records...</p>
                </td>
              </tr>
            ) : paginatedFeedbacks.length === 0 ? (
              <tr>
                <td colSpan="6" className="table-status-cell">
                  <div className="empty-state">
                    <span className="empty-state-icon">🔍</span>
                    <h3>No feedback found</h3>
                    <p>Try adjusting your search query, date, or sentiment filters.</p>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleResetFilters}
                    >
                      Clear Filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedFeedbacks.map((fb) => (
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

      {/* Pagination Footer matching screen 3 */}
      {totalResults > 0 && (
        <div className="table-pagination-footer">
          <span className="pagination-summary">
            Showing <strong>{startIndex + 1}</strong> to{' '}
            <strong>{Math.min(startIndex + pageSize, totalResults)}</strong> of{' '}
            <strong>{totalResults}</strong> results
          </span>

          <div className="pagination-nav-buttons">
            <button
              type="button"
              className="btn-pagination-nav"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              ‹ Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                className={`btn-pagination-page ${currentPage === pageNum ? 'active' : ''}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            <button
              type="button"
              className="btn-pagination-nav"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next ›
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Deletion matching screen 5 */}
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
