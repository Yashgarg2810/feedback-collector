// Local product images imported directly from assets
import headphoneImg from '../assets/headphone.avif';
import watchImg from '../assets/watch.avif';
import bottleImg from '../assets/bottle.avif';
import keyboardImg from '../assets/keyboard.avif';
import bagImg from '../assets/bag.avif';

export const initialProducts = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    category: 'Electronics',
    code: 'NC-300',
    description: 'Comfortable over-ear Bluetooth headphones with 30-hour battery life and clear microphone.',
    rating: 4.8,
    reviewsCount: 142,
    image: headphoneImg
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    category: 'Electronics',
    code: 'FITBAND-4',
    description: 'Lightweight health tracker monitoring daily steps, heart rate, and sleep quality.',
    rating: 4.5,
    reviewsCount: 64,
    image: watchImg
  },
  {
    id: '3',
    name: 'Stainless Steel Water Bottle',
    category: 'Lifestyle',
    code: 'HYDRO-750',
    description: 'Insulated 750ml thermal bottle keeping drinks ice cold for 24h or hot for 12h.',
    rating: 4.9,
    reviewsCount: 210,
    image: bottleImg
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    code: 'MK-87',
    description: 'Compact mechanical keyboard with hot-swappable tactile switches and white backlighting.',
    rating: 4.7,
    reviewsCount: 86,
    image: keyboardImg
  },
  {
    id: '5',
    name: 'Canvas Laptop Backpack',
    category: 'Accessories',
    code: 'PACK-25',
    description: 'Water-resistant everyday commuter backpack with padded 15.6-inch laptop compartment.',
    rating: 4.8,
    reviewsCount: 175,
    image: bagImg
  }
];
