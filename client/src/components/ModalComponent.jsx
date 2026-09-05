import React from 'react';

/**
 * Reusable confirmation modal component
 */
export default function ModalComponent({
  isOpen,
  targetFeedback,
  onClose,
  onConfirm,
  loading = false
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-warning-icon">⚠️</span>
          <h3>Delete Feedback</h3>
        </div>

        <div className="modal-body">
          <p>
            Are you sure you want to delete feedback from{' '}
            <strong>{targetFeedback?.name || 'this user'}</strong>?
          </p>
          {targetFeedback && (
            <div className="modal-preview-box">
              <p><strong>Item:</strong> {targetFeedback.itemName || 'General'}</p>
              <p><strong>Rating:</strong> {targetFeedback.rating} / 5 Stars</p>
              <p><em>&ldquo;{targetFeedback.message}&rdquo;</em></p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
