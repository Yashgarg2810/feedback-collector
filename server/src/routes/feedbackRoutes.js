const express = require('express');
const router = express.Router();

const {
  createFeedback,
  getFeedback,
  deleteFeedback,
  getFeedbackStats
} = require('../controllers/feedbackController');

// Feedback stats endpoint
router.get('/stats', getFeedbackStats);

// Feedback CRUD endpoints
router.post('/', createFeedback);
router.get('/', getFeedback);
router.delete('/:id', deleteFeedback);

module.exports = router;
