import { Link } from 'react-router-dom'
import { FiCamera, FiPlay } from 'react-icons/fi'
import { useTheme } from '../contexts/ThemeContext'
import Header from '../components/layout/Header'
// Importar imagem de fundo do SCS (adicione sua imagem em src/assets/images/scs/scs-background.jpg)
// import scsBackground from '../assets/images/scs/scs-background.jpg'

function LandingPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      {/* Background com imagem do SCS */}
      <div className="absolute inset-0 z-0">
        {/* Imagem de fundo do Setor Comercial Sul */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80')`, // Substitua pela URL da sua imagem do SCS
            // Ou use a importação local: backgroundImage: `url(${scsBackground})`
          }}
        />
        
        {/* Overlay escuro para legibilidade do texto */}
        <div 
          className={`absolute inset-0 transition-all duration-500 ${
            isDark 
              ? 'bg-gradient-to-b from-black/70 via-black/60 to-black/80' 
              : 'bg-gradient-to-b from-black/50 via-black/40 to-black/60'
          }`}
        />
        
        {/* Overlay adicional com gradiente sutil */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10"
        />
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Hero Content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto pt-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-command-accent/10 border border-command-accent/30 mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-base text-amber-400 font-medium">
              Sistema Ativo • Setor Comercial Sul
            </span>
          </div>

          {/* Título Principal */}
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight animate-fade-in-up drop-shadow-2xl"
            style={{ animationDelay: '0.2s', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
          >
            <span>SCS</span>
            <span className="text-amber-400">Conecta</span>
          </h1>

          {/* Subtítulo */}
          <div 
            className="flex items-center justify-center gap-3 md:gap-4 mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <span className="text-sm md:text-lg font-bold text-white/90 tracking-[0.2em] uppercase drop-shadow-lg">
              Ativar
            </span>
            <span className="text-amber-400 text-lg">•</span>
            <span className="text-sm md:text-lg font-bold text-white/90 tracking-[0.2em] uppercase drop-shadow-lg">
              Conectar
            </span>
            <span className="text-amber-400 text-lg">•</span>
            <span className="text-sm md:text-lg font-bold text-white/90 tracking-[0.2em] uppercase drop-shadow-lg">
              Transformar
            </span>
          </div>

          {/* Descrição */}
          <p 
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up drop-shadow-lg"
            style={{ animationDelay: '0.4s' }}
          >
            Super App para revitalização urbana do Setor Comercial Sul. Quebrando o ciclo de esvaziamento através de eventos, comércios ativos e segurança comunitária.
          </p>

          {/* CTA Button */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
              <Link
                to="/agenda"
                className="group inline-flex items-center gap-3 px-8 py-4 font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:-translate-y-0.5 bg-amber-500 hover:bg-amber-400 text-slate-900 hover:text-slate-900 hover:shadow-amber-500/30"
              >
              <FiCamera className="w-5 h-5" />
              <span>ACESSAR SCS CONECTA</span>
              <FiPlay className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LandingPage

