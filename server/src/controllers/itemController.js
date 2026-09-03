const Item = require('../models/Item');

const DEFAULT_ITEMS = [
  {
    name: 'Wireless Noise-Canceling Headphones',
    category: 'Electronics',
    code: 'NC-300',
    description: 'Comfortable over-ear Bluetooth headphones with 30-hour battery life and clear microphone.',
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    code: 'ERGOPRO',
    description: 'Breathable mesh desk chair with adjustable lumbar support and 3D armrests.',
    rating: 4.6,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1580481077198-c8478623910c?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Stainless Steel Water Bottle',
    category: 'Lifestyle',
    code: 'HYDRO750',
    description: 'Insulated 750ml thermal bottle keeping drinks ice cold for 24h or hot for 12h.',
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    code: 'MK-87',
    description: 'Compact mechanical keyboard with hot-swappable tactile switches and soft white backlighting.',
    rating: 4.7,
    reviewsCount: 86,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Smart Fitness Tracker',
    category: 'Electronics',
    code: 'FITBAND 4',
    description: 'Lightweight health tracker monitoring daily steps, heart rate, and sleep quality.',
    rating: 4.5,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Canvas Laptop Backpack',
    category: 'Accessories',
    code: 'PACK25',
    description: 'Water-resistant everyday commuter backpack with padded 15.6-inch laptop compartment.',
    rating: 4.8,
    reviewsCount: 175,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80'
  }
];

/**
 * Retrieves catalog items, auto-seeding if collection is empty
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getItems = async (req, res) => {
  try {
    let items = await Item.find().sort({ createdAt: -1 });

    // Seed default items if catalog is fresh
    if (items.length === 0) {
      await Item.insertMany(DEFAULT_ITEMS);
      items = await Item.find().sort({ createdAt: -1 });
    }

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items', error: error.message });
  }
};

/**
 * Creates a new catalog item
 * @param {Object} req - Express request object containing name, category, description, code, image
 * @param {Object} res - Express response object
 */
const createItem = async (req, res) => {
  try {
    const { name, category, description, code, image } = req.body;

    if (!name || !category || !description) {
      return res.status(400).json({ message: 'Name, category, and description are required' });
    }

    const newItem = await Item.create({
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      code: code ? code.trim() : `ITEM-${Date.now().toString().slice(-4)}`,
      image: image ? image.trim() : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewsCount: 0
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create item', error: error.message });
  }
};

module.exports = {
  getItems,
  createItem
};
