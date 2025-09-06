interface AppBarProps {
  title?: string
}

function AppBar({ title = "My App" }: AppBarProps) {
  const appBarStyle = {
    backgroundColor: '#1976d2',
    color: 'white',
    padding: '16px 24px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 600,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }

  return (
    <div style={appBarStyle}>
      {title}
    </div>
  )
}

export default AppBar