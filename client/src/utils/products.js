// Local product images imported directly from assets
import headphoneImg from '../assets/headphone.avif';
import watchImg from '../assets/watch.avif';
import bottleImg from '../assets/bottle.avif';
import keyboardImg from '../assets/keyboard.avif';
import bagImg from '../assets/bag.avif';
import chairImg from '../assets/chair.jfif';
import choclateImg from '../assets/choclate.webp';
import mouseImg from '../assets/mouse.jpg';
import sofaImg from '../assets/sofa.avif';

export const initialProducts = [
  {
    id: '1',
    name: 'Sofa',
    category: 'Furniture',
    code: 'ITEM-276',
    description: 'A sofa (also known as a couch) is a long, cushioned piece of furniture designed to let multiple people sit comfortably. Choosing the right sofa depends heavily on your room\'s layout, material preferences, and design taste.',
    rating: 5.0,
    reviewsCount: 0,
    image: sofaImg
  },
  {
    id: '2',
    name: 'Wireless Mouse',
    category: 'Electronics',
    code: 'WM-100',
    description: 'Wireless mice are incredibly useful tools because they give you the freedom to move your cursor without messy cords tangling up your desk.',
    rating: 5.0,
    reviewsCount: 0,
    image: mouseImg
  },
  {
    id: '3',
    name: 'Dairy Milk',
    category: 'Other',
    code: 'Valentine',
    description: 'Cadbury Dairy Milk is a world-renowned brand of milk chocolate manufactured by Cadbury. First introduced in the United Kingdom in 1905, it has grown into a market leader across countries.',
    rating: 5.0,
    reviewsCount: 1,
    image: choclateImg
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    code: 'MK-87',
    description: 'Compact mechanical keyboard with hot-swappable tactile switches and soft white backlighting.',
    rating: 4.7,
    reviewsCount: 86,
    image: keyboardImg
  },
  {
    id: '5',
    name: 'Smart Fitness Tracker',
    category: 'Electronics',
    code: 'FITBAND 4',
    description: 'Lightweight health tracker monitoring daily steps, heart rate, and sleep quality.',
    rating: 4.5,
    reviewsCount: 64,
    image: watchImg
  },
  {
    id: '6',
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    code: 'ERGOPRO',
    description: 'Breathable mesh desk chair with adjustable lumbar support and 3D armrests.',
    rating: 4.6,
    reviewsCount: 98,
    image: chairImg
  },
  {
    id: '7',
    name: 'Stainless Steel Water Bottle',
    category: 'Lifestyle',
    code: 'HYDRO750',
    description: 'Insulated 750ml thermal bottle keeping drinks ice cold for 24h or hot for 12h.',
    rating: 4.9,
    reviewsCount: 211,
    image: bottleImg
  },
  {
    id: '8',
    name: 'Canvas Laptop Backpack',
    category: 'Accessories',
    code: 'PACK25',
    description: 'Water-resistant everyday commuter backpack with padded 15.6-inch laptop compartment.',
    rating: 4.8,
    reviewsCount: 175,
    image: bagImg
  },
  {
    id: '9',
    name: 'Wireless Noise-Canceling Headphones',
    category: 'Electronics',
    code: 'NC-300',
    description: 'Comfortable over-ear Bluetooth headphones with 30-hour battery life and clear microphone.',
    rating: 4.8,
    reviewsCount: 142,
    image: headphoneImg
  }
];
