import { Link, useLocation } from 'react-router-dom'
import { useState, useCallback, useMemo } from 'react'
import SearchBox from './SearchBox'
import ThemeToggle from './components/ThemeToggle'

interface AppBarProps {
  title?: string;
}

function AppBar({ title = "My App" }: AppBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev)
  }, [])

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false)
  }, [])

  const isActive = useCallback((path: string) => {
    return location.pathname === path
  }, [location.pathname])

  const isFeaturesActive = useMemo(() => {
    return location.pathname.startsWith('/features')
  }, [location.pathname])

  return (
    <header className="app-bar">
      <div className="app-bar-content">
        <h1 className="app-bar-title">{title}</h1>
        
        {/* 検索ボックス */}
        <div className="search-container">
          <SearchBox />
        </div>
        
        {/* テーマ切り替えボタン */}
        <ThemeToggle />
        
        {/* ハンバーガーメニューボタン */}
        <button 
          className="hamburger-button"
          onClick={toggleMenu}
          aria-label="メニュー"
        >
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
        </button>

        {/* デスクトップナビゲーション */}
        <nav className="app-bar-nav desktop-nav">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            ホーム
          </Link>
          
          {/* ドロップダウンメニュー付き機能リンク */}
          <div 
            className="dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link 
              to="/features" 
              className={`nav-link dropdown-trigger ${isFeaturesActive ? 'active' : ''}`}
            >
              機能 ↓
            </Link>
            <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
              <Link to="/features" className="dropdown-item" onClick={closeDropdown}>
                機能一覧
              </Link>
              <Link to="/features/advanced" className="dropdown-item" onClick={closeDropdown}>
                高度な機能
              </Link>
              <Link to="/features/api" className="dropdown-item" onClick={closeDropdown}>
                API機能
              </Link>
            </div>
          </div>
          
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          >
            お問い合わせ
          </Link>
        </nav>

        {/* モバイルナビゲーション */}
        <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            ホーム
          </Link>
          
          {/* モバイル用ドロップダウンメニュー */}
          <div className="mobile-dropdown">
            <button 
              className={`nav-link dropdown-trigger mobile ${isFeaturesActive ? 'active' : ''}`}
              onClick={toggleDropdown}
            >
              機能 {isDropdownOpen ? '▲' : '▼'}
            </button>
            <div className={`mobile-dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
              <Link to="/features" className="dropdown-item" onClick={closeMenu}>
                機能一覧
              </Link>
              <Link to="/features/advanced" className="dropdown-item" onClick={closeMenu}>
                高度な機能
              </Link>
              <Link to="/features/api" className="dropdown-item" onClick={closeMenu}>
                API機能
              </Link>
            </div>
          </div>
          
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default AppBar