import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CustomerCatalogPage from './pages/CustomerCatalogPage';
import FeedbackFormPage from './pages/FeedbackFormPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminAddItemPage from './pages/AdminAddItemPage';
import { getItems } from './services/FeedbackService';

/**
 * Main App Component
 * Handles page navigation and global items state
 */
export default function App() {
  // Current view state: 'catalog' | 'feedback' | 'admin' | 'add-item'
  const [currentView, setCurrentView] = useState('catalog');

  // Currently selected item for feedback
  const [selectedItem, setSelectedItem] = useState(null);

  // Catalog items list
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  // Fetch catalog items from backend
  const loadItems = useCallback(async () => {
    try {
      setLoadingItems(true);
      const data = await getItems();
      setItems(data);
    } catch (err) {
      console.log('Using local catalog items:', err.message);
    } finally {
      setLoadingItems(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // Give feedback on a specific product card
  const handleSelectFeedbackItem = (item) => {
    setSelectedItem(item);
    setCurrentView('feedback');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Give general feedback (no specific product)
  const handleGeneralFeedback = () => {
    setSelectedItem(null);
    setCurrentView('feedback');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Callback when feedback is submitted
  const handleFeedbackSubmitted = () => {
    loadItems();
  };

  // Callback when new item is created in admin
  const handleItemCreated = () => {
    loadItems();
    setCurrentView('admin');
  };

  const isAdmin = currentView === 'admin' || currentView === 'add-item';

  return (
    <div className="app">
      {/* Customer Header */}
      {!isAdmin && (
        <Navbar
          activeTab={currentView === 'catalog' ? 'items' : 'submit'}
          onSelectTab={(tab) => {
            if (tab === 'items') {
              setCurrentView('catalog');
            } else {
              setSelectedItem(null);
              setCurrentView('feedback');
            }
          }}
          onGoAdmin={() => setCurrentView('admin')}
        />
      )}

      {/* Main Body */}
      <div className={isAdmin ? 'admin-layout' : 'customer-layout'}>
        {/* Admin Sidebar */}
        {isAdmin && (
          <Sidebar
            activePage={currentView === 'admin' ? 'dashboard' : 'addItem'}
            onNavigate={(page) => {
              if (page === 'dashboard') setCurrentView('admin');
              if (page === 'addItem') setCurrentView('add-item');
            }}
            onGoCustomer={() => setCurrentView('catalog')}
          />
        )}

        {/* Page Views */}
        <main className="main-content">
          {currentView === 'catalog' && (
            <CustomerCatalogPage
              items={items}
              loading={loadingItems}
              onSelectFeedbackItem={handleSelectFeedbackItem}
              onGeneralFeedback={handleGeneralFeedback}
              onGoAdmin={() => setCurrentView('admin')}
            />
          )}

          {currentView === 'feedback' && (
            <FeedbackFormPage
              selectedItem={selectedItem}
              onBackToCatalog={() => setCurrentView('catalog')}
              onFeedbackSubmitted={handleFeedbackSubmitted}
            />
          )}

          {currentView === 'admin' && (
            <AdminDashboardPage
              onGoAddItem={() => setCurrentView('add-item')}
            />
          )}

          {currentView === 'add-item' && (
            <AdminAddItemPage
              onItemCreated={handleItemCreated}
              onCancel={() => setCurrentView('admin')}
            />
          )}
        </main>
      </div>
    </div>
  );
}
