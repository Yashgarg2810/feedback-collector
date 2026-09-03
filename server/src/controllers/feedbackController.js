const mongoose = require('mongoose');
const Feedback = require('../models/Feedback');
const Item = require('../models/Item');

/**
 * Creates a new feedback entry
 * @param {Object} req - Express request object containing name, email, message, rating, itemName
 * @param {Object} res - Express response object
 */
const createFeedback = async (req, res) => {
  try {
    const { name, email, message, rating, itemName, itemId } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const numericRating = Number(rating) || 5;

    const feedback = await Feedback.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      rating: Math.min(5, Math.max(1, numericRating)),
      itemName: itemName ? itemName.trim() : 'General Feedback',
      itemId: itemId && mongoose.Types.ObjectId.isValid(itemId) ? itemId : undefined
    });

    // If linked to an Item, optionally update its review count
    if (itemId && mongoose.Types.ObjectId.isValid(itemId)) {
      await Item.findByIdAndUpdate(itemId, { $inc: { reviewsCount: 1 } });
    }

    res.status(201).json(feedback);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(', '), error: error.message });
    }
    res.status(500).json({ message: 'Failed to create feedback', error: error.message });
  }
};

/**
 * Retrieves feedback entries with optional filtering by keyword, date, rating, or sentiment
 * @param {Object} req - Express request object with query parameters
 * @param {Object} res - Express response object
 */
const getFeedback = async (req, res) => {
  try {
    const { keyword, date, rating, sentiment, item } = req.query;
    const filter = {};

    // Keyword search across name, message, and item name (case-insensitive)
    if (keyword && keyword.trim() !== '') {
      const cleanKeyword = keyword.trim();
      filter.$or = [
        { name: { $regex: cleanKeyword, $options: 'i' } },
        { message: { $regex: cleanKeyword, $options: 'i' } },
        { email: { $regex: cleanKeyword, $options: 'i' } },
        { itemName: { $regex: cleanKeyword, $options: 'i' } }
      ];
    }

    // Filter feedback submitted on a specific date (YYYY-MM-DD)
    if (date && date.trim() !== '') {
      const startDate = new Date(date);
      if (!isNaN(startDate.getTime())) {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);
        filter.createdAt = { $gte: startDate, $lt: endDate };
      }
    }

    // Filter by specific rating (1-5)
    if (rating && !isNaN(Number(rating))) {
      filter.rating = Number(rating);
    }

    // Filter by sentiment category (from UI tabs: excellent, good, needs_review)
    if (sentiment) {
      if (sentiment === 'excellent') {
        filter.rating = { $gte: 5 };
      } else if (sentiment === 'good') {
        filter.rating = 4;
      } else if (sentiment === 'needs_review') {
        filter.rating = { $lte: 3 };
      }
    }

    // Filter by specific item name
    if (item && item.trim() !== '' && item !== 'All Items & Products') {
      filter.itemName = item.trim();
    }

    // Sort newest submissions first
    const feedbackList = await Feedback.find(filter).sort({ createdAt: -1 });
    res.status(200).json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch feedback', error: error.message });
  }
};

/**
 * Deletes a feedback entry by ID
 * @param {Object} req - Express request object with id parameter
 * @param {Object} res - Express response object
 */
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid feedback ID format' });
    }

    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete feedback', error: error.message });
  }
};

/**
 * Returns overall statistics for admin dashboard metrics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getFeedbackStats = async (req, res) => {
  try {
    const totalCount = await Feedback.countDocuments();
    const itemsCount = await Item.countDocuments();

    const aggregateRating = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          excellentCount: { $sum: { $cond: [{ $gte: ['$rating', 5] }, 1, 0] } },
          goodCount: { $sum: { $cond: [{ $eq: ['$rating', 4] }, 1, 0] } },
          reviewCount: { $sum: { $cond: [{ $lte: ['$rating', 3] }, 1, 0] } }
        }
      }
    ]);

    const stats = aggregateRating[0] || {
      avgRating: 5.0,
      excellentCount: 0,
      goodCount: 0,
      reviewCount: 0
    };

    res.status(200).json({
      totalFeedback: totalCount,
      averageRating: Number((stats.avgRating || 5.0).toFixed(1)),
      itemsMonitored: itemsCount || 6,
      excellentCount: stats.excellentCount || 0,
      goodCount: stats.goodCount || 0,
      reviewCount: stats.reviewCount || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch feedback stats', error: error.message });
  }
};

module.exports = {
  createFeedback,
  getFeedback,
  deleteFeedback,
  getFeedbackStats
};
