export const THEME_COLORS = {
  LIGHT: {
    BG_COLOR: '#ffffff',
    TEXT_COLOR: '#333333',
    BUTTON_BG: '#007bff',
    BUTTON_HOVER_BG: '#0056b3',
    APPBAR_BG: '#1976d2',
    INPUT_BG: '#ffffff',
    BORDER_COLOR: '#dee2e6',
    NAV_ACTIVE_BORDER: '#007bff',
    SHADOW: '0 2px 8px rgba(0, 0, 0, 0.1)',
    HOVER_SHADOW: '0 4px 16px rgba(0, 0, 0, 0.15)'
  },
  DARK: {
    BG_COLOR: '#121212',
    TEXT_COLOR: '#ffffff',
    BUTTON_BG: '#007bff',
    BUTTON_HOVER_BG: '#0056b3',
    APPBAR_BG: '#1976d2',
    INPUT_BG: '#1e1e1e',
    BORDER_COLOR: '#444444',
    NAV_ACTIVE_BORDER: '#007bff',
    SHADOW: '0 2px 8px rgba(0, 0, 0, 0.3)',
    HOVER_SHADOW: '0 4px 16px rgba(0, 0, 0, 0.4)'
  }
} as const;

export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  DANGER: 'danger'
} as const;

export const BUTTON_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
} as const;

export const BREAKPOINTS = {
  MOBILE: '480px',
  TABLET: '768px',
  DESKTOP: '1024px'
} as const;