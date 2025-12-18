import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FiZap, FiArrowRight, FiMapPin, FiUsers, FiShield } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { useTheme } from '../contexts/ThemeContext'
import Header from '../components/layout/Header'
import AgoraNoSCS from '../components/features/AgoraNoSCS'
import SCSHero from '../components/features/SCSHero'
import SCSImageShowcase from '../components/features/SCSImageShowcase'

function AgoraNoSCSPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const features = [
    {
      icon: FiZap,
      title: 'Agora no SCS',
      description: 'Veja em tempo real o que está acontecendo agora',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: FiMapPin,
      title: 'Mapa Vivo',
      description: 'Visualização interativa com dados em tempo real',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FiUsers,
      title: 'Comunidade Ativa',
      description: 'Conecte-se com comerciantes e cidadãos',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: FiShield,
      title: 'Segurança Inteligente',
      description: 'Alertas comunitários e predição de riscos',
      gradient: 'from-green-500 to-emerald-500',
    },
  ]

  return (
    <div className="relative">
      {/* Background fixo apenas no hero */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-orange-50/30 to-blue-50/30 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800" />
      </div>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Background com Imagens Reais do SCS - apenas no hero */}
        <div className="absolute inset-0 -z-10">
          <SCSHero variant="landing" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 dark:from-black/60 dark:via-black/50 dark:to-black/70" />
        </div>
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Content */}
            <div className="space-y-8 relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md border border-orange-500/30 shadow-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Sistema Ativo • Setor Comercial Sul
                </span>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
                  Revitalização
                </span>
                <br />
                <span className="text-white drop-shadow-lg">
                  Urbana Inteligente
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl text-white/90 leading-relaxed max-w-xl drop-shadow-md">
                Quebre o ciclo de esvaziamento através de eventos, comércios ativos e segurança comunitária. 
                <span className="font-semibold text-orange-300"> Tecnologia a serviço da cidade.</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/agenda"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:-translate-y-0.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:shadow-xl"
                >
                  <FiZap className="w-5 h-5" />
                  <span>Explorar SCS</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 font-semibold text-lg rounded-xl border-2 border-white/80 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white transition-all shadow-lg"
                >
                  <HiOutlineSparkles className="w-5 h-5" />
                  <span>Voltar ao Início</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="bg-white/10 dark:bg-neutral-800/20 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <p className="text-3xl font-bold text-white">
                    6
                  </p>
                  <p className="text-sm text-white/80">Quadras</p>
                </div>
                <div className="bg-white/10 dark:bg-neutral-800/20 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <p className="text-3xl font-bold text-white">
                    24/7
                  </p>
                  <p className="text-sm text-white/80">Monitoramento</p>
                </div>
                <div className="bg-white/10 dark:bg-neutral-800/20 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <p className="text-3xl font-bold text-white">
                    IA
                  </p>
                  <p className="text-sm text-white/80">Inteligente</p>
                </div>
              </div>
            </div>

            {/* Right: Agora no SCS Card */}
            <div className="relative z-10">
              <AgoraNoSCS />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-neutral-50/50 to-neutral-50 dark:via-neutral-900/50 dark:to-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Funcionalidades
              </span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Tudo que você precisa para revitalizar o SCS
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Galeria de Imagens Reais do SCS */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                O SCS em Imagens
              </span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Conheça o Setor Comercial Sul através de imagens reais
            </p>
          </div>
          <SCSImageShowcase />
        </div>
      </section>
    </div>
  )
}

export default AgoraNoSCSPage

