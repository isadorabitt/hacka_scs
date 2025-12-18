import { useState, useMemo } from 'react'
import { FiCalendar, FiMapPin, FiClock, FiUsers, FiShare2, FiMaximize2, FiHeart, FiUsers as FiUsersIcon, FiUser, FiCheckCircle, FiSmile } from 'react-icons/fi'
import { eventosMock } from '../data/scs-eventos-mock'
import { toast } from 'react-hot-toast'
import PageHeader from '../components/ui/PageHeader'
import DetailModal from '../components/ui/DetailModal'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

function AgendaEventos() {
  const [filtroQuadra, setFiltroQuadra] = useState('todas')
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [filtrosPublicoAlvo, setFiltrosPublicoAlvo] = useState([]) // Array para múltipla seleção
  const [selectedEvento, setSelectedEvento] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Configuração dos filtros inclusivos
  const filtrosInclusivos = [
    {
      id: 'feminino',
      label: 'Público Feminino',
      icon: FiUser,
      cor: 'from-pink-500 to-rose-600',
      descricao: 'Eventos voltados para mulheres'
    },
    {
      id: 'lgbt',
      label: 'LGBTQIA+',
      icon: FiHeart,
      cor: 'from-purple-500 to-pink-600',
      descricao: 'Eventos inclusivos para comunidade LGBTQIA+'
    },
    {
      id: 'idoso',
      label: 'Idosos',
      icon: FiUsersIcon,
      cor: 'from-blue-500 to-cyan-600',
      descricao: 'Eventos acessíveis para idosos'
    },
    {
      id: 'infantil',
      label: 'Infantil',
      icon: FiSmile,
      cor: 'from-yellow-500 to-orange-600',
      descricao: 'Eventos para crianças e famílias'
    },
    {
      id: 'acessivel',
      label: 'Acessível',
      icon: FiCheckCircle,
      cor: 'from-teal-500 to-green-600',
      descricao: 'Eventos com acessibilidade garantida'
    }
  ]

  const toggleFiltroPublicoAlvo = (filtroId) => {
    setFiltrosPublicoAlvo(prev => 
      prev.includes(filtroId) 
        ? prev.filter(id => id !== filtroId)
        : [...prev, filtroId]
    )
  }

  // Separar eventos em "Acontecendo Agora" (3 eventos) e "Próximos" (6 eventos)
  const eventosAcontecendoAgora = useMemo(() => {
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    
    return eventosMock
      .filter(evento => {
        const dataEvento = new Date(evento.data)
        const dataEventoLimpa = new Date(dataEvento)
        dataEventoLimpa.setHours(0, 0, 0, 0)
        
        // Eventos que começaram hoje ou antes e têm destaque alto
        return dataEventoLimpa <= hoje && evento.nivelDestaque === 'alto'
      })
      .slice(0, 3) // Limitar a 3 eventos
  }, [])

  const eventosProximos = useMemo(() => {
    const filtrados = eventosMock.filter(evento => {
      const matchQuadra = filtroQuadra === 'todas' || evento.quadra === filtroQuadra
      const matchTipo = filtroTipo === 'todos' || evento.tipo === filtroTipo
      
      // Filtro de público-alvo: evento deve ter pelo menos um dos públicos selecionados
      const matchPublicoAlvo = filtrosPublicoAlvo.length === 0 || 
        (evento.publicoAlvo && evento.publicoAlvo.some(publico => filtrosPublicoAlvo.includes(publico)))
      
      const dataEvento = new Date(evento.data)
      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)
      const dataEventoLimpa = new Date(dataEvento)
      dataEventoLimpa.setHours(0, 0, 0, 0)
      
      // Eventos futuros ou que não estão em "Acontecendo Agora"
      const isFuturo = dataEventoLimpa > hoje || !eventosAcontecendoAgora.find(e => e.id === evento.id)
      
      return matchQuadra && matchTipo && matchPublicoAlvo && isFuturo
    })
    
    return filtrados.slice(0, 6) // Limitar a 6 eventos
  }, [filtroQuadra, filtroTipo, filtrosPublicoAlvo, eventosAcontecendoAgora])

  // Contar eventos por público-alvo
  const contadoresPublicoAlvo = useMemo(() => {
    const contadores = {}
    filtrosInclusivos.forEach(filtro => {
      contadores[filtro.id] = eventosMock.filter(e => 
        e.publicoAlvo && e.publicoAlvo.includes(filtro.id)
      ).length
    })
    return contadores
  }, [])

  const getQuadraNumero = (quadraId) => {
    const quadras = {
      'scs-1': 1,
      'scs-2': 2,
      'scs-3': 3,
      'scs-4': 4,
      'scs-5': 5,
      'scs-6': 6
    }
    return quadras[quadraId] || 1
  }

  const getQuadraNome = (quadraId) => {
    const quadras = {
      'scs-1': 'SCS Quadra 1',
      'scs-2': 'SCS Quadra 2',
      'scs-3': 'SCS Quadra 3',
      'scs-4': 'SCS Quadra 4',
      'scs-5': 'SCS Quadra 5',
      'scs-6': 'SCS Quadra 6'
    }
    return quadras[quadraId] || quadraId
  }

  const getTipoCor = (tipo) => {
    const cores = {
      'cultural': 'from-teal-500 to-blue-600',
      'comercial': 'from-orange-500 to-red-600',
      'gastronomico': 'from-orange-500 to-pink-600',
      'show': 'from-pink-500 to-red-600',
      'feira': 'from-orange-500 to-red-600',
    }
    return cores[tipo] || 'from-amber-500 to-orange-600'
  }

  const getTipoLabel = (tipo) => {
    const labels = {
      'cultural': 'CULTURAL',
      'comercial': 'COMERCIAL',
      'gastronomico': 'GASTRONOMICO',
      'show': 'SHOW',
      'feira': 'FEIRA',
    }
    return labels[tipo] || tipo.toUpperCase()
  }

  const getPublicoAlvoBadge = (publicoId) => {
    const filtro = filtrosInclusivos.find(f => f.id === publicoId)
    if (!filtro) return null
    const Icon = filtro.icon
    return (
      <span
        key={publicoId}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${filtro.cor} shadow-sm`}
        title={filtro.descricao}
      >
        <Icon className="w-3 h-3" />
        {filtro.label}
      </span>
    )
  }

  const formatarData = (data) => {
    const date = new Date(data)
    const dia = date.getDate()
    const mes = date.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase()
    return { dia, mes }
  }

  const getTempoRelativo = (data) => {
    try {
      const date = new Date(data)
      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)
      const dataEvento = new Date(date)
      dataEvento.setHours(0, 0, 0, 0)
      
      if (dataEvento < hoje) {
        const diff = Math.floor((hoje - dataEvento) / (1000 * 60 * 60 * 24))
        return `Começou há ${diff} dia${diff > 1 ? 's' : ''}`
      } else if (dataEvento.getTime() === hoje.getTime()) {
        return 'Hoje'
      } else {
        const diff = Math.floor((dataEvento - hoje) / (1000 * 60 * 60 * 24))
        return diff === 1 ? 'amanhã' : `em ${diff} dias`
      }
    } catch (e) {
      return 'em breve'
    }
  }

  const handleCompartilhar = (evento) => {
    const url = evento.qrCode
    if (navigator.share) {
      navigator.share({
        title: evento.titulo,
        text: evento.descricao,
        url: url
      })
    } else {
      navigator.clipboard.writeText(url)
      toast.success('Link copiado!')
    }
  }

  const handleQRCode = (evento) => {
    navigator.clipboard.writeText(evento.qrCode)
    toast.success('QR Code copiado!')
  }

  return (
    <div className="h-full p-6 bg-gradient-to-br from-neutral-50 via-orange-50/30 to-blue-50/30 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto">
          <PageHeader
            icon={FiCalendar}
            title="Agenda Inteligente"
            subtitle="Ative o território do SCS, quadra por quadra, usando eventos como ferramenta de ocupação urbana segura"
          />

          {/* Seção: Filtros Inclusivos */}
          <div className="mb-8 bg-command-surface rounded-2xl p-6 border border-command-border shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <FiHeart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-command-text">Eventos Inclusivos</h3>
                <p className="text-sm text-command-text-muted">Encontre eventos pensados para você</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {filtrosInclusivos.map(filtro => {
                const Icon = filtro.icon
                const isActive = filtrosPublicoAlvo.includes(filtro.id)
                const count = contadoresPublicoAlvo[filtro.id] || 0

                return (
                  <button
                    key={filtro.id}
                    onClick={() => toggleFiltroPublicoAlvo(filtro.id)}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-br ${filtro.cor} border-transparent text-white shadow-lg transform scale-105`
                        : 'bg-command-surface-alt border-command-border text-command-text hover:border-command-accent hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-command-accent'}`} />
                      {count > 0 && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-command-accent/20 text-command-accent'
                        }`}>
                          {count}
                        </span>
                      )}
                    </div>
                    <div className="text-left">
                      <div className={`font-bold text-sm mb-1 ${isActive ? 'text-white' : 'text-command-text'}`}>
                        {filtro.label}
                      </div>
                      <div className={`text-xs ${isActive ? 'text-white/80' : 'text-command-text-muted'}`}>
                        {filtro.descricao}
                      </div>
                    </div>
                    {isActive && (
                      <div className="absolute top-2 right-2">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {filtrosPublicoAlvo.length > 0 && (
              <div className="mt-4 pt-4 border-t border-command-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-command-text-muted">
                  <span>Filtros ativos:</span>
                  <div className="flex flex-wrap gap-2">
                    {filtrosPublicoAlvo.map(id => {
                      const filtro = filtrosInclusivos.find(f => f.id === id)
                      return filtro ? (
                        <span
                          key={id}
                          className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${filtro.cor} text-white`}
                        >
                          {filtro.label}
                        </span>
                      ) : null
                    })}
                  </div>
                </div>
                <button
                  onClick={() => setFiltrosPublicoAlvo([])}
                  className="text-sm text-command-accent hover:text-command-accent-hover font-semibold"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>

          {/* Seção: Acontecendo Agora */}
          {eventosAcontecendoAgora.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-black text-neutral-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                Acontecendo Agora
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventosAcontecendoAgora.map((evento) => {
                  const quadraNum = getQuadraNumero(evento.quadra)
                  
                  return (
                    <div
                      key={evento.id}
                      onClick={() => {
                        setSelectedEvento(evento)
                        setIsModalOpen(true)
                      }}
                      className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                    >
                      {/* Imagem */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={evento.imagem}
                          alt={evento.titulo}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                        {/* Badge AO VIVO */}
                        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-black flex items-center gap-2 animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full" />
                          AO VIVO
                        </div>

                        {/* Badge Quadra */}
                        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center font-black text-neutral-900 shadow-lg">
                          {quadraNum}
                        </div>

                        {/* Badge Tipo */}
                        <div className="absolute bottom-3 left-3">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-black text-white bg-gradient-to-r ${getTipoCor(evento.tipo)} shadow-lg`}>
                            {getTipoLabel(evento.tipo)}
                          </span>
                        </div>

                        {/* Badges de Público-Alvo */}
                        {evento.publicoAlvo && evento.publicoAlvo.length > 0 && (
                          <div className="absolute bottom-3 right-3 flex flex-col gap-1">
                            {evento.publicoAlvo.slice(0, 2).map(publico => getPublicoAlvoBadge(publico))}
                          </div>
                        )}
                      </div>

                      {/* Conteúdo */}
                      <div className="p-6">
                        <h3 className="text-xl font-black text-neutral-900 dark:text-white mb-2 line-clamp-2">
                          {evento.titulo}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                          {evento.descricao}
                        </p>

                        {/* Badges de Público-Alvo no conteúdo */}
                        {evento.publicoAlvo && evento.publicoAlvo.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {evento.publicoAlvo.map(publico => getPublicoAlvoBadge(publico))}
                          </div>
                        )}

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                            <FiClock className="w-4 h-4 text-amber-500" />
                            <span>Começou {getTempoRelativo(evento.data)}</span>
                          </div>
                          {evento.engajamento?.confirmacoes && (
                            <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                              <FiUsers className="w-4 h-4 text-pink-500" />
                              <span>{evento.engajamento.confirmacoes} confirmados</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Seção: Próximos Eventos */}
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-3xl font-black text-neutral-900 dark:text-white">
                Próximos Eventos
              </h2>

              {/* Filtros */}
              <div className="flex items-center gap-3">
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                >
                  <option value="todos">Todos os Tipos</option>
                  <option value="cultural">Cultural</option>
                  <option value="comercial">Comercial</option>
                  <option value="gastronomico">Gastronômico</option>
                  <option value="show">Show</option>
                  <option value="feira">Feira</option>
                </select>

                <select
                  value={filtroQuadra}
                  onChange={(e) => setFiltroQuadra(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                >
                  <option value="todas">Todas Quadras</option>
                  <option value="scs-1">Quadra 1</option>
                  <option value="scs-2">Quadra 2</option>
                  <option value="scs-3">Quadra 3</option>
                  <option value="scs-4">Quadra 4</option>
                  <option value="scs-5">Quadra 5</option>
                  <option value="scs-6">Quadra 6</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventosProximos.map((evento) => {
                const { dia, mes } = formatarData(evento.data)
                const quadraNum = getQuadraNumero(evento.quadra)
                
                return (
                  <div
                    key={evento.id}
                    className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border-2 border-neutral-300 dark:border-neutral-600 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer group"
                    onClick={() => {
                      setSelectedEvento(evento)
                      setIsModalOpen(true)
                    }}
                  >
                    {/* Imagem */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={evento.imagem}
                        alt={evento.titulo}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Badge Data */}
                      <div className="absolute top-3 left-3">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getTipoCor(evento.tipo)} flex flex-col items-center justify-center text-white shadow-lg`}>
                          <span className="text-2xl font-black">{dia}</span>
                          <span className="text-[10px] uppercase font-black -mt-1">{mes}</span>
                        </div>
                      </div>

                      {/* Badge Quadra */}
                      <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center font-black text-neutral-900 shadow-lg">
                        {quadraNum}
                      </div>

                      {/* Badge Tipo */}
                      <div className="absolute bottom-3 left-3">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-black text-white bg-gradient-to-r ${getTipoCor(evento.tipo)} shadow-lg`}>
                          {getTipoLabel(evento.tipo)}
                        </span>
                      </div>

                      {/* Badges de Público-Alvo */}
                      {evento.publicoAlvo && evento.publicoAlvo.length > 0 && (
                        <div className="absolute bottom-3 right-3 flex flex-col gap-1">
                          {evento.publicoAlvo.slice(0, 2).map(publico => getPublicoAlvoBadge(publico))}
                        </div>
                      )}
                    </div>

                    {/* Conteúdo Completo */}
                    <div className="p-6">
                      <h3 className="text-xl font-black text-neutral-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                        {evento.titulo}
                      </h3>
                      <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4 line-clamp-2 font-medium">
                        {evento.descricao}
                      </p>

                      {/* Badges de Público-Alvo no conteúdo */}
                      {evento.publicoAlvo && evento.publicoAlvo.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {evento.publicoAlvo.map(publico => getPublicoAlvoBadge(publico))}
                        </div>
                      )}

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                          <FiMapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                          <span>{getQuadraNome(evento.quadra)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                          <FiCalendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                          <span>{new Date(evento.data).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                          <FiClock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                          <span>{evento.horario} - {evento.horarioFim}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                          <FiUsers className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                          <span>{evento.engajamento?.confirmacoes || 0} confirmados</span>
                        </div>
                      </div>

                      {evento.necessidadeApoio && evento.necessidadeApoio.length > 0 && (
                        <div className="mb-4">
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Apoio necessário:</div>
                          <div className="flex flex-wrap gap-2">
                            {evento.necessidadeApoio.map(apoio => (
                              <Badge key={apoio} variant="outline" size="sm">
                                {apoio === 'seguranca' ? '🛡️ Segurança' : '💡 Iluminação'}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          leftIcon={<FiShare2 />}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCompartilhar(evento)
                          }}
                        >
                          Compartilhar
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          leftIcon={<FiMaximize2 />}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleQRCode(evento)
                          }}
                        >
                          QR Code
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {eventosProximos.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 mb-4">
                  <FiCalendar className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">
                  Nenhum evento encontrado com os filtros selecionados.
                </p>
                {filtrosPublicoAlvo.length > 0 && (
                  <button
                    onClick={() => setFiltrosPublicoAlvo([])}
                    className="mt-4 text-command-accent hover:text-command-accent-hover font-semibold"
                  >
                    Limpar filtros inclusivos
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Modal de Detalhes */}
          <DetailModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false)
              setSelectedEvento(null)
            }}
            item={selectedEvento}
            type="evento"
          />
        </div>
    </div>
  )
}

export default AgendaEventos
