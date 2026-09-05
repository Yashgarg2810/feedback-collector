import React, { useState } from 'react';
import { submitFeedback } from '../services/FeedbackService';

/**
 * Reusable FeedbackForm component
 * Collects name, email, rating, and message from user
 */
export default function FeedbackForm({ selectedItem, onFeedbackSubmitted, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5,
    itemName: selectedItem ? selectedItem.name : 'General Feedback'
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Submits the feedback form data to the server
   * @param {Object} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic form validations
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.message.trim()) {
      setErrorMessage('Please write your feedback message.');
      return;
    }

    try {
      setLoading(true);
      await submitFeedback(formData);

      setSuccessMessage('Thank you! Your feedback has been submitted successfully.');

      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        message: '',
        rating: 5,
        itemName: selectedItem ? selectedItem.name : 'General Feedback'
      });

      if (onFeedbackSubmitted) {
        onFeedbackSubmitted();
      }
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card form-card">
      <div className="form-header">
        <h2>Submit Feedback</h2>
        <p className="form-subtitle">
          Reviewing: <strong>{formData.itemName}</strong>
        </p>
      </div>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        {/* Rating Stars */}
        <div className="form-group">
          <label>Overall Rating: {formData.rating} / 5 Stars</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-btn ${formData.rating >= star ? 'active' : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Your Name *</label>
          <input
            id="name"
            type="text"
            name="name"
            className="form-control"
            placeholder="e.g. Rahul Sharma"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            placeholder="e.g. rahul@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Message Field */}
        <div className="form-group">
          <div className="label-row">
            <label htmlFor="message">Feedback Message *</label>
            <span className="char-count">{formData.message.length} / 500</span>
          </div>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="form-control"
            placeholder="Write your feedback, suggestions, or comments here..."
            value={formData.message}
            onChange={handleChange}
            maxLength={500}
          />
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          {onCancel && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
    </div>
  );
}
