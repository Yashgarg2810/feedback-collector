import React, { useState, useMemo } from 'react';
import ItemCard from '../components/ItemCard';

/**
 * Customer product catalog page to browse products and initiate feedback
 * @param {Object} props
 * @param {Array} props.items - List of catalog items
 * @param {boolean} props.loading - Loading state
 * @param {Function} props.onSelectFeedbackItem - Callback when user clicks Give Feedback on an item
 * @param {Function} props.onGeneralFeedback - Callback when user clicks Submit General Review
 * @param {Function} props.onGoAdmin - Callback to switch to admin view
 * @returns {React.ReactElement}
 */
export default function CustomerCatalogPage({
  items = [],
  loading = false,
  onSelectFeedbackItem,
  onGeneralFeedback,
  onGoAdmin
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Furniture', 'Lifestyle', 'Accessories'];

  // Filter items by category and search keyword
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        item.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        !searchTerm.trim() ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchTerm]);

  return (
    <div className="customer-page-container">
      {/* Page Header matching screen 1 */}
      <div className="catalog-header-section">
        <div className="catalog-title-wrapper">
          <span className="section-pill-badge">CUSTOMER FEEDBACK PORTAL • ITEMS</span>
          <h1 className="catalog-main-title">Explore Products & Share Feedback</h1>
          <p className="catalog-subtitle">
            Select an item below to view details and submit your review.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="catalog-search-wrapper">
          <label className="search-label" htmlFor="catalogSearch">Search Catalog</label>
          <div className="catalog-search-input-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id="catalogSearch"
              type="text"
              className="catalog-search-field"
              placeholder="Search items by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills & Item Counter matching screen 1 */}
      <div className="catalog-toolbar-bar">
        <div className="category-chips-list">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? items.length
                : items.filter((i) => i.category?.toLowerCase() === cat.toLowerCase()).length;
            return (
              <button
                key={cat}
                type="button"
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' ? `All Items (${count})` : cat}
              </button>
            );
          })}
        </div>

        <div className="showing-items-counter">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
          Showing <strong>{filteredItems.length}</strong> items
        </div>
      </div>

      {/* Product Cards Grid */}
      {loading ? (
        <div className="catalog-loading-state">
          <div className="table-loading-spinner" />
          <p>Loading products catalog...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="empty-catalog-state">
          <p>No products found matching &ldquo;{searchTerm}&rdquo; in this category.</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="catalog-grid">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id || item.code}
              item={item}
              onGiveFeedback={onSelectFeedbackItem}
            />
          ))}
        </div>
      )}

      {/* Bottom General Feedback Banner matching screen 1 */}
      <div className="general-review-banner">
        <div className="banner-question-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div className="banner-text-content">
          <h3 className="banner-title">Can&apos;t find the product you are using?</h3>
          <p className="banner-description">
            Submit a general feedback submission or request an unlisted application module.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-general-review"
          onClick={onGeneralFeedback}
        >
          Submit General Review →
        </button>
      </div>

      {/* Page Footer */}
      <footer className="customer-page-footer">
        <div className="footer-left">
          <strong>FeedbackHub</strong> &bull; Crafted by{' '}
          <a
            href="https://github.com/Yashgarg2810"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline' }}
          >
            Yash Garg
          </a>
        </div>
        <div className="footer-right">
          <button type="button" className="footer-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Public Board
          </button>
          <button type="button" className="footer-link" onClick={onGeneralFeedback}>
            Leave Feedback
          </button>
          <button type="button" className="footer-link" onClick={onGoAdmin}>
            Admin View
          </button>
        </div>
      </footer>
    </div>
  );
}
