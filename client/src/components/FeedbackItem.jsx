import React from 'react';
import { formatDate } from '../utils/dateUtils';
import { getSentiment } from '../utils/sentimentUtils';


export default function FeedbackItem({ feedback, onDelete }) {
  const sentiment = getSentiment(feedback.rating);

  return (
    <tr className="feedback-row">
      {/* Customer Info */}
      <td>
        <div className="user-info">
          <div className="user-avatar">
            {feedback.name ? feedback.name.slice(0, 2).toUpperCase() : 'U'}
          </div>
          <div>
            <div className="user-name">{feedback.name}</div>
            <div className="user-email">{feedback.email}</div>
          </div>
        </div>
      </td>

      {/* Item / Product */}
      <td>
        <span className="badge badge-item">{feedback.itemName || 'General'}</span>
      </td>

      {/* Rating / Sentiment */}
      <td>
        <span className={`badge ${sentiment.className}`}>
          {sentiment.emoji}
        </span>
      </td>

      {/* Message */}
      <td>
        <p className="feedback-message" title={feedback.message}>
          {feedback.message}
        </p>
      </td>

      {/* Date */}
      <td>
        <span className="date-text">{formatDate(feedback.createdAt)}</span>
      </td>

      {/* Action Button */}
      <td>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(feedback)}
        >
          Delete 🗑️
        </button>
      </td>
    </tr>
  );
}
