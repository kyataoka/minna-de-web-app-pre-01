import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'var(--theme-toggle-bg)',
        border: '1px solid var(--theme-toggle-border)',
        borderRadius: '20px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        color: 'var(--text-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        minWidth: '120px',
        justifyContent: 'center'
      }}
      onMouseEnter={(e) => {
        const target = e.target as HTMLButtonElement
        target.style.transform = 'translateY(-2px)'
        target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'
      }}
      onMouseLeave={(e) => {
        const target = e.target as HTMLButtonElement
        target.style.transform = 'translateY(0)'
        target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
      aria-label={`${theme === 'light' ? 'ダーク' : 'ライト'}モードに切り替え`}
    >
      {theme === 'light' ? (
        <>
          <span style={{ fontSize: '16px' }}>🌙</span>
          <span>ダーク</span>
        </>
      ) : (
        <>
          <span style={{ fontSize: '16px' }}>☀️</span>
          <span>ライト</span>
        </>
      )}
    </button>
  )
}

export default React.memo(ThemeToggle)