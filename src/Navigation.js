import React from 'react';
import './Navigation.css';

const Navigation = React.memo(function Navigation({ isDarkMode, toggleDarkMode }) {
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h1>My App</h1>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <a href="#home" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="#about" className="nav-link">About</a>
        </li>
        <li className="nav-item">
          <a href="#services" className="nav-link">Services</a>
        </li>
        <li className="nav-item">
          <a href="#contact" className="nav-link">Contact</a>
        </li>
        <li className="nav-item">
          <button 
            className="theme-toggle-btn"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </li>
      </ul>
    </nav>
  );
});

export default Navigation;