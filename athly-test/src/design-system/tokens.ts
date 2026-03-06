/**
 * Athly Design System - Tokens
 * Sistema de design centralizado para o app de treinos com IA
 * Identidade visual: futurista, esportiva, tecnológica
 * Baseado no mascote raposa neon com gradientes azul → roxo
 */

export const tokens = {
  colors: {
    // Primary - Azul neon
    primary: {
      50: '#e0f2fe',
      100: '#bae6fd',
      200: '#7dd3fc',
      300: '#38bdf8',
      400: '#0ea5e9',
      500: '#0284c7', // Main
      600: '#0369a1',
      700: '#075985',
      800: '#0c4a6e',
      900: '#082f49',
      neon: '#00d4ff',
    },

    // Secondary - Roxo neon
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7', // Main
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
      neon: '#bf40ff',
    },

    // Accent - Gradientes
    accent: {
      blue: '#0ea5e9',
      purple: '#a855f7',
      cyan: '#06b6d4',
      pink: '#ec4899',
    },

    // Background & Surface (Dark-first)
    background: {
      dark: '#0a0a0f',
      darker: '#050508',
      light: '#fafafa',
    },

    surface: {
      dark: '#13131a',
      darker: '#0d0d12',
      card: '#1a1a24',
      light: '#ffffff',
    },

    // Borders
    border: {
      dark: '#1f1f2e',
      darker: '#151520',
      light: '#e5e7eb',
      accent: '#2563eb',
    },

    // Text
    text: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
      tertiary: '#9ca3af',
      disabled: '#6b7280',
      dark: '#111827',
    },

    // States
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      glow: '#10b98155',
    },

    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      glow: '#f59e0b55',
    },

    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      glow: '#ef444455',
    },

    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      glow: '#3b82f655',
    },
  },

  gradients: {
    primary: 'linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%)',
    primaryReverse: 'linear-gradient(135deg, #a855f7 0%, #0ea5e9 100%)',
    neon: 'linear-gradient(135deg, #00d4ff 0%, #bf40ff 100%)',
    dark: 'linear-gradient(180deg, #0a0a0f 0%, #13131a 100%)',
    card: 'linear-gradient(135deg, #1a1a24 0%, #13131a 100%)',
    glow: 'radial-gradient(circle at center, #0ea5e933 0%, transparent 70%)',
  },

  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    neon: '0 0 20px rgba(14, 165, 233, 0.3)',
    neonPurple: '0 0 20px rgba(168, 85, 247, 0.3)',
    glow: '0 0 30px rgba(14, 165, 233, 0.4), 0 0 60px rgba(168, 85, 247, 0.2)',
  },

  typography: {
    fontFamily: {
      sans: '"DM Sans", system-ui, -apple-system, sans-serif',
      display: '"Space Grotesk", system-ui, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },

  borderRadius: {
    none: '0',
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px',
  },

  animation: {
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const

export type DesignTokens = typeof tokens
