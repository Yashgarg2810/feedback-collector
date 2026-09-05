// FeedbackService.js - Handles all API calls between React and Express backend

const API_URL = '/api';

/**
 * Fetch all feedback entries with optional filters
 * @param {Object} filters - { keyword, date, rating }
 * @returns {Promise<Array>} List of feedback objects
 */
export const getFeedback = async (filters = {}) => {
  const query = new URLSearchParams();
  if (filters.keyword) query.set('keyword', filters.keyword);
  if (filters.date) query.set('date', filters.date);
  if (filters.rating) query.set('rating', filters.rating);

  const url = `${API_URL}/feedback${query.toString() ? '?' + query.toString() : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch feedback');
  return await res.json();
};

/**
 * Submits new feedback to the server
 * @param {Object} formData - { name, email, message, rating, itemName }
 * @returns {Promise<Object>} Created feedback
 */
export const submitFeedback = async (formData) => {
  const res = await fetch(`${API_URL}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to submit feedback');
  return data;
};

/**
 * Deletes a feedback by ID
 * @param {string} id - Feedback ID
 */
export const deleteFeedback = async (id) => {
  const res = await fetch(`${API_URL}/feedback/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete feedback');
  return await res.json();
};

/**
 * Fetches dashboard stats (total count, average rating)
 */
export const getFeedbackStats = async () => {
  const res = await fetch(`${API_URL}/feedback/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return await res.json();
};

/**
 * Fetches product items for catalog
 */
export const getItems = async () => {
  const res = await fetch(`${API_URL}/items`);
  if (!res.ok) throw new Error('Failed to fetch items');
  return await res.json();
};

/**
 * Creates a new catalog item
 * @param {Object} itemData - { name, category, description, code }
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
