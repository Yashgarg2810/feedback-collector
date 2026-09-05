import React, { useState } from 'react';
import { createItem } from '../services/FeedbackService';

/**
 * AdminAddItemPage
 * Form to create a new product item in the catalog
 */
export default function AdminAddItemPage({ onItemCreated, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    description: '',
    code: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please enter item name.');
      return;
    }

    if (!formData.description.trim()) {
      setError('Please enter item description.');
      return;
    }

    try {
      setLoading(true);
      await createItem({
        ...formData,
        code: formData.code.trim() || `ITEM-${Math.floor(100 + Math.random() * 900)}`
      });
      if (onItemCreated) onItemCreated();
    } catch (err) {
      setError(err.message || 'Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-content">
      <div className="admin-header">
        <div>
          <h2>Add New Catalog Item</h2>
          <p>Create a new product or item for customers to review.</p>
        </div>
      </div>

      <div className="card form-card">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="itemName">Item Name *</label>
            <input
              id="itemName"
              type="text"
              name="name"
              className="form-control"
              placeholder="e.g. Wireless Mouse"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemCategory">Category *</label>
            <select
              id="itemCategory"
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Electronics">Electronics</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Accessories">Accessories</option>
              <option value="Furniture">Furniture</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="itemCode">Model / Code (Optional)</label>
            <input
              id="itemCode"
              type="text"
              name="code"
              className="form-control"
              placeholder="e.g. WM-100"
              value={formData.code}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemDescription">Description *</label>
            <textarea
              id="itemDescription"
              name="description"
              rows="3"
              className="form-control"
              placeholder="Brief description of the product..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
