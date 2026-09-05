import React from 'react';
import headphoneImg from '../assets/headphone.avif';
import watchImg from '../assets/watch.avif';
import bottleImg from '../assets/bottle.avif';
import keyboardImg from '../assets/keyboard.avif';
import bagImg from '../assets/bag.avif';
import chairImg from '../assets/chair.jfif';
import choclateImg from '../assets/choclate.webp';

// Map code to local image imported from assets
const imageMap = {
  'NC-300': headphoneImg,
  'FITBAND 4': watchImg,
  'FITBAND-4': watchImg,
  'HYDRO750': bottleImg,
  'HYDRO-750': bottleImg,
  'MK-87': keyboardImg,
  'PACK25': bagImg,
  'PACK-25': bagImg,
  'ERGOPRO': chairImg,
  'Valentine': choclateImg
};

/**
 * Reusable product card component
 */
export default function ItemCard({ item, onGiveFeedback }) {
  // Use mapped local asset or fallback to headphone
  const cardImage = imageMap[item.code] || headphoneImg;

  return (
    <div className="item-card">
      <div className="item-card-image-wrapper">
        <img src={cardImage} alt={item.name} className="item-card-img" />
        <span className="badge badge-category">{item.category}</span>
      </div>

      <div className="item-card-body">
        <div className="item-card-title-row">
          <h3 className="item-card-title">{item.name}</h3>
          {item.code && <span className="item-card-code">{item.code}</span>}
        </div>

        <p className="item-card-desc">{item.description}</p>

        <div className="item-card-rating">
          <span className="star-text">★ {item.rating || 4.5}</span>
          <span className="reviews-count">({item.reviewsCount || 0} reviews)</span>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-feedback"
          onClick={() => onGiveFeedback(item)}
        >
          Give Feedback ✍️
        </button>
      </div>
    </div>
  );
}
