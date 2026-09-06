import React from 'react';

/**
 * Navigation bar for customer portal
 */

export default function Navbar({ activeTab, onSelectTab, onGoAdmin }) {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo" onClick={() => onSelectTab('items')} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">💬</span>
          <span className="logo-text">FeedbackHub</span>
        </div>

        <nav className="navbar-links">
          <button
            type="button"
            className={`nav-link ${activeTab === 'items' ? 'active' : ''}`}
            onClick={() => onSelectTab('items')}
          >
            Products
          </button>
          <button
            type="button"
            className={`nav-link ${activeTab === 'submit' ? 'active' : ''}`}
            onClick={() => onSelectTab('submit')}
          >
            Give Feedback
          </button>
          <button
            type="button"
            className="btn btn-secondary admin-btn"
            onClick={onGoAdmin}
          >
            Admin Portal ⚙️
          </button>
        </nav>
      </div>
    </header>
  );
}
