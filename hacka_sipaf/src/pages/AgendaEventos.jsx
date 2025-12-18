import { useState, useMemo } from 'react'
import { FiCalendar, FiMapPin } from 'react-icons/fi'
import { eventosMock } from '../data/scs-eventos-mock'
import { toast } from 'react-hot-toast'
import PageHeader from '../components/ui/PageHeader'
import FilterBar from '../components/ui/FilterBar'
import Select from '../components/ui/Select'
import EventCard from '../components/ui/EventCard'
import DetailModal from '../components/ui/DetailModal'
import { scsImages, getImageWithFallback } from '../data/scs-images'

function AgendaEventos() {
  const [filtroQuadra, setFiltroQuadra] = useState('todas')
  const [filtroHorario, setFiltroHorario] = useState('todos')
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [selectedEvento, setSelectedEvento] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleQRCode = (evento) => {
    navigator.clipboard.writeText(evento.qrCode)
    toast.success('QR Code copiado!')
  }

  return (
    <div className="min-h-full p-6 bg-gradient-to-br from-neutral-50 via-orange-50/30 to-blue-50/30 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={FiCalendar}
          title="Agenda Inteligente"
          subtitle="Ative o território do SCS, quadra por quadra, usando eventos como ferramenta de ocupação urbana segura"
        />

        <FilterBar>
          <Select
            label="Quadra"
            value={filtroQuadra}
            onChange={(e) => setFiltroQuadra(e.target.value)}
          >
            <option value="todas">Todas as Quadras</option>
            <option value="scs-1">SCS Quadra 1</option>
            <option value="scs-2">SCS Quadra 2</option>
            <option value="scs-3">SCS Quadra 3</option>
            <option value="scs-4">SCS Quadra 4</option>
            <option value="scs-5">SCS Quadra 5</option>
            <option value="scs-6">SCS Quadra 6</option>
          </Select>

          <Select
            label="Horário"
            value={filtroHorario}
            onChange={(e) => setFiltroHorario(e.target.value)}
          >
            <option value="todos">Todos os Horários</option>
            <option value="noturno">Noturno (após 18h)</option>
          </Select>

          <Select
            label="Tipo de Evento"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <option value="todos">Todos os Tipos</option>
            <option value="cultural">Cultural</option>
            <option value="comercial">Comercial</option>
          </Select>
        </FilterBar>

        {/* Lista de Eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventosFiltrados.map(evento => (
            <EventCard
              key={evento.id}
              evento={evento}
              onShare={handleCompartilhar}
              onQRCode={handleQRCode}
              onClick={() => {
                setSelectedEvento(evento)
                setIsModalOpen(true)
              }}
            />
          ))}
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

        {eventosFiltrados.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 mb-4">
              <FiCalendar className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">
              Nenhum evento encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AgendaEventos

