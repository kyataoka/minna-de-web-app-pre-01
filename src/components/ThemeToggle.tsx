import { useTheme } from '../contexts/ThemeContext'

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button 
      className="theme-toggle-button"
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
      title={isDarkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
    >
      <span className="theme-toggle-icon">
        {isDarkMode ? '☀️' : '🌙'}
      </span>
      <span className="theme-toggle-text">
        {isDarkMode ? 'ライト' : 'ダーク'}
      </span>
    </button>
  )
}

export default ThemeToggle