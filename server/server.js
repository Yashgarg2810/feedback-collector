const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const feedbackRoutes = require('./src/routes/feedbackRoutes');
const itemRoutes = require('./src/routes/itemRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors()); // allow requests from frontend (different port)
app.use(express.json()); // parse application/json

app.use('/api/feedback', feedbackRoutes);
app.use('/api/items', itemRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'FeedbackHub Backend API is running successfully!',
    status: 'active',
    endpoints: {
      feedback: '/api/feedback',
      items: '/api/items',
      health: '/api/health'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
