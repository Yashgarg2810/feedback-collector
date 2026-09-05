import React from 'react';

/**
 * Sidebar component for Admin Dashboard
 */
export default function Sidebar({ activePage, onNavigate, onGoCustomer }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h3>FeedbackHub</h3>
        <span>Admin Panel</span>
      </div>

      <nav className="sidebar-menu">
        <button
          type="button"
          className={`sidebar-link ${activePage === 'dashboard' ? 'active' : ''}`}
          onClick={() => onNavigate('dashboard')}
        >
          📊 Dashboard
        </button>

        <button
          type="button"
          className={`sidebar-link ${activePage === 'addItem' ? 'active' : ''}`}
          onClick={() => onNavigate('addItem')}
        >
          ➕ Add New Item
        </button>

        <button
          type="button"
          className="sidebar-link"
          onClick={onGoCustomer}
        >
          🌐 Customer Website
        </button>
      </nav>

      {/* Admin User Info */}
      <div className="sidebar-user">
        <div className="user-badge">YG</div>
        <div>
          <div className="user-name">Yash Garg</div>
          <div className="user-role">Full Stack Developer</div>
        </div>
      </div>
    </aside>
  );
}
