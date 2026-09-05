import React from 'react';
import FeedbackForm from '../components/FeedbackForm';

/**
 * FeedbackFormPage View
 */
export default function FeedbackFormPage({
  selectedItem,
  onBackToCatalog,
  onFeedbackSubmitted
}) {
  return (
    <div className="container form-page">
      <div className="page-header-row">
        <button
          type="button"
          className="btn btn-secondary btn-back"
          onClick={onBackToCatalog}
        >
          ← Back to Products
        </button>
      </div>

      <FeedbackForm
        selectedItem={selectedItem}
        onFeedbackSubmitted={onFeedbackSubmitted}
        onCancel={onBackToCatalog}
      />

      <footer className="footer">
        <p>
          FeedbackHub &bull; Built by{' '}
          <a
            href="https://github.com/Yashgarg2810"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yash Garg
          </a>
        </p>
      </footer>
    </div>
  );
}
