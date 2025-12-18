import { Link } from 'react-router-dom'
import { FiCamera, FiPlay, FiHeart, FiUsers, FiUser, FiCheckCircle, FiArrowRight, FiSmile } from 'react-icons/fi'
import { useTheme } from '../contexts/ThemeContext'
import Header from '../components/layout/Header'
import { eventosMock } from '../data/scs-eventos-mock'
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

      {/* Seção: Eventos Inclusivos */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-b from-transparent via-white/95 to-white dark:via-neutral-900/95 dark:to-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-4">
              <FiHeart className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">Inclusão e Diversidade</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4">
              Eventos para <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Todos</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Encontre eventos pensados especialmente para você. O SCS Conecta promove a inclusão e a diversidade em todos os eventos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[
              {
                id: 'feminino',
                label: 'Público Feminino',
                icon: FiUser,
                cor: 'from-pink-500 to-rose-600',
                count: eventosMock.filter(e => e.publicoAlvo?.includes('feminino')).length,
                descricao: 'Eventos voltados para mulheres'
              },
              {
                id: 'lgbt',
                label: 'LGBTQIA+',
                icon: FiHeart,
                cor: 'from-purple-500 to-pink-600',
                count: eventosMock.filter(e => e.publicoAlvo?.includes('lgbt')).length,
                descricao: 'Eventos inclusivos para comunidade LGBTQIA+'
              },
              {
                id: 'idoso',
                label: 'Idosos',
                icon: FiUsers,
                cor: 'from-blue-500 to-cyan-600',
                count: eventosMock.filter(e => e.publicoAlvo?.includes('idoso')).length,
                descricao: 'Eventos acessíveis para idosos'
              },
              {
                id: 'infantil',
                label: 'Infantil',
                icon: FiSmile,
                cor: 'from-yellow-500 to-orange-600',
                count: eventosMock.filter(e => e.publicoAlvo?.includes('infantil')).length,
                descricao: 'Eventos para crianças e famílias'
              },
              {
                id: 'acessivel',
                label: 'Acessível',
                icon: FiCheckCircle,
                cor: 'from-teal-500 to-green-600',
                count: eventosMock.filter(e => e.publicoAlvo?.includes('acessivel')).length,
                descricao: 'Eventos com acessibilidade garantida'
              }
            ].map(categoria => {
              const Icon = categoria.icon
              return (
                <Link
                  key={categoria.id}
                  to={`/agenda?publico=${categoria.id}`}
                  className="group relative p-6 rounded-2xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 hover:border-transparent transition-all duration-300 hover:shadow-xl overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${categoria.cor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${categoria.cor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-neutral-900 dark:text-white mb-2 group-hover:text-white transition-colors">
                      {categoria.label}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 group-hover:text-white/80 transition-colors">
                      {categoria.descricao}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl font-black ${categoria.cor.includes('from-') ? 'text-transparent bg-clip-text bg-gradient-to-r ' + categoria.cor : 'text-command-accent'} group-hover:text-white transition-colors`}>
                        {categoria.count}
                      </span>
                      <span className="text-sm font-bold text-neutral-600 dark:text-neutral-400 group-hover:text-white transition-colors">
                        eventos
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-command-accent group-hover:text-white transition-colors">
                      <span>Ver eventos</span>
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="text-center">
            <Link
              to="/agenda"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Ver Todos os Eventos Inclusivos</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
