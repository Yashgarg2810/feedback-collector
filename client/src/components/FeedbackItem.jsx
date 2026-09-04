import React from 'react';
import { formatRelativeTime } from '../utils/dateUtils';
import { getSentiment, getInitials } from '../utils/sentimentUtils';

/**
 * Renders an individual feedback entry row
 * @param {Object} props
 * @param {Object} props.feedback - The feedback data record
 * @param {Function} props.onDelete - Callback when the delete button is clicked
 * @returns {React.ReactElement}
 */
export default function FeedbackItem({ feedback, onDelete }) {
  const sentiment = getSentiment(feedback.rating);
  const initials = getInitials(feedback.name);

  // Generate consistent background color for avatar based on name initials
  const getAvatarBg = (str) => {
    const colors = [
      '#e0e7ff', '#fce7f3', '#dcfce7', '#fef3c7', '#e0f2fe', '#f3e8ff'
    ];
    const textColors = [
      '#3730a3', '#9d174d', '#166534', '#92400e', '#075985', '#6b21a8'
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return { bg: colors[index], text: textColors[index] };
  };

  const avatarColor = getAvatarBg(feedback.name || 'User');

  return (
    <tr className="feedback-item-row">
      {/* Sentiment Column */}
      <td className="col-sentiment">
        <span className={`sentiment-pill ${sentiment.className}`}>
          <span className="sentiment-emoji">{sentiment.emoji}</span>
          <span className="sentiment-label">{sentiment.label}</span>
        </span>
      </td>

      {/* Customer Column */}
      <td className="col-customer">
        <div className="customer-info-wrapper">
          <div
            className="customer-avatar"
            style={{ backgroundColor: avatarColor.bg, color: avatarColor.text }}
          >
            {initials}
          </div>
          <div className="customer-details">
            <span className="customer-name">{feedback.name}</span>
            <span className="customer-email">{feedback.email}</span>
          </div>
        </div>
      </td>

      {/* Item / Product Column */}
      <td className="col-item">
        <span className="item-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          {feedback.itemName || 'General Feedback'}
        </span>
      </td>

      {/* Message Preview Column */}
      <td className="col-message">
        <p className="message-snippet" title={feedback.message}>
          &ldquo;{feedback.message}&rdquo;
        </p>
      </td>

      {/* Date / Time Column */}
      <td className="col-date">
        <span className="time-ago">{formatRelativeTime(feedback.createdAt)}</span>
      </td>

      {/* Action Column */}
      <td className="col-action">
        <button
          type="button"
          className="btn-action-delete"
          title="Delete feedback"
          onClick={() => onDelete(feedback)}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          <span>Delete</span>
        </button>
      </td>
    </tr>
  );
}
