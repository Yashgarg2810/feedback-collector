import React from 'react';

/**
 * Sidebar navigation component for Admin Workspace
 * @param {Object} props
 * @param {string} props.activePage - Currently active admin view ('dashboard' | 'addItem')
 * @param {Function} props.onNavigate - Callback when navigation link is clicked
 * @param {Function} props.onGoCustomer - Callback to switch to Customer portal
 * @returns {React.ReactElement}
 */
export default function Sidebar({ activePage, onNavigate, onGoCustomer }) {
  return (
    <aside className="admin-sidebar">
      {/* Sidebar Header with Brand */}
      <div className="sidebar-brand-header">
        <div className="sidebar-brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </div>
        <div>
          <h2 className="sidebar-brand-title">FeedbackHub</h2>
          <span className="sidebar-brand-subtitle">ADMIN WORKSPACE</span>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div className="sidebar-nav-section">
        <span className="sidebar-section-title">NAVIGATION</span>
        <nav className="sidebar-nav-links">
          <button
            type="button"
            className={`sidebar-nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className="sidebar-nav-item"
            onClick={onGoCustomer}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Customer Website</span>
          </button>

          <button
            type="button"
            className={`sidebar-nav-item ${activePage === 'addItem' ? 'active' : ''}`}
            onClick={() => onNavigate('addItem')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <span>Add Item</span>
          </button>
        </nav>
      </div>

      {/* Admin User Profile Card at Bottom */}
      <div className="sidebar-footer-profile">
        <div className="profile-card">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Alex Morgan"
            className="profile-avatar"
          />
          <div className="profile-info">
            <span className="profile-name">Yash Garg</span>
            <span className="profile-role">Full Stack Developer</span>
          </div>
          <button type="button" className="profile-settings-btn" title="Admin Settings">
            ⇅
          </button>
        </div>
      </div>
    </aside>
  );
}
