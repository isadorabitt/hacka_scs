/** @type {import('tailwindcss').Config} */

// Função para criar cor com suporte a opacidade usando variável CSS
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

export default {
  darkMode: 'class', // Usar classe em vez de detecção automática do sistema
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores dinâmicas baseadas em variáveis CSS RGB (suportam opacidade)
        'command-bg': withOpacity('--color-bg-rgb'),
        'command-bg-alt': withOpacity('--color-bg-alt-rgb'),
        'command-accent': withOpacity('--color-accent-rgb'),
        'command-accent-hover': withOpacity('--color-accent-hover-rgb'),
        'command-text': withOpacity('--color-text-rgb'),
        'command-text-muted': withOpacity('--color-text-muted-rgb'),
        'command-surface': withOpacity('--color-surface-rgb'),
        'command-surface-alt': withOpacity('--color-surface-alt-rgb'),
        'command-border': withOpacity('--color-border-rgb'),
        // Cores de status
        'status-success': withOpacity('--color-success-rgb'),
        'status-warning': withOpacity('--color-warning-rgb'),
        'status-danger': withOpacity('--color-danger-rgb'),
        'status-info': withOpacity('--color-info-rgb'),
      },
      backgroundColor: {
        'header': 'var(--header-bg)',
        'glass': 'var(--glass-bg)',
      },
      boxShadow: {
        'theme': '0 4px 20px var(--shadow-color)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

