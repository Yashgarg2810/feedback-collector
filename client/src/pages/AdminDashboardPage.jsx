import React, { useState, useEffect, useCallback } from 'react';
import FeedbackList from '../components/FeedbackList';
import FeedbackService from '../services/FeedbackService';

/**
 * Admin Dashboard Page for managing feedback, moderation, and viewing analytics
 * @param {Object} props
 * @param {Array} props.items - List of catalog items
 * @param {Function} props.onGoAddItem - Callback to navigate to Add Item page
 * @returns {React.ReactElement}
 */
export default function AdminDashboardPage({ items = [], onGoAddItem }) {
  // Feedbacks and stats state
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({
    totalFeedback: 0,
    averageRating: 4.8,
    itemsMonitored: items.length || 6
  });
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  const [selectedItem, setSelectedItem] = useState('All Items & Products');

  /**
   * Fetches feedback items based on active filters
   */
  const loadFeedbackData = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchKeyword.trim()) params.keyword = searchKeyword.trim();
      if (selectedDate) params.date = selectedDate;
      if (selectedSentiment !== 'all') params.sentiment = selectedSentiment;
      if (selectedItem !== 'All Items & Products') params.item = selectedItem;

      const data = await FeedbackService.getFeedback(params);
      setFeedbacks(data);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
    } finally {
      setLoading(false);
    }
  }, [searchKeyword, selectedDate, selectedSentiment, selectedItem]);

  /**
   * Loads high-level summary statistics
   */
  const loadStats = async () => {
    try {
      const statsData = await FeedbackService.getFeedbackStats();
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  useEffect(() => {
    loadFeedbackData();
  }, [loadFeedbackData]);

  useEffect(() => {
    loadStats();
  }, []);

  /**
   * Handles feedback deletion and refreshes dashboard
   * @param {string} id - Feedback record ID
   */
  const handleDeleteFeedback = async (id) => {
    await FeedbackService.deleteFeedback(id);
    await loadFeedbackData();
    await loadStats();
  };

  return (
    <div className="admin-dashboard-container">
      {/* Top Header Section */}
      <div className="admin-page-header">
        <div className="header-titles">
          <span className="live-workspace-badge">● LIVE WORKSPACE</span>
          <h1 className="admin-main-title">Feedback & Moderation</h1>
          <p className="admin-subtitle">
            Manage user feedback, triage issues, and monitor sentiment across all products.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-add-item"
          onClick={onGoAddItem}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Item
        </button>
      </div>

      {/* Top Metric Cards matching screen 3 & screen 5 */}
      <div className="metric-cards-grid">
        {/* Card 1: Total Feedback */}
        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-card-label">TOTAL FEEDBACK</span>
            <div className="metric-icon-box bg-blue-subtle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          </div>
          <div className="metric-card-value">{stats.totalFeedback || feedbacks.length}</div>
          <div className="metric-card-footer text-emerald">
            <span>↑ +14.2% this week</span>
          </div>
        </div>

        {/* Card 2: Average Rating */}
        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-card-label">AVERAGE RATING</span>
            <div className="metric-icon-box bg-indigo-subtle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
          </div>
          <div className="metric-card-value">
            {stats.averageRating || '4.8'} <span className="metric-card-subvalue">/ 5.0</span>
          </div>
          <div className="metric-card-footer text-amber">
            <span>★★★★★ Across all catalog items</span>
          </div>
        </div>

        {/* Card 3: Items Monitored */}
        <div className="metric-card">
          <div className="metric-card-top">
            <span className="metric-card-label">CATALOG ITEMS MONITORED</span>
            <div className="metric-icon-box bg-emerald-subtle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
          </div>
          <div className="metric-card-value">{items.length || 6}</div>
          <div className="metric-card-footer text-slate">
            <span>● All actively collecting feedback</span>
          </div>
        </div>
      </div>

      {/* Moderation Feedback Table & Filters */}
      <FeedbackList
        feedbacks={feedbacks}
        items={items}
        loading={loading}
        onDelete={handleDeleteFeedback}
        onSearchChange={setSearchKeyword}
        searchKeyword={searchKeyword}
        onDateChange={setSelectedDate}
        selectedDate={selectedDate}
        onSentimentChange={setSelectedSentiment}
        selectedSentiment={selectedSentiment}
        onItemFilterChange={setSelectedItem}
        selectedItem={selectedItem}
        onRefresh={() => {
          loadFeedbackData();
          loadStats();
        }}
      />
    </div>
  );
}
