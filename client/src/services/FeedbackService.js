// FeedbackService.js - Handles all API calls between React and Express backend

const API_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Fetch all feedback entries with optional filters
 */
export const getFeedback = async (filters = {}) => {
  try {
    const query = new URLSearchParams();
    if (filters.keyword) query.set('keyword', filters.keyword);
    if (filters.date) query.set('date', filters.date);
    if (filters.rating) query.set('rating', filters.rating);

    const url = `${API_URL}/feedback${query.toString() ? '?' + query.toString() : ''}`;
    const res = await fetch(url);
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.log('Backend offline or unreachable:', err.message);
    return [];
  }
};

/**
 * Submits new feedback to the server
 */
export const submitFeedback = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      throw new Error(data?.message || `Server error (${res.status}). Make sure backend server is running.`);
    }

    return data;
  } catch (err) {
    throw new Error(err.message || 'Unable to connect to backend server on port 5000.');
  }
};

/**
 * Deletes a feedback by ID
 */
export const deleteFeedback = async (id) => {
  const res = await fetch(`${API_URL}/feedback/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete feedback');
  return await res.json();
};

/**
 * Fetches dashboard stats
 */
export const getFeedbackStats = async () => {
  try {
    const res = await fetch(`${API_URL}/feedback/stats`);
    if (!res.ok) return { totalFeedback: 0, averageRating: 5.0 };
    return await res.json();
  } catch {
    return { totalFeedback: 0, averageRating: 5.0 };
  }
};

/**
 * Fetches product items for catalog
 */
export const getItems = async () => {
  try {
    const res = await fetch(`${API_URL}/items`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
};

/**
 * Creates a new catalog item
 */
export const createItem = async (itemData) => {
  const res = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create item');
  return data;
};

const FeedbackService = {
  getFeedback,
  submitFeedback,
  deleteFeedback,
  getFeedbackStats,
  getItems,
  createItem
};

export default FeedbackService;
