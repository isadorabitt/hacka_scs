import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Recuperar tema salvo ou usar light como padrão
    const savedTheme = localStorage.getItem('scs-theme')
    // Garantir que sempre comece com 'light' se não houver tema salvo
    return savedTheme === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    // Garantir que o tema seja válido
    const validTheme = theme === 'dark' ? 'dark' : 'light'
    
    // Salvar tema no localStorage
    localStorage.setItem('scs-theme', validTheme)
    
    // Aplicar classe no documento
    const root = document.documentElement
    root.setAttribute('data-theme', validTheme)
    
    // Também atualizar a classe para compatibilidade com Tailwind
    if (validTheme === 'dark') {
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

