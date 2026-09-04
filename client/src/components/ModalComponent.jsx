import React, { useEffect } from 'react';

/**
 * Reusable Modal dialog component for confirmations and alerts
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls visibility of the modal
 * @param {string} props.title - Title header of the modal
 * @param {string} [props.message] - Description text
 * @param {Object} [props.targetFeedback] - Feedback object being acted upon
 * @param {Function} props.onClose - Callback to dismiss modal
 * @param {Function} props.onConfirm - Callback when confirm action is clicked
 * @param {boolean} [props.loading] - Whether confirmation action is in progress
 * @returns {React.ReactElement|null}
 */
export default function ModalComponent({
  isOpen,
  title = 'Delete Feedback?',
  message,
  targetFeedback,
  onClose,
  onConfirm,
  loading = false
}) {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Warning Icon Badge */}
        <div className="modal-icon-wrapper">
          <div className="modal-icon-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
        </div>

        <div className="modal-content">
          <h2 className="modal-title">{title}</h2>
          <p className="modal-description">
            {message || (
              <>
                Are you sure you want to remove this feedback from{' '}
                <strong>{targetFeedback?.name || 'this user'}</strong>? This action cannot be undone.
              </>
            )}
          </p>

          {/* Feedback Preview Box matching stitch screen 5 */}
          {targetFeedback && (
            <div className="modal-target-box">
              <div className="target-box-header">
                <span className="target-item-name">
                  TARGET ITEM: {(targetFeedback.itemName || 'GENERAL').toUpperCase()}
                </span>
                <span className="target-item-rating">
                  {targetFeedback.rating || 5} Stars ★
                </span>
              </div>
              <p className="target-box-quote">
                &ldquo;{targetFeedback.message}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary modal-btn-cancel"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger modal-btn-delete"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              'Deleting...'
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
