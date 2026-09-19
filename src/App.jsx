import React, { useState, useEffect } from 'react';
import { LandingPage } from './main';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { useTasks } from './hooks/useTasks';
import './styles.css';

export function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const useTasksHook = useTasks();

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleBackToLanding = () => {
    setShowLanding(true);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + N: New task
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        setShowAddModal(true);
      }
      // Ctrl/Cmd + K: Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.search-bar input')?.focus();
      }
      // Ctrl/Cmd + D: Toggle dark mode
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        useTasksHook.toggleDarkMode();
      }
      // Escape: Close modal
      if (e.key === 'Escape') {
        setShowAddModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [useTasksHook.toggleDarkMode]);

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="app-container">
      {isMobileMenuOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <Sidebar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onBackToLanding={handleBackToLanding}
      />
      
      <main className={`main-content ${isSidebarCollapsed ? 'expanded' : ''}`}>
        <Header 
          currentPage={currentPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          darkMode={useTasksHook.darkMode}
          onToggleDarkMode={useTasksHook.toggleDarkMode}
        />
        
        <div className="page-content">
          <Dashboard 
            useTasksHook={useTasksHook} 
            searchQuery={searchQuery}
            showAddModal={showAddModal}
            setShowAddModal={setShowAddModal}
          />
        </div>
      </main>
    </div>
  );
}
