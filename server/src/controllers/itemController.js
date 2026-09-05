const mongoose = require('mongoose');
const Item = require('../models/Item');

// Default products list
let fallbackItems = [
  {
    _id: 'item_1',
    name: 'Wireless Noise-Canceling Headphones',
    category: 'Electronics',
    code: 'NC-300',
    description: 'Comfortable over-ear Bluetooth headphones with 30-hour battery life and clear microphone.',
    rating: 4.8,
    reviewsCount: 142
  },
  {
    _id: 'item_2',
    name: 'Smart Fitness Watch',
    category: 'Electronics',
    code: 'FITBAND-4',
    description: 'Lightweight health tracker monitoring daily steps, heart rate, and sleep quality.',
    rating: 4.5,
    reviewsCount: 64
  },
  {
    _id: 'item_3',
    name: 'Stainless Steel Water Bottle',
    category: 'Lifestyle',
    code: 'HYDRO-750',
    description: 'Insulated 750ml thermal bottle keeping drinks ice cold for 24h or hot for 12h.',
    rating: 4.9,
    reviewsCount: 210
  },
  {
    _id: 'item_4',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    code: 'MK-87',
    description: 'Compact mechanical keyboard with hot-swappable tactile switches and soft white backlighting.',
    rating: 4.7,
    reviewsCount: 86
  },
  {
    _id: 'item_5',
    name: 'Canvas Laptop Backpack',
    category: 'Accessories',
    code: 'PACK-25',
    description: 'Water-resistant everyday commuter backpack with padded 15.6-inch laptop compartment.',
    rating: 4.8,
    reviewsCount: 175
  }
];

/**
 * Retrieves catalog items
 */
const getItems = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const items = await Item.find().sort({ createdAt: -1 });
        if (items.length > 0) {
          return res.status(200).json(items);
        }
      } catch (dbErr) {
        console.log('MongoDB items query error, using fallback:', dbErr.message);
      }
    }

    return res.status(200).json(fallbackItems);
  } catch (error) {
    res.status(200).json(fallbackItems);
  }
};

/**
 * Creates a new catalog item
 */
const createItem = async (req, res) => {
  try {
    const { name, category, description, code } = req.body;

    if (!name || !category || !description) {
      return res.status(400).json({ message: 'Name, category, and description are required' });
    }

    const itemCode = code ? code.trim() : `ITEM-${Date.now().toString().slice(-4)}`;

    if (mongoose.connection.readyState === 1) {
      try {
        const newItem = await Item.create({
          name: name.trim(),
          category: category.trim(),
          description: description.trim(),
          code: itemCode,
          rating: 5.0,
          reviewsCount: 0
        });
        return res.status(201).json(newItem);
      } catch (dbErr) {
        console.log('MongoDB createItem error, using fallback:', dbErr.message);
      }
    }

    const fallbackItem = {
      _id: 'item_' + Date.now(),
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      code: itemCode,
      rating: 5.0,
      reviewsCount: 0
    };
    fallbackItems.unshift(fallbackItem);

    res.status(201).json(fallbackItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create item', error: error.message });
  }
};

module.exports = {
  getItems,
  createItem
};
