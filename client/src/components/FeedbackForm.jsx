import React, { useState } from 'react';
import FeedbackService from '../services/FeedbackService';

/**
 * Reusable feedback submission form with star rating, item selection, and validation
 * @param {Object} props
 * @param {Object} [props.selectedItem] - Pre-selected product item (optional)
 * @param {Array} [props.items] - Available items for selection
 * @param {Function} [props.onFeedbackSubmitted] - Callback after successful submission
 * @param {Function} [props.onCancel] - Callback when Cancel button is clicked
 * @param {Function} [props.onChangeItem] - Callback to switch/select a different item
 * @returns {React.ReactElement}
 */
export default function FeedbackForm({
  selectedItem = null,
  items = [],
  onFeedbackSubmitted,
  onCancel,
  onChangeItem
}) {
  // Form input states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5,
    itemName: selectedItem ? selectedItem.name : 'General Feedback',
    itemId: selectedItem ? selectedItem._id : null
  });

  // UI status states
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  // Rating descriptors matching screen 2
  const ratingLabels = {
    1: '(1 = Critical Issues)',
    2: '(2 = Poor Experience)',
    3: '(3 = Average / Mixed)',
    4: '(4 = Good Experience)',
    5: '(5 = Exceptional)'
  };

  /**
   * Validates form fields before submission
   * @returns {boolean} True if all fields are valid
   */
  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide your feedback message.';
    } else if (formData.message.trim().length > 500) {
      errs.message = 'Feedback message cannot exceed 500 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /**
   * Handles text and select input changes
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Submits the feedback form to the server
   * @param {React.FormEvent} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await FeedbackService.submitFeedback(formData);
      setSubmissionSuccess(true);

      // Reset form fields
      setFormData({
        name: '',
        email: '',
        message: '',
        rating: 5,
        itemName: selectedItem ? selectedItem.name : 'General Feedback',
        itemId: selectedItem ? selectedItem._id : null
      });

      if (onFeedbackSubmitted) {
        onFeedbackSubmitted();
      }
    } catch (err) {
      setApiError(err.message || 'Something went wrong while submitting feedback.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-form-card">
      {/* Giving Feedback For Banner matching screen 2 */}
      <div className="giving-feedback-banner">
        <div className="banner-left">
          <div className="banner-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <div className="banner-label">GIVING FEEDBACK FOR</div>
            <div className="banner-item-title">
              {formData.itemName || 'General Feedback'}
              {selectedItem?.code && (
                <span className="banner-version-badge">{selectedItem.code}</span>
              )}
            </div>
          </div>
        </div>
        {onChangeItem && (
          <button
            type="button"
            className="btn-change-item"
            onClick={onChangeItem}
          >
            Change item ⇄
          </button>
        )}
      </div>

      <div className="feedback-form-body">
        <h2 className="form-heading">Share your thoughts</h2>

        {/* Success Alert */}
        {submissionSuccess && (
          <div className="alert-success" role="alert">
            <div className="alert-icon">✓</div>
            <div className="alert-content">
              <strong>Thank you for your feedback!</strong>
              <p>Your review has been securely submitted and logged in the moderation portal.</p>
            </div>
            <button
              type="button"
              className="alert-close-btn"
              onClick={() => setSubmissionSuccess(false)}
            >
              ✕
            </button>
          </div>
        )}

        {/* API Error Alert */}
        {apiError && (
          <div className="alert-danger" role="alert">
            <div className="alert-icon">⚠</div>
            <div className="alert-content">
              <strong>Submission Error</strong>
              <p>{apiError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Overall Rating Section */}
          <div className="form-group rating-group">
            <div className="rating-header">
              <label className="form-label">
                Overall Rating <span className="required-star">*</span>
              </label>
              <span className="rating-descriptor">
                {ratingLabels[hoverRating || formData.rating]}
              </span>
            </div>

            <div className="stars-wrapper" role="radiogroup" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-button ${(hoverRating || formData.rating) >= star ? 'filled' : ''}`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                  aria-label={`${star} star`}
                >
                  ★
                </button>
              ))}
              <span className="stars-help-text">(1 = Critical Issues, 5 = Exceptional)</span>
            </div>
          </div>

          {/* Name Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Your Name <span className="required-star">*</span>
            </label>
            <div className={`input-with-icon ${errors.name ? 'input-error' : ''}`}>
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                id="name"
                type="text"
                name="name"
                className="form-input"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
                maxLength={100}
              />
            </div>
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <div className="label-with-hint">
              <label className="form-label" htmlFor="email">
                Email Address <span className="required-star">*</span>
              </label>
              <span className="field-hint">Kept confidential</span>
            </div>
            <div className={`input-with-icon ${errors.email ? 'input-error' : ''}`}>
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <input
                id="email"
                type="email"
                name="email"
                className="form-input"
                placeholder="rahul@example.com"
                value={formData.email}
                onChange={handleChange}
                maxLength={150}
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Feedback Message Field */}
          <div className="form-group">
            <div className="label-with-hint">
              <label className="form-label" htmlFor="message">
                Feedback Message <span className="required-star">*</span>
              </label>
              <span className="char-counter">
                {formData.message.length} / 500
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              rows="5"
              className={`form-textarea ${errors.message ? 'input-error' : ''}`}
              placeholder="Share your thoughts, bugs, or feature suggestions..."
              value={formData.message}
              onChange={handleChange}
              maxLength={500}
            />
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>

          <p className="form-footnote">
            <span className="required-star">*</span> Fields marked with an asterisk are required to submit.
          </p>

          {/* Form Actions */}
          <div className="form-actions">
            {onCancel && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-submit-feedback"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  Submit Feedback
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '8px' }}>
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Security / Backlog Banner matching screen 2 */}
      <div className="feedback-flow-footer">
        <div className="flow-footer-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Direct transmission to product review backlog
        </div>
        <div className="flow-footer-tag">FEEDBACKHUB FLOW</div>
      </div>
    </div>
  );
}
