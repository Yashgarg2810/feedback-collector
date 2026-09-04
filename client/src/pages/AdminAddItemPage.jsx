import React, { useState } from 'react';
import FeedbackService from '../services/FeedbackService';

/**
 * Admin page for creating a new product or item in the catalog
 * @param {Object} props
 * @param {Function} props.onItemCreated - Callback after successful item creation
 * @param {Function} props.onCancel - Callback to navigate back to dashboard
 * @returns {React.ReactElement}
 */
export default function AdminAddItemPage({ onItemCreated, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    code: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  // Preset thumbnails for easy selection
  const presetThumbnails = [
    { label: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80' },
    { label: 'Laptop/Desk', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80' },
    { label: 'Smartwatch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80' },
    { label: 'Chair', url: 'https://images.unsplash.com/photo-1580481077198-c8478623910c?w=500&auto=format&fit=crop&q=80' }
  ];

  // Calculate form completeness percentage matching screen 4
  const totalRequired = 3;
  let filledCount = 0;
  if (formData.name.trim()) filledCount += 1;
  if (formData.category.trim()) filledCount += 1;
  if (formData.description.trim()) filledCount += 1;
  const completenessPercent = Math.round((filledCount / totalRequired) * 100);
  const pendingFields = totalRequired - filledCount;

  /**
   * Handles text input changes
   * @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Validates form fields
   * @returns {boolean}
   */
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Item name is required.';
    }
    if (!formData.category.trim()) {
      errs.category = 'Please select a category.';
    }
    if (!formData.description.trim()) {
      errs.description = 'Item description is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /**
   * Submits new catalog item to API
   * @param {React.FormEvent} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await FeedbackService.createItem({
        ...formData,
        code: formData.code.trim() || `SKU-${Math.floor(100 + Math.random() * 900)}`
      });
      if (onItemCreated) onItemCreated();
    } catch (err) {
      setApiError(err.message || 'Failed to create item');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-item-page-container">
      {/* Breadcrumb matching screen 4 */}
      <div className="admin-breadcrumb-nav">
        <span>Catalog Management</span>
        <span className="crumb-separator">›</span>
        <span>Items</span>
        <span className="crumb-separator">›</span>
        <span className="crumb-current">New Entry</span>
      </div>

      {/* Header with completeness badge matching screen 4 */}
      <div className="add-item-header-card">
        <div className="add-item-title-col">
          <h1 className="add-item-title">Add New Item</h1>
          <p className="add-item-subtitle">
            Create a new product or item for customers to review. Once published, feedback boards and
            voting widgets will initialize automatically.
          </p>
        </div>

        <div className="completeness-box">
          <div className="completeness-circle">
            <span className="completeness-value">{completenessPercent}%</span>
          </div>
          <div className="completeness-details">
            <strong>Form Completeness</strong>
            <span>{pendingFields === 0 ? 'All required fields filled' : `${pendingFields} fields pending`}</span>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="add-item-form-card">
        {apiError && (
          <div className="alert-danger" role="alert">
            <div className="alert-icon">⚠</div>
            <div className="alert-content">
              <strong>Error creating item</strong>
              <p>{apiError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Section 1: Identity & Classification */}
          <section className="form-step-section">
            <div className="step-section-header">
              <span className="step-number-badge">1</span>
              <h3 className="step-section-title">Identity & Classification</h3>
            </div>

            <div className="form-group">
              <div className="label-with-hint">
                <label className="form-label" htmlFor="itemNameInput">
                  Item Name <span className="required-star">*</span>
                </label>
                <span className="char-counter">{formData.name.length}/60 characters</span>
              </div>
              <input
                id="itemNameInput"
                type="text"
                name="name"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                placeholder="e.g. CloudSync Pro"
                value={formData.name}
                onChange={handleChange}
                maxLength={60}
              />
              <span className="field-note">
                Use a customer-facing product title. Keep it clear, recognizable, and distinct.
              </span>
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="itemCategoryInput">
                  Category <span className="required-star">*</span>
                </label>
                <select
                  id="itemCategoryInput"
                  name="category"
                  className={`form-select ${errors.category ? 'input-error' : ''}`}
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a product category...</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Software">Software</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && <span className="error-text">{errors.category}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="itemCodeInput">
                  Model / SKU Code (Optional)
                </label>
                <input
                  id="itemCodeInput"
                  type="text"
                  name="code"
                  className="form-input"
                  placeholder="e.g. NC-300 or ERGOPRO"
                  value={formData.code}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* Section 2: Item Summary & Scope */}
          <section className="form-step-section">
            <div className="step-section-header">
              <span className="step-number-badge">2</span>
              <h3 className="step-section-title">Item Summary & Scope</h3>
            </div>

            <div className="form-group">
              <div className="label-with-hint">
                <label className="form-label" htmlFor="itemDescInput">
                  Item Description <span className="required-star">*</span>
                </label>
                <span className="char-counter">{formData.description.length}/240</span>
              </div>
              <textarea
                id="itemDescInput"
                name="description"
                rows="4"
                className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                placeholder="Brief summary of what this item or feature does. Highlight the target audience and primary capabilities for customer reviewers..."
                value={formData.description}
                onChange={handleChange}
                maxLength={240}
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>
          </section>

          {/* Section 3: Media & Thumbnail Assets */}
          <section className="form-step-section">
            <div className="step-section-header">
              <span className="step-number-badge">3</span>
              <h3 className="step-section-title">Media & Thumbnail Assets</h3>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="itemImageInput">Product Thumbnail Image URL</label>
              <input
                id="itemImageInput"
                type="url"
                name="image"
                className="form-input"
                placeholder="Paste image URL (e.g. https://...)"
                value={formData.image}
                onChange={handleChange}
              />
              <div className="preset-thumbnails-row">
                <span className="presets-label">Or choose sample thumbnail:</span>
                {presetThumbnails.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    className="preset-btn"
                    onClick={() => setFormData((prev) => ({ ...prev, image: preset.url }))}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {formData.image && (
                <div className="thumbnail-preview-box">
                  <img src={formData.image} alt="Thumbnail preview" className="thumbnail-preview-img" />
                  <span className="preview-label">Image Preview</span>
                </div>
              )}
            </div>
          </section>

          {/* Bottom Actions Bar matching screen 4 */}
          <div className="add-item-actions-footer">
            <div className="governance-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" style={{ marginRight: '6px' }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              Input complies with catalog governance standards.
            </div>

            <div className="footer-button-group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-create-item"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Creating...'
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Create Item
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
