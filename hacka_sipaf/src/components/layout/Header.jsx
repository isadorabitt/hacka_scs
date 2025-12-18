import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiHome, FiSun, FiMoon, FiZap } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { useTheme } from '../../contexts/ThemeContext'

function Header({ variant = 'default', rightContent = null }) {
  const [menuAberto, setMenuAberto] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const isActive = (path) => location.pathname === path
  const isDark = theme === 'dark'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled 
        ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-lg border-b border-neutral-200/50 dark:border-neutral-700/50' 
        : 'bg-transparent'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
                <FiZap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                SCS Conecta
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 -mt-1">
                Super App
              </span>
            </div>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center gap-2">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-xl transition-all font-medium flex items-center gap-2 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-600 dark:text-orange-400' 
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <FiHome className="w-4 h-4" />
              <span>Início</span>
            </Link>
            <Link 
              to="/agenda" 
              className={`px-4 py-2 rounded-xl transition-all font-medium ${
                isActive('/agenda') || ['/comercios', '/seguranca', '/vacancia', '/gestao', '/comunicacao'].some(path => location.pathname.startsWith(path))
                  ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-600 dark:text-orange-400' 
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              SCS Conecta
            </Link>
            <Link 
              to="/agora"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <HiOutlineSparkles className="w-4 h-4" />
              <span>Agora no SCS</span>
            </Link>
          </nav>

          {/* Right Content + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {rightContent}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition-all duration-300 group"
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
              className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-colors"
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
              className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-orange-500 transition-colors rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {menuAberto ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuAberto && (
          <nav className="md:hidden mt-4 pb-4 border-t border-neutral-200/50 dark:border-neutral-700/50 pt-4 space-y-1">
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-600 dark:text-orange-400' 
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              onClick={() => setMenuAberto(false)}
            >
              <FiHome className="w-4 h-4" />
              <span>Início</span>
            </Link>
            <Link 
              to="/agenda" 
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive('/agenda') || ['/comercios', '/seguranca', '/vacancia', '/gestao', '/comunicacao'].some(path => location.pathname.startsWith(path))
                  ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-600 dark:text-orange-400' 
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              onClick={() => setMenuAberto(false)}
            >
              <FiZap className="w-4 h-4" />
              <span>SCS Conecta</span>
            </Link>
            <Link 
              to="/agora"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold"
              onClick={() => setMenuAberto(false)}
            >
              <HiOutlineSparkles className="w-4 h-4" />
              <span>Agora no SCS</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header

