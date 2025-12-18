import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  FiMenu, 
  FiX, 
  FiCalendar, 
  FiShoppingBag, 
  FiShield, 
  FiHome, 
  FiBarChart2, 
  FiShare2,
  FiZap,
  FiMapPin
} from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi2'
import Header from './Header'

const menuItems = [
  { path: '/agenda', icon: FiCalendar, label: 'Agenda', color: 'from-orange-500 to-red-500' },
  { path: '/comercios', icon: FiShoppingBag, label: 'Comércios', color: 'from-blue-500 to-cyan-500' },
  { path: '/seguranca', icon: FiShield, label: 'Segurança', color: 'from-purple-500 to-pink-500' },
  { path: '/vacancia', icon: FiHome, label: 'Vacância', color: 'from-green-500 to-emerald-500' },
  { path: '/gestao', icon: FiBarChart2, label: 'Gestão', color: 'from-indigo-500 to-blue-500' },
  { path: '/comunicacao', icon: FiShare2, label: 'Comunicação', color: 'from-yellow-500 to-orange-500' },
]

function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-orange-50/30 to-blue-50/30 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      {/* Modern Header */}
      <Header />
      
      <div className="flex pt-16">
        {/* Modern Sidebar */}
        <aside className={`
          fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] z-40
          transition-all duration-300 ease-out
          ${sidebarOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full md:translate-x-0 md:w-20'}
          overflow-hidden
        `}>
          <div className="h-full bg-white/60 dark:bg-neutral-900/60 backdrop-blur-2xl border-r border-neutral-200/50 dark:border-neutral-700/50">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200/50 dark:border-neutral-700/50">
              {sidebarOpen && (
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    Menu Principal
                  </span>
                </div>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all ${sidebarOpen ? '' : 'ml-auto'}`}
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? (
                  <FiX className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                ) : (
                  <FiMenu className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                )}
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1.5 h-full overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      group relative flex items-center gap-3 p-2.5 rounded-xl
                      transition-all duration-200
                      ${isActive
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }
                    `}
                    title={!sidebarOpen ? item.label : ''}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                    )}
                    
                    <div className={`
                      p-1.5 rounded-lg transition-all
                      ${isActive 
                        ? 'bg-white/20' 
                        : 'bg-neutral-100 dark:bg-neutral-800 group-hover:bg-gradient-to-r group-hover:from-orange-500/10 group-hover:to-red-500/10'
                      }
                    `}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                    </div>
                    
                    {sidebarOpen && (
                      <span className={`
                        text-sm font-medium transition-all
                        ${isActive ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'}
                      `}>
                        {item.label}
                      </span>
                    )}
                    
                    {/* Hover glow effect */}
                    {!isActive && (
                      <div className={`
                        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                        bg-gradient-to-r ${item.color} blur-xl -z-10
                        transition-opacity duration-300
                      `} />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Footer */}
            {sidebarOpen && (
              <div className="p-4 border-t border-neutral-200/50 dark:border-neutral-700/50">
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiMapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Setor Comercial Sul
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Revitalização urbana inteligente
                  </p>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 transition-all duration-300 overflow-y-auto">
          <div className="min-h-[calc(100vh-4rem)] p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AppShell

