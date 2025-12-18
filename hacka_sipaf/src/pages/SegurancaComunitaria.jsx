import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { FiShield, FiAlertTriangle, FiAlertCircle, FiAlertOctagon, FiMapPin, FiClock } from 'react-icons/fi'
import { alertasMock, padroesHistorico } from '../data/scs-alertas-mock'
import scsQuadras from '../data/scs-quadras.js'
import { eventosMock } from '../data/scs-eventos-mock'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Cores para tipos de alerta
const coresAlerta = {
  'atividade-suspeita': '#FFA500',
  'ameaca': '#FF6B6B',
  'assalto': '#DC143C'
}

function SegurancaComunitaria() {
  const [tipoAlerta, setTipoAlerta] = useState('todos')
  const [mostrarPreditivo, setMostrarPreditivo] = useState(true)

  const alertasFiltrados = useMemo(() => {
    return alertasMock.filter(alerta => 
      tipoAlerta === 'todos' || alerta.tipo === tipoAlerta
    )
  }, [tipoAlerta])

  // Análise preditiva por quadra
  const riscoPreditivo = useMemo(() => {
    const agora = new Date()
    const hora = agora.getHours()
    const eventosAtivos = eventosMock.filter(evt => {
      const evtHora = parseInt(evt.horario.split(':')[0])
      return evtHora <= hora && hora <= parseInt(evt.horarioFim.split(':')[0])
    })

    return Object.entries(padroesHistorico).map(([quadra, padrao]) => {
      const eventosNaQuadra = eventosAtivos.filter(evt => evt.quadra === quadra).length
      const riscoBase = padrao.riscoNoturno === 'alto' ? 0.7 : padrao.riscoNoturno === 'medio' ? 0.4 : 0.2
      const riscoAjustado = riscoBase + (eventosNaQuadra > 0 ? 0.1 : -0.1)
      
      return {
        quadra,
        risco: Math.min(1, Math.max(0, riscoAjustado)),
        eventosAtivos: eventosNaQuadra,
        horarioCritico: padrao.horariosCriticos
      }
    })
  }, [])

  const getTipoNome = (tipo) => {
    const tipos = {
      'atividade-suspeita': 'Atividade Suspeita',
      'ameaca': 'Ameaça',
      'assalto': 'Assalto'
    }
    return tipos[tipo] || tipo
  }

  const getStatusNome = (status) => {
    const statusMap = {
      'reportado': 'Reportado',
      'em-atendimento': 'Em Atendimento',
      'resolvido': 'Resolvido'
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status) => {
    const colors = {
      'reportado': 'bg-yellow-500/20 text-yellow-500',
      'em-atendimento': 'bg-orange-500/20 text-orange-500',
      'resolvido': 'bg-green-500/20 text-green-500'
    }
    return colors[status] || 'bg-gray-500/20 text-gray-500'
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-neutral-900">
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-3">
          <FiShield className="text-orange-500" />
          Segurança Comunitária Inteligente
        </h1>
        <p className="text-neutral-900 dark:text-white-muted">
          Transforme o cidadão em sensor urbano anônimo e confiável
        </p>

        {/* Botões Rápidos */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/30 transition-colors">
            <FiAlertTriangle className="w-6 h-6" />
            <span className="font-semibold">Atividade Suspeita</span>
          </button>
          <button className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-500 hover:bg-orange-500/30 transition-colors">
            <FiAlertCircle className="w-6 h-6" />
            <span className="font-semibold">Ameaça</span>
          </button>
          <button className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-500 hover:bg-red-500/30 transition-colors">
            <FiAlertOctagon className="w-6 h-6" />
            <span className="font-semibold">Assalto</span>
          </button>
        </div>

        {/* Filtros */}
        <div className="mt-6 flex items-center gap-4">
          <select
            value={tipoAlerta}
            onChange={(e) => setTipoAlerta(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white"
          >
            <option value="todos">Todos os Alertas</option>
            <option value="atividade-suspeita">Atividade Suspeita</option>
            <option value="ameaca">Ameaça</option>
            <option value="assalto">Assalto</option>
          </select>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={mostrarPreditivo}
              onChange={(e) => setMostrarPreditivo(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-neutral-900 dark:text-white">Mostrar Mapa Preditivo</span>
          </label>
        </div>
      </div>

      {/* Mapa e Lista */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-y-auto">
        {/* Mapa */}
        <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <MapContainer
            center={[-15.7925, -47.8850]}
            zoom={14}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Quadras com Risco Preditivo */}
            {mostrarPreditivo && scsQuadras.features.map(quadra => {
              const risco = riscoPreditivo.find(r => r.quadra === quadra.properties.id)
              const riscoValue = risco?.risco || 0
              const corRisco = riscoValue > 0.6 ? '#DC143C' : riscoValue > 0.3 ? '#FFA500' : '#90EE90'
              
              return (
                <Polygon
                  key={quadra.properties.id}
                  positions={quadra.geometry.coordinates[0].map(coord => [coord[1], coord[0]])}
                  pathOptions={{
                    color: corRisco,
                    fillColor: corRisco,
                    fillOpacity: riscoValue * 0.3,
                    weight: 2
                  }}
                >
                  <Popup>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{quadra.properties.nome}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          riscoValue > 0.6 
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                            : riscoValue > 0.3
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                            : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        }`}>
                          Risco: {(riscoValue * 100).toFixed(0)}%
                        </span>
                      </div>
                      {risco?.eventosAtivos > 0 && (
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          {risco.eventosAtivos} evento(s) ativo(s)
                        </p>
                      )}
                    </div>
                  </Popup>
                </Polygon>
              )
            })}

            {/* Alertas */}
            {alertasFiltrados.map(alerta => (
              <Marker
                key={alerta.id}
                position={[alerta.coordenadas[1], alerta.coordenadas[0]]}
                icon={L.icon({
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41]
                })}
              >
                <Popup>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex-1">{getTipoNome(alerta.tipo)}</h3>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                        {getStatusNome(alerta.status)}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{alerta.descricao}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500">
                      {new Date(alerta.data).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Lista de Alertas */}
        <div className="overflow-auto">
          <div className="space-y-4">
            {alertasFiltrados.map(alerta => (
              <div
                key={alerta.id}
                className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${coresAlerta[alerta.tipo]}/20` }}
                    >
                      {alerta.tipo === 'atividade-suspeita' && <FiAlertTriangle className="w-6 h-6" style={{ color: coresAlerta[alerta.tipo] }} />}
                      {alerta.tipo === 'ameaca' && <FiAlertCircle className="w-6 h-6" style={{ color: coresAlerta[alerta.tipo] }} />}
                      {alerta.tipo === 'assalto' && <FiAlertOctagon className="w-6 h-6" style={{ color: coresAlerta[alerta.tipo] }} />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{getTipoNome(alerta.tipo)}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(alerta.status)}`}>
                        {getStatusNome(alerta.status)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-neutral-900 dark:text-white-muted mb-4">{alerta.descricao}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-neutral-900 dark:text-white-muted">
                    <FiMapPin className="text-orange-500" />
                    <span>Quadra {alerta.quadra.replace('scs-', '')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-900 dark:text-white-muted">
                    <FiClock className="text-orange-500" />
                    <span>{new Date(alerta.data).toLocaleString('pt-BR')}</span>
                  </div>
                  {alerta.correlacao.eventosAtivos > 0 && (
                    <div className="mt-3 p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <p className="text-xs text-blue-500">
                        {alerta.correlacao.eventosAtivos} evento(s) ativo(s) na quadra no momento do alerta
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {alertasFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-900 dark:text-white-muted">Nenhum alerta encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SegurancaComunitaria

