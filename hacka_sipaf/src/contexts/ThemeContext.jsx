import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Recuperar tema salvo ou usar dark como padrão
    const savedTheme = localStorage.getItem('scs-theme')
    return savedTheme || 'dark'
  })

  useEffect(() => {
    // Salvar tema no localStorage
    localStorage.setItem('scs-theme', theme)
    
    // Aplicar classe no documento
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    
    // Também atualizar a classe para compatibilidade com Tailwind
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    // Adicionar classe de transição
    const root = document.documentElement
    root.classList.add('transitioning')
    
    // Trocar tema
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    
    // Remover classe de transição após animação
    setTimeout(() => {
      root.classList.remove('transitioning')
    }, 350)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }
  return context
}

