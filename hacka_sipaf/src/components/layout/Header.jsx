import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiHome, FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../../contexts/ThemeContext'

function Header({ variant = 'default', rightContent = null }) {
  const [menuAberto, setMenuAberto] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const isActive = (path) => location.pathname === path
  const isDark = theme === 'dark'

  return (
    <header className="bg-header backdrop-blur-md border-b border-command-border/30 z-50 transition-colors duration-300">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center gap-2">
              <div className="h-12 md:h-14 w-12 md:w-14 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <span className="text-white font-black text-xl md:text-2xl">SCS</span>
              </div>
              <span className="text-lg md:text-xl font-bold text-command-text">Conecta</span>
            </div>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                isActive('/') 
                  ? 'bg-command-accent/10 text-command-accent' 
                  : 'text-command-text-muted hover:text-command-text hover:bg-command-surface/50'
              }`}
            >
              <FiHome className="w-4 h-4" />
              <span>Início</span>
            </Link>
            <Link 
              to="/agenda" 
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                isActive('/agenda') || ['/comercios', '/seguranca', '/vacancia', '/gestao', '/comunicacao'].some(path => location.pathname.startsWith(path))
                  ? 'bg-command-accent/10 text-command-accent' 
                  : 'text-command-text-muted hover:text-command-text hover:bg-command-surface/50'
              }`}
            >
              SCS Conecta
            </Link>
          </nav>

          {/* Right Content + Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {rightContent}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-xl bg-command-surface/50 hover:bg-command-surface border border-command-border/50 transition-all duration-300 group"
              title={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            >
              <div className="relative w-5 h-5">
                {/* Sol */}
                <FiSun 
                  className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${
                    isDark 
                      ? 'opacity-0 rotate-90 scale-0' 
                      : 'opacity-100 rotate-0 scale-100 text-amber-500'
                  }`} 
                />
                {/* Lua */}
                <FiMoon 
                  className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${
                    isDark 
                      ? 'opacity-100 rotate-0 scale-100 text-blue-400' 
                      : 'opacity-0 -rotate-90 scale-0'
                  }`} 
                />
              </div>
            </button>
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-command-surface/50 border border-command-border/50 transition-colors"
            >
              {isDark ? (
                <FiMoon className="w-5 h-5 text-blue-400" />
              ) : (
                <FiSun className="w-5 h-5 text-amber-500" />
              )}
            </button>
            
            {/* Menu Button */}
            <button 
              onClick={() => setMenuAberto(!menuAberto)}
              className="p-2 text-command-text hover:text-command-accent transition-colors rounded-lg hover:bg-command-surface/50"
            >
              {menuAberto ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

            {/* Mobile Menu */}
            {menuAberto && (
              <nav className="md:hidden mt-4 pb-2 border-t border-command-border/30 pt-4 space-y-1">
                <Link 
                  to="/" 
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                    isActive('/') 
                      ? 'bg-command-accent/10 text-command-accent' 
                      : 'text-command-text-muted hover:text-command-text hover:bg-command-surface/50'
                  }`}
                  onClick={() => setMenuAberto(false)}
                >
                  <FiHome className="w-4 h-4" />
                  <span>Início</span>
                </Link>
                <Link 
                  to="/agenda" 
                  className={`block px-4 py-2 rounded-lg transition-colors font-medium ${
                    isActive('/agenda') || ['/comercios', '/seguranca', '/vacancia', '/gestao', '/comunicacao'].some(path => location.pathname.startsWith(path))
                      ? 'bg-command-accent/10 text-command-accent' 
                      : 'text-command-text-muted hover:text-command-text hover:bg-command-surface/50'
                  }`}
                  onClick={() => setMenuAberto(false)}
                >
                  SCS Conecta
                </Link>
              </nav>
            )}
      </div>
    </header>
  )
}

export default Header

