import React from 'react';
import { Icon } from './Icon';

export function Sidebar({ currentPage, setCurrentPage, isCollapsed, setIsCollapsed, isMobileMenuOpen, setIsMobileMenuOpen, onBackToLanding }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'today', label: 'Today', icon: 'calendar' },
    { id: 'upcoming', label: 'Upcoming', icon: 'clock' },
    { id: 'completed', label: 'Completed', icon: 'check' },
    { id: 'projects', label: 'Projects', icon: 'layers' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button 
          className="collapse-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon name={isCollapsed ? 'menu' : 'menu'} size={16} />
        </button>
        {!isCollapsed && (
          <div className="brand">
            <span className="brand-mark">
              <Icon name="check" size={12} />
            </span>
            FocusList
          </div>
        )}
        {isMobileMenuOpen && (
          <button 
            className="mobile-close-button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <Icon name="x" size={16} />
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            <Icon name={item.icon} size={16} />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
        {!isCollapsed && (
          <button 
            className="nav-item back-to-home"
            onClick={onBackToLanding}
          >
            <Icon name="arrow" size={16} />
            <span>Back to Home</span>
          </button>
        )}
      </nav>

      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">PM</div>
            <div className="user-info">
              <span>Pushkar Mahadik</span>
              <small>Free plan</small>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
