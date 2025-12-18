import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  FiMenu, 
  FiX, 
  FiCalendar, 
  FiShoppingBag, 
  FiShield, 
  FiHome, 
  FiBarChart2, 
  FiShare2
} from 'react-icons/fi'
import Header from './Header'

const menuItems = [
  { path: '/agenda', icon: FiCalendar, label: 'Agenda de Eventos' },
  { path: '/comercios', icon: FiShoppingBag, label: 'Comércios Ativos' },
  { path: '/seguranca', icon: FiShield, label: 'Segurança Comunitária' },
  { path: '/vacancia', icon: FiHome, label: 'Vacância e Reativação' },
  { path: '/gestao', icon: FiBarChart2, label: 'Painel de Gestão' },
  { path: '/comunicacao', icon: FiShare2, label: 'Comunicação Integrada' },
]

function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-command-bg">
      {/* Header Global */}
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-20'
          } glass transition-all duration-300 ease-in-out flex flex-col border-r border-command-border`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-command-border">
            {sidebarOpen && (
              <div className="flex items-center gap-3 flex-1">
                <span className="text-base font-semibold text-command-text/70 uppercase tracking-wider">Módulos</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg hover:bg-command-surface/50 transition-colors ${sidebarOpen ? '' : 'ml-auto'}`}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <FiX className="w-6 h-6 text-command-text" />
              ) : (
                <FiMenu className="w-6 h-6 text-command-text" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-command-accent text-white'
                      : 'text-command-text hover:bg-command-surface/50'
                  }`}
                  title={!sidebarOpen ? item.label : ''}
                >
                  <Icon className="w-6 h-6 flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="text-base font-medium">{item.label}</span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          {sidebarOpen && (
            <div className="p-4 border-t border-command-border text-sm text-command-text/60">
              <p>Setor Comercial Sul</p>
              <p className="mt-1">SCS Conecta</p>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppShell

