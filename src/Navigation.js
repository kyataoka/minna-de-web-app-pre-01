import React from 'react';
import Button from './components/Button';
import { useTheme } from './hooks/useAppState';
import './Navigation.css';

const Navigation = React.memo(function Navigation() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h1>My App</h1>
      </div>
      <ul className="nav-menu">
        <li className="nav-item nav-item-1">
          <a href="#home" className="nav-link">Home</a>
        </li>
        <li className="nav-item nav-item-2">
          <a href="#about" className="nav-link">About</a>
        </li>
        <li className="nav-item nav-item-3">
          <a href="#services" className="nav-link">Services</a>
        </li>
        <li className="nav-item nav-item-4">
          <a href="#contact" className="nav-link">Contact</a>
        </li>
        <li className="nav-item nav-item-5">
          <Button 
            variant="outline"
            className="theme-toggle-btn"
            onClick={toggleDarkMode}
            ariaLabel={isDarkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </Button>
        </li>
      </ul>
    </nav>
  );
});

export default Navigation;