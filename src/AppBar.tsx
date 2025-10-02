import './AppBar.css';
import { Link } from 'react-router-dom';

interface AppBarProps {
  title?: string;
}

function AppBar({ title = "My App" }: AppBarProps) {
  return (
    <header className="app-bar">
      <div className="app-bar-content">
        <h1 className="app-bar-title">{title}</h1>
        <nav className="app-bar-nav">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/about" className="nav-button">About</Link>
          <Link to="/contact" className="nav-button">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default AppBar;