import React, { useState, useEffect, useCallback } from 'react';
import FeedbackList from '../components/FeedbackList';
import { getFeedback, deleteFeedback, getFeedbackStats } from '../services/FeedbackService';

/**
 * Admin Dashboard Page
 * Triage and manage customer feedback with search and date filters
 */
export default function AdminDashboardPage({ onGoAddItem }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stats state
  const [totalCount, setTotalCount] = useState(0);
  const [avgRating, setAvgRating] = useState(5.0);

  // Filter states
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  // Fetch feedback from backend
  const loadFeedbacks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFeedback({
        keyword: searchKeyword,
        date: selectedDate,
        rating: selectedRating
      });
      setFeedbacks(data);
    } catch (err) {
      console.error('Error fetching feedback:', err);
    } finally {
      setLoading(false);
    }
  }, [searchKeyword, selectedDate, selectedRating]);

  // Fetch stats from backend
  const loadStats = async () => {
    try {
      const stats = await getFeedbackStats();
      setTotalCount(stats.totalFeedback || 0);
      setAvgRating(stats.averageRating || 5.0);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, [loadFeedbacks]);

  useEffect(() => {
    loadStats();
  }, []);

  // Delete feedback and refresh
  const handleDeleteFeedback = async (id) => {
    await deleteFeedback(id);
    await loadFeedbacks();
    await loadStats();
  };

  return (
    <div className="admin-content">
      {/* Top Header */}
      <div className="admin-header">
        <div>
          <h2>Feedback Moderation Dashboard</h2>
          <p>View, filter, and manage customer feedback submissions.</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onGoAddItem}
        >
          ➕ Add New Item
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-row">
        <div className="card stat-card">
          <div className="stat-label">Total Feedback</div>
          <div className="stat-number">{totalCount || feedbacks.length}</div>
        </div>

        <div className="card stat-card">
          <div className="stat-label">Average Rating</div>
          <div className="stat-number">⭐ {avgRating} / 5.0</div>
        </div>
      </div>

      {/* Feedback List Table & Filters */}
      <FeedbackList
        feedbacks={feedbacks}
        loading={loading}
        onDeleteFeedback={handleDeleteFeedback}
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        selectedRating={selectedRating}
        onRatingChange={setSelectedRating}
      />
    </div>
  );
}
