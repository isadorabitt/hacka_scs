import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { FiHome, FiMapPin, FiCalendar, FiTrendingUp, FiFilter } from 'react-icons/fi'
import { comerciosMock } from '../data/scs-comercios-mock'
import { eventosMock } from '../data/scs-eventos-mock'
import scsQuadras from '../data/scs-quadras.js'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

function VacanciaReativacao() {
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [filtroQuadra, setFiltroQuadra] = useState('todas')

  const imoveisVazios = useMemo(() => {
    return comerciosMock.filter(c => c.status === 'vazio')
  }, [])

  const espacosPublicos = useMemo(() => {
    return comerciosMock.filter(c => c.tipo === 'espaco-publico')
  }, [])

  const itensFiltrados = useMemo(() => {
    const todos = [...imoveisVazios, ...espacosPublicos]
    return todos.filter(item => {
      const matchTipo = filtroTipo === 'todos' || 
        (filtroTipo === 'vazio' && item.status === 'vazio') ||
        (filtroTipo === 'publico' && item.tipo === 'espaco-publico')
      const matchQuadra = filtroQuadra === 'todas' || item.quadra === filtroQuadra
      return matchTipo && matchQuadra
    })
  }, [filtroTipo, filtroQuadra, imoveisVazios, espacosPublicos])

  // Eventos que podem usar espaços públicos
  const eventosDisponiveis = useMemo(() => {
    return eventosMock.filter(evt => 
      evt.quadra === 'scs-5' || evt.quadra === 'scs-6'
    )
  }, [])

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
    <div className="h-full flex flex-col bg-white dark:bg-neutral-900">
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-3">
          <FiHome className="text-orange-500" />
          Vacância e Reativação de Espaços
        </h1>
        <p className="text-neutral-900 dark:text-white-muted">
          Reduzir imóveis ociosos e estimular ocupação temporária e permanente
        </p>

        {/* Estatísticas */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
            <div className="text-2xl font-bold text-neutral-900 dark:text-white">{imoveisVazios.length}</div>
            <div className="text-sm text-neutral-900 dark:text-white-muted">Imóveis Vazios</div>
          </div>
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
            <div className="text-2xl font-bold text-neutral-900 dark:text-white">{espacosPublicos.length}</div>
            <div className="text-sm text-neutral-900 dark:text-white-muted">Espaços Públicos</div>
          </div>
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
            <div className="text-2xl font-bold text-neutral-900 dark:text-white">{eventosDisponiveis.length}</div>
            <div className="text-sm text-neutral-900 dark:text-white-muted">Eventos em SCS 5 e 6</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-neutral-900 dark:text-white-muted mb-2">
              Tipo
            </label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white"
            >
              <option value="todos">Todos</option>
              <option value="vazio">Imóveis Vazios</option>
              <option value="publico">Espaços Públicos</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-neutral-900 dark:text-white-muted mb-2">
              Quadra
            </label>
            <select
              value={filtroQuadra}
              onChange={(e) => setFiltroQuadra(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white"
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
              className="leaflet-tile-pane"
            />
            
            {/* Quadras */}
            {scsQuadras.features.map(quadra => (
              <Polygon
                key={quadra.properties.id}
                positions={quadra.geometry.coordinates[0].map(coord => [coord[1], coord[0]])}
                pathOptions={{
                  color: quadra.properties.cor,
                  fillColor: quadra.properties.cor,
                  fillOpacity: 0.2,
                  weight: 2
                }}
              >
                <Popup>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{quadra.properties.nome}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{quadra.properties.descricao}</p>
                  </div>
                </Popup>
              </Polygon>
            ))}

            {/* Imóveis Vazios */}
            {itensFiltrados.filter(item => item.status === 'vazio').map(item => (
              <Marker
                key={item.id}
                position={[item.coordenadas[1], item.coordenadas[0]]}
                icon={L.icon({
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41]
                })}
              >
                <Popup>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex-1">{item.nome}</h3>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                        Vazia
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Disponível para locação</p>
                    {item.tempoVazio && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-500">Vazio há {item.tempoVazio}</p>
                    )}
                      <p className="text-xs font-medium text-orange-600 dark:text-orange-400 mt-2">
                        - SCS {item.quadra?.replace('scs-', '') || 'N/A'}
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Espaços Públicos */}
            {itensFiltrados.filter(item => item.tipo === 'espaco-publico').map(item => (
              <Marker
                key={item.id}
                position={[item.coordenadas[1], item.coordenadas[0]]}
                icon={L.icon({
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41]
                })}
              >
                <Popup>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex-1">{item.nome}</h3>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                        Público
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Espaço público disponível para eventos</p>
                    <p className="text-xs font-medium text-orange-600 dark:text-orange-400 mt-2">
                      - SCS {item.quadra?.replace('scs-', '') || 'N/A'}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Lista */}
        <div className="overflow-auto">
          <div className="space-y-4">
            {itensFiltrados.map(item => (
              <div
                key={item.id}
                className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700"
              >
                {/* Imagem do Item */}
                {item.imagem && (
                  <div className="relative h-40 w-full overflow-hidden">
                    <img 
                      src={item.imagem} 
                      alt={item.nome}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80'
                      }}
                    />
                    {/* Badge sobre a imagem */}
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full backdrop-blur-sm text-white text-xs font-semibold ${
                      item.status === 'vazio' 
                        ? 'bg-blue-500/90'
                        : 'bg-green-500/90'
                    }`}>
                      {item.status === 'vazio' ? 'Imóvel Vazio' : 'Espaço Público'}
                    </div>
                    {/* Overlay escuro sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">{item.nome}</h3>
                      {!item.imagem && (
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === 'vazio' 
                            ? 'bg-blue-500/20 text-blue-500'
                            : 'bg-green-500/20 text-green-500'
                        }`}>
                          {item.status === 'vazio' ? 'Imóvel Vazio' : 'Espaço Público'}
                        </span>
                      )}
                    </div>
                  </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-900 dark:text-white-muted">
                    <FiMapPin className="text-orange-500" />
                    <span>{item.endereco}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-900 dark:text-white-muted">
                    <FiHome className="text-orange-500" />
                    <span>{getQuadraNome(item.quadra)}</span>
                  </div>
                </div>

                <p className="text-sm text-neutral-900 dark:text-white-muted mb-4">{item.descricao}</p>

                {item.status === 'vazio' && (
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 mb-3">
                    <p className="text-sm text-blue-500 font-medium">
                      Disponível para locação
                      {item.tempoVazio && ` • Vazio há ${item.tempoVazio}`}
                    </p>
                  </div>
                )}

                {item.disponivelParaEventos && (
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                    <p className="text-sm text-green-500 font-medium mb-2">
                      Disponível para eventos culturais
                    </p>
                    <button className="text-xs text-green-500 hover:underline">
                      Ver eventos disponíveis →
                    </button>
                  </div>
                )}
                </div>
              </div>
            ))}
          </div>

          {itensFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-900 dark:text-white-muted">Nenhum item encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VacanciaReativacao

