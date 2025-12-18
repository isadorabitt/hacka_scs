import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FiCamera, FiPlay } from 'react-icons/fi'
import { useTheme } from '../contexts/ThemeContext'
import Header from '../components/layout/Header'

function LandingPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Gerar partículas uma única vez para evitar re-render
  const particles = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      bottom: `${Math.random() * 30}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`
    })), []
  )

  // Cores do background baseadas no tema
  const bgGradient = isDark 
    ? `linear-gradient(180deg, rgba(15, 23, 42, 0.3) 0%, rgba(15, 23, 42, 0.5) 30%, rgba(15, 23, 42, 0.85) 100%),
       linear-gradient(135deg, #1a2f4a 0%, #0f2027 20%, #203a43 40%, #2c5364 60%, #1a2f4a 80%, #0f172a 100%)`
    : `linear-gradient(180deg, rgba(248, 246, 241, 0.3) 0%, rgba(248, 246, 241, 0.5) 30%, rgba(248, 246, 241, 0.9) 100%),
       linear-gradient(135deg, #e8d5b7 0%, #f5e6d3 20%, #dcc9a3 40%, #c4a77d 60%, #e8d5b7 80%, #f8f6f1 100%)`

  const smokeGradient = isDark
    ? `radial-gradient(ellipse at 30% 70%, rgba(249, 115, 22, 0.15) 0%, transparent 50%),
       radial-gradient(ellipse at 70% 60%, rgba(234, 88, 12, 0.1) 0%, transparent 40%),
       radial-gradient(ellipse at 50% 80%, rgba(249, 115, 22, 0.2) 0%, transparent 45%)`
    : `radial-gradient(ellipse at 30% 70%, rgba(234, 88, 12, 0.12) 0%, transparent 50%),
       radial-gradient(ellipse at 70% 60%, rgba(194, 65, 12, 0.08) 0%, transparent 40%),
       radial-gradient(ellipse at 50% 80%, rgba(234, 88, 12, 0.15) 0%, transparent 45%)`

  const landscapeFill1 = isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(248, 246, 241, 0.95)'
  const landscapeFill2 = isDark ? '#0f172a' : '#f8f6f1'

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      {/* Background com overlay */}
      <div className="absolute inset-0 z-0">
        {/* Imagem de fundo - gradiente simulando fumaça e fogo */}
        <div 
          className="absolute inset-0 transition-all duration-500"
          style={{ background: bgGradient }}
        />
        
        {/* Efeito de fumaça animado */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 animate-smoke-slow"
            style={{ background: smokeGradient }}
          />
        </div>

        {/* Partículas de brasas */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute w-1 h-1 rounded-full bg-orange-500/60 animate-float-particle"
              style={{
                left: p.left,
                bottom: p.bottom,
                animationDelay: p.delay,
                animationDuration: p.duration
              }}
            />
          ))}
        </div>

        {/* Silhueta da paisagem */}
        <div className="absolute bottom-0 left-0 right-0 h-48">
          <svg 
            viewBox="0 0 1440 200" 
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,200 L0,150 Q100,120 200,140 T400,100 T600,130 T800,90 T1000,120 T1200,80 T1440,110 L1440,200 Z" 
              fill={landscapeFill1}
              className="transition-all duration-500"
            />
            <path 
              d="M0,200 L0,160 Q150,130 300,150 T600,120 T900,150 T1200,110 T1440,140 L1440,200 Z" 
              fill={landscapeFill2}
              className="transition-all duration-500"
            />
          </svg>
        </div>
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
            <span className="text-base text-command-accent font-medium">
              Sistema Ativo • Setor Comercial Sul
            </span>
          </div>

          {/* Título Principal */}
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black text-command-text mb-6 tracking-tight animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span>SCS</span>
            <span className="text-command-accent">Conecta</span>
          </h1>

          {/* Subtítulo */}
          <div 
            className="flex items-center justify-center gap-3 md:gap-4 mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <span className="text-sm md:text-lg font-bold text-command-text/90 tracking-[0.2em] uppercase">
              Ativar
            </span>
            <span className="text-command-accent text-lg">•</span>
            <span className="text-sm md:text-lg font-bold text-command-text/90 tracking-[0.2em] uppercase">
              Conectar
            </span>
            <span className="text-command-accent text-lg">•</span>
            <span className="text-sm md:text-lg font-bold text-command-text/90 tracking-[0.2em] uppercase">
              Transformar
            </span>
          </div>

          {/* Descrição */}
          <p 
            className="text-lg md:text-xl text-command-text-muted mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
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

