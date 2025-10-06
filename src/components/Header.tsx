const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-content">
          <div className="logo">
            <a href="/">
              <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor">
                <path d="M10.2 0c-1.4.6-2.9 1.2-4.2 2.2C5.1 3.1 4.6 4 4.8 5.2c.2 1.3 1.3 2.3 2.6 2.7 1.4.4 2.9-.1 4-1 .9-.7 1.4-1.8 1.2-2.9-.1-1.1-.8-2-1.8-2.5C10.5.3 10.4.1 10.2 0z"/>
                <path d="M12.8 5.8c-1.8 0-3.2.8-4.2.8s-2.6-.8-4.4-.8C2.3 5.8.8 7 .1 9.1c-1.4 4.2.4 10.4 2.8 13.8 1.2 1.7 2.6 3.6 4.5 3.5 1.8-.1 2.5-1.2 4.6-1.2s2.7 1.1 4.6 1.2c1.9.1 3.2-1.7 4.4-3.4 1.4-2 1.9-3.9 2-4.1-.1 0-3.8-1.4-3.9-5.6-.1-3.5 2.9-5.2 3-5.3-1.6-2.4-4.2-2.7-5.1-2.7z"/>
              </svg>
            </a>
          </div>
          
          <ul className="nav-menu">
            <li><a href="/">Mac</a></li>
            <li><a href="/">iPad</a></li>
            <li><a href="/">iPhone</a></li>
            <li><a href="/">Watch</a></li>
            <li><a href="/">Vision</a></li>
            <li><a href="/">AirPods</a></li>
            <li><a href="/">TV & Home</a></li>
            <li><a href="/">Entertainment</a></li>
            <li><a href="/">Accessories</a></li>
            <li><a href="/">Support</a></li>
          </ul>
          
          <div className="nav-icons">
            <button className="search-btn">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                <path d="M10.5 0C13.538 0 16 2.462 16 5.5S13.538 11 10.5 11c-1.381 0-2.632-.512-3.608-1.356L1.355 15.18l-.707-.707 5.536-5.537C5.512 8.132 5 6.881 5 5.5 5 2.462 7.462 0 10.5 0zm0 1C8.014 1 6 3.014 6 5.5S8.014 10 10.5 10 15 7.986 15 5.5 12.986 1 10.5 1z"/>
              </svg>
            </button>
            <button className="bag-btn">
              <svg width="14" height="17" viewBox="0 0 14 17" fill="currentColor">
                <path d="M11.5 0h1.75a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H11.5V0zM.75 0H2.5v3H.75A.5.5 0 01.25 2.5v-2A.5.5 0 01.75 0zm0 4h12.5a.5.5 0 01.5.5v11a1.5 1.5 0 01-1.5 1.5H2A1.5 1.5 0 01.5 15.5v-11A.5.5 0 01.75 4zm1 1v10a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V5h-10z"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header