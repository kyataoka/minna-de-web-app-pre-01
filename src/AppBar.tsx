import ThemeToggle from './components/ThemeToggle'

interface AppBarProps {
  title?: string
}

function AppBar({ title = "My App" }: AppBarProps) {
  const appBarStyle = {
    backgroundColor: 'var(--appbar-bg)',
    color: 'white',
    padding: '16px 24px',
    boxShadow: 'var(--shadow)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 'clamp(16px, 4vw, 20px)',
    fontWeight: 600,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    transition: 'background-color 0.3s ease'
  }

  return (
    <div style={appBarStyle}>
      <span>{title}</span>
      <ThemeToggle />
    </div>
  )
}

export default AppBar