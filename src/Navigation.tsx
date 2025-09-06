import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navStyle: React.CSSProperties = {
    backgroundColor: '#f8f9fa',
    padding: '15px 0',
    borderBottom: '1px solid #dee2e6'
  };

  const navListStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: '0 20px',
    display: 'flex',
    gap: '20px'
  };

  const getLinkStyle = (path: string): React.CSSProperties => ({
    textDecoration: 'none',
    color: location.pathname === path ? '#007bff' : '#6c757d',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    padding: '10px 15px',
    borderRadius: '4px',
    backgroundColor: location.pathname === path ? '#e3f2fd' : 'transparent',
    transition: 'all 0.3s ease'
  });

  return (
    <nav style={navStyle}>
      <ul style={navListStyle}>
        <li>
          <Link to="/" style={getLinkStyle('/')}>
            ホーム
          </Link>
        </li>
        <li>
          <Link to="/about" style={getLinkStyle('/about')}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" style={getLinkStyle('/contact')}>
            お問い合わせ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;