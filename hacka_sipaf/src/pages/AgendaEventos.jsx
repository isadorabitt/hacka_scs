import { useState, useMemo } from 'react'
import { FiCalendar, FiMapPin, FiClock, FiUsers, FiFilter, FiMaximize2, FiShare2 } from 'react-icons/fi'
import { eventosMock } from '../data/scs-eventos-mock'
import { toast } from 'react-hot-toast'

function AgendaEventos() {
  const [filtroQuadra, setFiltroQuadra] = useState('todas')
  const [filtroHorario, setFiltroHorario] = useState('todos')
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [eventoSelecionado, setEventoSelecionado] = useState(null)

  const eventosFiltrados = useMemo(() => {
    return eventosMock.filter(evento => {
      const matchQuadra = filtroQuadra === 'todas' || evento.quadra === filtroQuadra
      const matchHorario = filtroHorario === 'todos' || 
        (filtroHorario === 'noturno' && parseInt(evento.horario.split(':')[0]) >= 18)
      const matchTipo = filtroTipo === 'todos' || evento.tipo === filtroTipo
      return matchQuadra && matchHorario && matchTipo
    })
  }, [filtroQuadra, filtroHorario, filtroTipo])

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

  return (
    <div className="h-full overflow-auto bg-command-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-command-text mb-2 flex items-center gap-3">
            <FiCalendar className="text-command-accent" />
            Agenda Inteligente de Eventos
          </h1>
          <p className="text-command-text-muted">
            Ative o território do SCS, quadra por quadra, usando eventos como ferramenta de ocupação urbana segura
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-command-surface rounded-xl p-6 mb-6 border border-command-border">
          <div className="flex items-center gap-2 mb-4">
            <FiFilter className="text-command-accent" />
            <h2 className="font-semibold text-command-text">Filtros</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filtro Quadra */}
            <div>
              <label className="block text-sm font-medium text-command-text-muted mb-2">
                Quadra
              </label>
              <select
                value={filtroQuadra}
                onChange={(e) => setFiltroQuadra(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-command-bg border border-command-border text-command-text"
              >
                <option value="todas">Todas as Quadras</option>
                <option value="scs-1">SCS Quadra 1</option>
                <option value="scs-2">SCS Quadra 2</option>
                <option value="scs-3">SCS Quadra 3</option>
                <option value="scs-4">SCS Quadra 4</option>
                <option value="scs-5">SCS Quadra 5</option>
                <option value="scs-6">SCS Quadra 6</option>
              </select>
            </div>

            {/* Filtro Horário */}
            <div>
              <label className="block text-sm font-medium text-command-text-muted mb-2">
                Horário
              </label>
              <select
                value={filtroHorario}
                onChange={(e) => setFiltroHorario(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-command-bg border border-command-border text-command-text"
              >
                <option value="todos">Todos os Horários</option>
                <option value="noturno">Noturno (após 18h)</option>
              </select>
            </div>

            {/* Filtro Tipo */}
            <div>
              <label className="block text-sm font-medium text-command-text-muted mb-2">
                Tipo de Evento
              </label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-command-bg border border-command-border text-command-text"
              >
                <option value="todos">Todos os Tipos</option>
                <option value="cultural">Cultural</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventosFiltrados.map(evento => (
            <div
              key={evento.id}
              className="bg-command-surface rounded-xl overflow-hidden border border-command-border hover:border-command-accent/50 transition-all cursor-pointer"
              onClick={() => setEventoSelecionado(evento)}
            >
              {/* Imagem do Evento */}
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={evento.imagem} 
                  alt={evento.titulo}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80'
                  }}
                />
                {/* Badge de Destaque sobre a imagem */}
                {evento.nivelDestaque === 'alto' && (
                  <div className="absolute top-3 right-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-sm text-white text-xs font-semibold">
                    ⭐ Destaque
                  </div>
                )}
                {/* Overlay escuro sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-command-text mb-2">{evento.titulo}</h3>
                <p className="text-command-text-muted text-sm mb-4 line-clamp-2">{evento.descricao}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-command-text-muted">
                  <FiMapPin className="text-command-accent" />
                  <span>{getQuadraNome(evento.quadra)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-command-text-muted">
                  <FiCalendar className="text-command-accent" />
                  <span>{new Date(evento.data).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-command-text-muted">
                  <FiClock className="text-command-accent" />
                  <span>{evento.horario} - {evento.horarioFim}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-command-text-muted">
                  <FiUsers className="text-command-accent" />
                  <span>{evento.engajamento.confirmacoes} confirmados</span>
                </div>
              </div>

              {/* Apoio Necessário */}
              {evento.necessidadeApoio.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs text-command-text-muted mb-1">Apoio necessário:</div>
                  <div className="flex flex-wrap gap-2">
                    {evento.necessidadeApoio.map(apoio => (
                      <span key={apoio} className="px-2 py-1 rounded bg-blue-500/20 text-blue-500 text-xs">
                        {apoio === 'seguranca' ? 'Segurança' : 'Iluminação'}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ações */}
              <div className="flex items-center gap-3 pt-4 border-t border-command-border">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCompartilhar(evento)
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-command-accent/10 text-command-accent hover:bg-command-accent/20 transition-colors"
                >
                  <FiShare2 />
                  <span>Compartilhar</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard.writeText(evento.qrCode)
                    toast.success('QR Code copiado!')
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-command-accent text-white hover:bg-command-accent/90 transition-colors"
                >
                  <FiMaximize2 />
                  <span>QR Code</span>
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>

        {eventosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-command-text-muted">Nenhum evento encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AgendaEventos

