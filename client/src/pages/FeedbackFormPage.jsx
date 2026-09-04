import React from 'react';
import FeedbackForm from '../components/FeedbackForm';

/**
 * Dedicated Page view for submitting user feedback
 * @param {Object} props
 * @param {Object} [props.selectedItem] - Item currently being reviewed
 * @param {Array} [props.items] - Available catalog items
 * @param {Function} props.onBackToCatalog - Callback to go back to catalog
 * @param {Function} props.onGoAdmin - Callback to switch to admin view
 * @param {Function} props.onFeedbackSubmitted - Callback after successful submission
 * @returns {React.ReactElement}
 */
export default function FeedbackFormPage({
  selectedItem,
  items,
  onBackToCatalog,
  onGoAdmin,
  onFeedbackSubmitted
}) {
  return (
    <div className="feedback-form-page-container">
      <div className="form-page-wrapper">
        <FeedbackForm
          selectedItem={selectedItem}
          items={items}
          onFeedbackSubmitted={onFeedbackSubmitted}
          onCancel={onBackToCatalog}
          onChangeItem={onBackToCatalog}
        />
      </div>

      {/* Page Footer */}
      <footer className="customer-page-footer">
        <div className="footer-left">
          <strong>FeedbackHub</strong> &bull; Crafted by{' '}
          <a
            href="https://github.com/Yashgarg2810"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline' }}
          >
            Yash Garg
          </a>
        </div>
        <div className="footer-right">
          <button type="button" className="footer-link" onClick={onBackToCatalog}>
            Public Board
          </button>
          <button type="button" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Leave Feedback
          </button>
          <button type="button" className="footer-link" onClick={onGoAdmin}>
            Admin View
          </button>
        </div>
      </footer>
    </div>
  );
}
