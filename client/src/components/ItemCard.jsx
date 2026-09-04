import React from 'react';
import headphoneImg from '../assets/headphone.avif';
import watchImg from '../assets/watch.avif';
import bottleImg from '../assets/bottle.avif';
import keyboardImg from '../assets/keyboard.avif';
import bagImg from '../assets/bag.avif';
import chairImg from '../assets/chair.jfif';
import choclateImg from '../assets/choclate.webp';

// Map item codes to their images.
const itemImages = {
  'NC-300': headphoneImg,
  'FITBAND 4': watchImg,
  'FITBAND-4': watchImg,
  HYDRO750: bottleImg,
  'HYDRO-750': bottleImg,
  'MK-87': keyboardImg,
  PACK25: bagImg,
  'PACK-25': bagImg,
  ERGOPRO: chairImg,
  'ERGO-PRO': chairImg,
  'Valentine': choclateImg,
};

/**
 * Product item card component for the catalog view
 * @param {Object} props
 * @param {Object} props.item - The catalog item data
 * @param {Function} props.onGiveFeedback - Callback when Give Feedback button is clicked
 * @param {Function} [props.onViewDetails] - Optional callback for viewing item details
 * @returns {React.ReactElement}
 */
export default function ItemCard({ item, onGiveFeedback, onViewDetails }) {
  const image = itemImages[item.code] || headphoneImg;

  return (
    <div className="product-card">
      {/* Thumbnail Banner with badges */}
      <div className="product-card-image-container">
        <img
          src={image}
          alt={item.name}
          className="product-card-image"
          loading="lazy"
        />
        <div className="card-top-badges">
          <span className="category-badge">{item.category}</span>
          <span className="rating-badge">
            ★ {item.rating || 4.8} ({item.reviewsCount || 0} reviews)
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="product-card-body">
        <div className="product-card-header">
          <h3 className="product-title">{item.name}</h3>
          {item.code && <span className="product-sku">{item.code}</span>}
        </div>
        <p className="product-description">{item.description}</p>

        {/* Card Action Buttons */}
        <div className="product-card-actions">
          <button
            type="button"
            className="btn btn-card-details"
            onClick={() => onViewDetails ? onViewDetails(item) : onGiveFeedback(item)}
          >
            View Details
          </button>
          <button
            type="button"
            className="btn btn-card-feedback"
            onClick={() => onGiveFeedback(item)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Give Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
