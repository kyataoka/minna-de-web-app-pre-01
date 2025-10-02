import './AppBar.css';

interface AppBarProps {
  title?: string;
}

function AppBar({ title = "My App" }: AppBarProps) {
  return (
    <header className="app-bar">
      <div className="app-bar-content">
        <h1 className="app-bar-title">{title}</h1>
        <nav className="app-bar-nav">
          <button className="nav-button">Home</button>
          <button className="nav-button">About</button>
          <button className="nav-button">Contact</button>
        </nav>
      </div>
    </header>
  );
}

export default AppBar;