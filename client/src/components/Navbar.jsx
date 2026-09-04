import React from 'react';

/**
 * Top navigation bar for the customer portal
 * @param {Object} props
 * @param {string} props.activeTab - Currently active navigation tab ('items' | 'submit')
 * @param {Function} props.onSelectTab - Callback when a tab is clicked
 * @param {Function} props.onGoAdmin - Callback to switch to Admin portal
 * @returns {React.ReactElement}
 */
export default function Navbar({ activeTab, onSelectTab, onGoAdmin }) {
  return (
    <header className="customer-navbar">
      <div className="navbar-container">
        {/* Brand Logo & Title */}
        <div className="navbar-brand" onClick={() => onSelectTab('items')} role="button" tabIndex={0}>
          <div className="navbar-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
          <span className="navbar-brand-name">FeedbackHub</span>
        </div>

        {/* Navigation Tabs */}
        <nav className="navbar-links" aria-label="Customer Navigation">
          <button
            type="button"
            className={`navbar-tab ${activeTab === 'items' ? 'active' : ''}`}
            onClick={() => onSelectTab('items')}
          >
            Items
          </button>
          <button
            type="button"
            className={`navbar-tab ${activeTab === 'submit' ? 'active' : ''}`}
            onClick={() => onSelectTab('submit')}
          >
            Submit Feedback
          </button>
        </nav>

        {/* Admin Portal Quick Switch */}
        <div className="navbar-right">
          <button
            type="button"
            className="navbar-admin-btn"
            onClick={onGoAdmin}
            title="Switch to Admin Dashboard"
          >
            <span className="admin-btn-text">Admin Portal</span>
            <div className="admin-user-avatar">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Admin"
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
