import './AppBar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface AppBarProps {
  title?: string;
}

function AppBar({ title = "My App" }: AppBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="app-bar">
      <div className="app-bar-content">
        <h1 className="app-bar-title">{title}</h1>
        
        <nav className="app-bar-nav desktop-nav">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/about" className="nav-button">About</Link>
          <Link to="/contact" className="nav-button">Contact</Link>
        </nav>

        <button 
          className="hamburger-menu" 
          onClick={toggleMenu}
          aria-label="メニューを開く"
        >
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="mobile-nav-button" onClick={closeMenu}>Home</Link>
          <Link to="/about" className="mobile-nav-button" onClick={closeMenu}>About</Link>
          <Link to="/contact" className="mobile-nav-button" onClick={closeMenu}>Contact</Link>
        </nav>
      </div>
      
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </header>
  );
}

export default AppBar;