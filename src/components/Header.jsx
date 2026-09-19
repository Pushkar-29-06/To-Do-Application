import React, { useState } from 'react';
import { Icon } from './Icon';

export function Header({ currentPage, searchQuery, setSearchQuery, onMobileMenuToggle, darkMode, onToggleDarkMode }) {
  const [showShortcuts, setShowShortcuts] = useState(false);

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
      case 'today':
        return "Today's Mission";
      case 'upcoming':
        return 'Upcoming Tasks';
      case 'completed':
        return 'Completed Tasks';
      case 'projects':
        return 'Projects';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const getPageMessage = () => {
    switch (currentPage) {
      case 'dashboard':
      case 'today':
        return 'Stay focused. Complete what matters.';
      case 'upcoming':
        return 'Plan ahead. Stay organized.';
      case 'completed':
        return 'Your accomplishments.';
      case 'projects':
        return 'Organize your work.';
      case 'settings':
        return 'Customize your experience.';
      default:
        return '';
    }
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <button 
            className="mobile-menu-button"
            onClick={onMobileMenuToggle}
            aria-label="Toggle menu"
          >
            <Icon name="menu" size={18} />
          </button>
          <div className="header-title">
            <h1>{getPageTitle()}</h1>
            {getPageMessage() && <p>{getPageMessage()}</p>}
          </div>
        </div>
        
        <div className="header-actions">
          <div className="search-bar">
            <Icon name="search" size={16} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button 
            className="icon-button" 
            onClick={() => setShowShortcuts(!showShortcuts)}
            aria-label="Keyboard shortcuts"
            title="Keyboard shortcuts (Ctrl+K)"
          >
            <Icon name="bolt" size={18} />
          </button>
          
          <button 
            className="icon-button" 
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <Icon name={darkMode ? "bolt" : "spark"} size={18} />
          </button>
          
          <button className="icon-button" aria-label="Notifications">
            <Icon name="bell" size={18} />
          </button>
          
          <div className="header-avatar">PM</div>
        </div>
      </div>

      {showShortcuts && (
        <div className="shortcuts-modal" onClick={() => setShowShortcuts(false)}>
          <div className="shortcuts-content" onClick={(e) => e.stopPropagation()}>
            <h3>Keyboard Shortcuts</h3>
            <div className="shortcuts-list">
              <div className="shortcut-item">
                <kbd>Ctrl</kbd> + <kbd>N</kbd>
                <span>New task</span>
              </div>
              <div className="shortcut-item">
                <kbd>Ctrl</kbd> + <kbd>K</kbd>
                <span>Focus search</span>
              </div>
              <div className="shortcut-item">
                <kbd>Ctrl</kbd> + <kbd>D</kbd>
                <span>Toggle dark mode</span>
              </div>
              <div className="shortcut-item">
                <kbd>Esc</kbd>
                <span>Close modal</span>
              </div>
            </div>
            <button className="close-shortcuts" onClick={() => setShowShortcuts(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
