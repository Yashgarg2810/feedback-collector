const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Service to handle all Feedback and Catalog Item API requests
 */
const FeedbackService = {
  /**
   * Submits a new feedback entry to the server
   * @param {Object} formData - Feedback payload containing name, email, message, rating, itemName, itemId
   * @returns {Promise<Object>} Created feedback object
   */
  async submitFeedback(formData) {
    const response = await fetch(`${API_BASE_URL}/api/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit feedback');
    }
    return data;
  },

  /**
   * Retrieves feedback list with optional filters (keyword, date, rating, sentiment, item)
   * @param {Object} [params={}] - Filter criteria
   * @returns {Promise<Array>} List of feedback entries
   */
  async getFeedback(params = {}) {
    const query = new URLSearchParams();
    if (params.keyword) query.set('keyword', params.keyword);
    if (params.date) query.set('date', params.date);
    if (params.rating) query.set('rating', params.rating);
    if (params.sentiment) query.set('sentiment', params.sentiment);
    if (params.item) query.set('item', params.item);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    const response = await fetch(`${API_BASE_URL}/api/feedback${queryString}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch feedback entries');
    }
    return data;
  },

  /**
   * Deletes a feedback entry by ID
   * @param {string} id - The feedback document ID to delete
   * @returns {Promise<Object>} Success message
   */
  async deleteFeedback(id) {
    const response = await fetch(`${API_BASE_URL}/api/feedback/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete feedback');
    }
    return data;
  },

  /**
   * Retrieves summary analytics for admin moderation
   * @returns {Promise<Object>} Statistics object
   */
  async getFeedbackStats() {
    const response = await fetch(`${API_BASE_URL}/api/feedback/stats`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch feedback statistics');
    }
    return data;
  },

  /**
   * Retrieves product items for catalog display
   * @returns {Promise<Array>} List of catalog items
   */
  async getItems() {
    const response = await fetch(`${API_BASE_URL}/api/items`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch catalog items');
    }
    return data;
  },

  /**
   * Creates a new item in the catalog
   * @param {Object} itemData - Item attributes (name, category, description, code, image)
   * @returns {Promise<Object>} Created item
   */
  async createItem(itemData) {
    const response = await fetch(`${API_BASE_URL}/api/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create item');
    }
    return data;
  }
};

export const {
  submitFeedback,
  getFeedback,
  deleteFeedback,
  getFeedbackStats,
  getItems,
  createItem
} = FeedbackService;

export default FeedbackService;
