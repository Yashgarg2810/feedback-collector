import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CustomerCatalogPage from './pages/CustomerCatalogPage';
import FeedbackFormPage from './pages/FeedbackFormPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminAddItemPage from './pages/AdminAddItemPage';
import FeedbackService from './services/FeedbackService';


export default function App() {
  const [currentView, setCurrentView] = useState('customer-catalog');
  const [selectedItem, setSelectedItem] = useState(null);

  // Catalog items list
  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState('');

  /**
   * Displays a temporary notification toast
   * @param {string} msg - Message to display
   */
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  /**
   * Fetches product items from the server
   */
  const loadItems = useCallback(async () => {
    try {
      setItemsLoading(true);
      const data = await FeedbackService.getItems();
      setItems(data);
    } catch (err) {
      console.error('Failed to load items:', err);
    } finally {
      setItemsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  /**
   * Initiates feedback for a specific product card
   * @param {Object} item - Catalog item
   */
  const handleSelectFeedbackItem = (item) => {
    setSelectedItem(item);
    setCurrentView('customer-form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Initiates general feedback without a pre-selected item
   */
  const handleGeneralFeedback = () => {
    setSelectedItem(null);
    setCurrentView('customer-form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Triggered when feedback has been submitted
   */
  const handleFeedbackSubmitted = () => {
    showToast('Feedback submitted successfully! Thank you.');
    loadItems();
  };

  /**
   * Triggered when an admin creates a new catalog item
   */
  const handleItemCreated = () => {
    showToast('New item published to catalog successfully!');
    loadItems();
    setCurrentView('admin-dashboard');
  };

  const isAdminView = currentView.startsWith('admin');

  return (
    <div className={`app-root ${isAdminView ? 'view-admin' : 'view-customer'}`}>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="toast-notification">
          <span className="toast-icon">✓</span>
          <span>{toastMessage}</span>
          <button
            type="button"
            className="toast-close"
            onClick={() => setToastMessage('')}
          >
            ✕
          </button>
        </div>
      )}

      {/* Customer Header Navigation */}
      {!isAdminView && (
        <Navbar
          activeTab={currentView === 'customer-catalog' ? 'items' : 'submit'}
          onSelectTab={(tab) => {
            if (tab === 'items') {
              setCurrentView('customer-catalog');
            } else {
              setSelectedItem(null);
              setCurrentView('customer-form');
            }
          }}
          onGoAdmin={() => setCurrentView('admin-dashboard')}
        />
      )}

      {/* Main Container Layout */}
      <div className={`app-body-layout ${isAdminView ? 'admin-layout' : 'customer-layout'}`}>
        {/* Admin Sidebar Navigation */}
        {isAdminView && (
          <Sidebar
            activePage={currentView === 'admin-dashboard' ? 'dashboard' : 'addItem'}
            onNavigate={(page) => {
              if (page === 'dashboard') setCurrentView('admin-dashboard');
              if (page === 'addItem') setCurrentView('admin-add-item');
            }}
            onGoCustomer={() => setCurrentView('customer-catalog')}
          />
        )}

        {/* Page Content View */}
        <main className={`page-main-content ${isAdminView ? 'admin-main-viewport' : 'customer-main-viewport'}`}>
          {currentView === 'customer-catalog' && (
            <CustomerCatalogPage
              items={items}
              loading={itemsLoading}
              onSelectFeedbackItem={handleSelectFeedbackItem}
              onGeneralFeedback={handleGeneralFeedback}
              onGoAdmin={() => setCurrentView('admin-dashboard')}
            />
          )}

          {currentView === 'customer-form' && (
            <FeedbackFormPage
              selectedItem={selectedItem}
              items={items}
              onBackToCatalog={() => setCurrentView('customer-catalog')}
              onGoAdmin={() => setCurrentView('admin-dashboard')}
              onFeedbackSubmitted={handleFeedbackSubmitted}
            />
          )}

          {currentView === 'admin-dashboard' && (
            <AdminDashboardPage
              items={items}
              onGoAddItem={() => setCurrentView('admin-add-item')}
            />
          )}

          {currentView === 'admin-add-item' && (
            <AdminAddItemPage
              onItemCreated={handleItemCreated}
              onCancel={() => setCurrentView('admin-dashboard')}
            />
          )}
        </main>
      </div>
    </div>
  );
}
