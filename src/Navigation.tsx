import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navStyle: React.CSSProperties = {
    backgroundColor: 'var(--nav-bg)',
    padding: '15px 0',
    borderBottom: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow)',
    position: 'sticky',
    top: '60px',
    zIndex: 99,
    transition: 'background-color 0.3s ease'
  };

  const navContainerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const navListStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: isMobile ? '20px' : '0',
    display: isMobile ? (isMobileMenuOpen ? 'flex' : 'none') : 'flex',
    gap: '30px',
    flexDirection: isMobile ? 'column' : 'row',
    position: isMobile ? 'absolute' : 'static',
    top: isMobile ? '100%' : 'auto',
    left: isMobile ? '0' : 'auto',
    width: isMobile ? '100%' : 'auto',
    backgroundColor: isMobile ? 'var(--nav-bg)' : 'transparent',
    boxShadow: isMobile ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
  };

  const getLinkStyle = (path: string): React.CSSProperties => ({
    textDecoration: 'none',
    color: location.pathname === path ? 'var(--nav-active-border)' : 'var(--text-color)',
    fontWeight: location.pathname === path ? '600' : '500',
    fontSize: '16px',
    padding: '12px 20px',
    borderRadius: '8px',
    backgroundColor: location.pathname === path ? 'var(--nav-active-bg)' : 'transparent',
    border: location.pathname === path ? '2px solid var(--nav-active-border)' : '2px solid transparent',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'block'
  });

  const getLinkHoverStyle = (path: string): React.CSSProperties => ({
    ...getLinkStyle(path),
    backgroundColor: location.pathname === path ? 'var(--nav-active-bg)' : 'var(--card-bg)',
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: '0 8px 16px rgba(25, 118, 210, 0.2), 0 0 20px rgba(25, 118, 210, 0.1)',
    filter: 'brightness(1.1)'
  });

  const hamburgerStyle: React.CSSProperties = {
    display: isMobile ? 'flex' : 'none',
    flexDirection: 'column',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    border: 'none'
  };

  const hamburgerLineStyle: React.CSSProperties = {
    width: '25px',
    height: '3px',
    backgroundColor: 'var(--text-color)',
    margin: '3px 0',
    transition: '0.3s',
    transformOrigin: 'center'
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav style={navStyle}>
      <div style={navContainerStyle}>
        <div style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'var(--nav-active-border)'
        }}>
          Navigation
        </div>
        
        <button
          style={hamburgerStyle}
          onClick={toggleMobileMenu}
          aria-label="メニュー切替"
        >
          <span style={hamburgerLineStyle}></span>
          <span style={hamburgerLineStyle}></span>
          <span style={hamburgerLineStyle}></span>
        </button>

        <ul style={navListStyle}>
          <li>
            <Link 
              to="/" 
              style={getLinkStyle('/')}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, getLinkHoverStyle('/'))}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, getLinkStyle('/'))}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🏠 ホーム
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              style={getLinkStyle('/about')}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, getLinkHoverStyle('/about'))}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, getLinkStyle('/about'))}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ℹ️ About
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              style={getLinkStyle('/contact')}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, getLinkHoverStyle('/contact'))}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, getLinkStyle('/contact'))}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              📧 お問い合わせ
            </Link>
          </li>
          <li>
            <Link 
              to="/search" 
              style={getLinkStyle('/search')}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, getLinkHoverStyle('/search'))}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, getLinkStyle('/search'))}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🔍 検索
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;