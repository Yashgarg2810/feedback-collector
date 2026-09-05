import React, { useState, useMemo } from 'react';
import ItemCard from '../components/ItemCard';
import { initialProducts } from '../utils/products';

/**
 * Customer Catalog Page
 * Allows users to explore catalog products and submit feedback
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

  const categories = ['All', 'Electronics', 'Lifestyle', 'Accessories', 'Furniture'];

  // Use database items if available, otherwise default to local initialProducts
  const productList = items && items.length > 0 ? items : initialProducts;

  // Filter products based on search keyword and selected category
  const filteredProducts = useMemo(() => {
    return productList.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch =
        !searchTerm.trim() ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [productList, selectedCategory, searchTerm]);

  return (
    <div className="container catalog-page">
      {/* Page Header */}
      <div className="catalog-header">
        <div>
          <h1>Explore Products & Share Feedback</h1>
          <p>Select any item below to share your experience or report an issue.</p>
        </div>

        {/* Search Input */}
        <div className="search-box">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="category-bar">
        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="items-count">Showing {filteredProducts.length} items</span>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="loading-box">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-box">No products found matching &ldquo;{searchTerm}&rdquo;.</div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ItemCard
              key={product.id || product._id || product.code}
              item={product}
              onGiveFeedback={onSelectFeedbackItem}
            />
          ))}
        </div>
      )}

      {/* General Feedback Banner */}
      <div className="card general-banner">
        <div>
          <h3>Can&apos;t find your product?</h3>
          <p>Submit general feedback or feature requests directly to our team.</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onGeneralFeedback}
        >
          Submit General Feedback →
        </button>
      </div>

      {/* Page Footer */}
      <footer className="footer">
        <p>
          FeedbackHub &bull; Built by{' '}
          <a
            href="https://github.com/Yashgarg2810"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yash Garg
          </a>
        </p>
      </footer>
    </div>
  );
}
