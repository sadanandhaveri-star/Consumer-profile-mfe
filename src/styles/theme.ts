export const lightTheme = {
  colors: {
    primary: '#646cff',
    primaryHover: '#535bf2',
    background: '#ffffff',
    surface: '#f9f9f9',
    text: '#213547',
    textSecondary: '#666666',
    border: '#e0e0e0',
    error: '#ff4444',
    success: '#00c851',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px',
  },
  fontSize: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2rem',
  },
};

export const darkTheme: typeof lightTheme = {
  colors: {
    primary: '#646cff',
    primaryHover: '#535bf2',
    background: '#242424',
    surface: '#1a1a1a',
    text: 'rgba(255, 255, 255, 0.87)',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    border: '#333333',
    error: '#ff6666',
    success: '#00e676',
  },
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  fontSize: lightTheme.fontSize,
};

export type AppTheme = typeof lightTheme;
