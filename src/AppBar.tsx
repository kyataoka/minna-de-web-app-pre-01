interface AppBarProps {
  title?: string;
}

function AppBar({ title = "My App" }: AppBarProps) {
  return (
    <header className="app-bar">
      <div className="app-bar-content">
        <h1 className="app-bar-title">{title}</h1>
        <nav className="app-bar-nav">
          <a href="#" className="nav-link">ホーム</a>
          <a href="#" className="nav-link">機能</a>
          <a href="#" className="nav-link">お問い合わせ</a>
        </nav>
      </div>
    </header>
  )
}

export default AppBar