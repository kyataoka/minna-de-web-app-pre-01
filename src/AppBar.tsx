import { Link } from 'react-router-dom'

interface AppBarProps {
  title?: string;
}

function AppBar({ title = "My App" }: AppBarProps) {
  return (
    <header className="app-bar">
      <div className="app-bar-content">
        <h1 className="app-bar-title">{title}</h1>
        <nav className="app-bar-nav">
          <Link to="/" className="nav-link">ホーム</Link>
          <Link to="/features" className="nav-link">機能</Link>
          <Link to="/contact" className="nav-link">お問い合わせ</Link>
        </nav>
      </div>
    </header>
  )
}

export default AppBar