import { useState, useMemo } from 'react'
import { FiShoppingBag, FiMapPin, FiClock, FiPhone, FiMoon } from 'react-icons/fi'
import { comerciosMock } from '../data/scs-comercios-mock'
import scsQuadras from '../data/scs-quadras.js'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import PageHeader from '../components/ui/PageHeader'
import FilterBar from '../components/ui/FilterBar'
import Select from '../components/ui/Select'
import Badge from '../components/ui/Badge'
import DetailModal from '../components/ui/DetailModal'
import MapLegend from '../components/map/MapLegend'
import { markerIcons } from '../components/map/CustomMarker'

// Fix para ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

function ComerciosAtivos() {
  const [filtroQuadra, setFiltroQuadra] = useState('todas')
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [mostrarAbertosNoite, setMostrarAbertosNoite] = useState(false)
  const [selectedComercio, setSelectedComercio] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [visibleLayers, setVisibleLayers] = useState({
    comercios: true,
    abertosNoite: true,
    quadras: true
  })

  const comerciosFiltrados = useMemo(() => {
    return comerciosMock.filter(comercio => {
      const matchQuadra = filtroQuadra === 'todas' || comercio.quadra === filtroQuadra
      const matchTipo = filtroTipo === 'todos' || comercio.tipo === filtroTipo
      const matchAbertoNoite = !mostrarAbertosNoite || comercio.abertoNoite
      return matchQuadra && matchTipo && matchAbertoNoite
    })
  }, [filtroQuadra, filtroTipo, mostrarAbertosNoite])

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

  const getTipoNome = (tipo) => {
    const tipos = {
      'bar': 'Bar',
      'restaurante': 'Restaurante',
      'servico': 'Serviço',
      'vazio': 'Imóvel Vazio',
      'espaco-publico': 'Espaço Público'
    }
    return tipos[tipo] || tipo
  }

  return (
    <div className="min-h-full flex flex-col bg-gradient-to-br from-neutral-50 via-orange-50/30 to-blue-50/30 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <div className="p-6 border-b border-neutral-200/50 dark:border-neutral-700/50">
        <PageHeader
          icon={FiShoppingBag}
          title="Comércios Ativos"
          subtitle="Combate a ideia de 'zona morta' destacando comércios abertos, especialmente à noite"
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
            label="Tipo"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <option value="todos">Todos os Tipos</option>
            <option value="bar">Bares</option>
            <option value="restaurante">Restaurantes</option>
            <option value="servico">Serviços</option>
            <option value="espaco-publico">Espaços Públicos</option>
            <option value="vazio">Imóveis Vazios</option>
          </Select>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <input
                type="checkbox"
                checked={mostrarAbertosNoite}
                onChange={(e) => setMostrarAbertosNoite(e.target.checked)}
                className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                <FiMoon className="text-orange-500" />
                Abertos à noite
              </span>
            </label>
          </div>
        </FilterBar>
      </div>

      {/* Mapa e Lista */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-y-auto">
        {/* Mapa */}
        <div className="rounded-2xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-lg relative">
          <MapContainer
            center={[-15.7925, -47.8850]}
            zoom={14}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Quadras */}
            {visibleLayers.quadras && scsQuadras.features.map(quadra => (
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

            {/* Comércios Abertos à Noite */}
            {visibleLayers.abertosNoite && comerciosFiltrados.filter(c => c.abertoNoite).map(comercio => (
              <Marker
                key={comercio.id}
                position={[comercio.coordenadas[1], comercio.coordenadas[0]]}
                icon={markerIcons.comercioAtivo('#f97316', true)}
              >
                <Popup>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{comercio.nome}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{getTipoNome(comercio.tipo)}</p>
                    <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-semibold">
                      <FiMoon className="w-3 h-3" />
                      Aberto à noite
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Comércios Regulares */}
            {visibleLayers.comercios && comerciosFiltrados.filter(c => !c.abertoNoite && c.status === 'ativo').map(comercio => (
              <Marker
                key={comercio.id}
                position={[comercio.coordenadas[1], comercio.coordenadas[0]]}
                icon={markerIcons.comercioAtivo('#f59e0b', false)}
              >
                <Popup>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{comercio.nome}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{getTipoNome(comercio.tipo)}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Legenda */}
          <MapLegend
            title="Legenda do Mapa"
            items={[
              {
                id: 'abertosNoite',
                label: 'Abertos à Noite',
                color: '#f97316',
                icon: <FiMoon className="w-4 h-4" />,
                count: comerciosFiltrados.filter(c => c.abertoNoite).length,
                visible: visibleLayers.abertosNoite
              },
              {
                id: 'comercios',
                label: 'Comércios Ativos',
                color: '#f59e0b',
                icon: <FiShoppingBag className="w-4 h-4" />,
                count: comerciosFiltrados.filter(c => !c.abertoNoite && c.status === 'ativo').length,
                visible: visibleLayers.comercios
              },
              {
                id: 'quadras',
                label: 'Quadras SCS',
                color: '#ef4444',
                icon: <FiMapPin className="w-4 h-4" />,
                count: scsQuadras.features.length,
                visible: visibleLayers.quadras
              }
            ]}
            onToggleItem={(itemId, visible) => {
              setVisibleLayers(prev => ({ ...prev, [itemId]: visible }))
            }}
          />
        </div>

        {/* Lista de Comércios */}
        <div className="overflow-auto">
          <div className="space-y-4">
            {comerciosFiltrados.map(comercio => (
              <div
                key={comercio.id}
                onClick={() => {
                  setSelectedComercio(comercio)
                  setIsModalOpen(true)
                }}
                className="rounded-2xl overflow-hidden border-2 border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-orange-500 cursor-pointer"
              >
                {/* Imagem do Comércio */}
                {comercio.imagem && (
                  <div className="relative h-40 w-full overflow-hidden">
                    <img 
                      src={comercio.imagem} 
                      alt={comercio.nome}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'
                      }}
                    />
                    {/* Badge sobre a imagem */}
                    {comercio.badgeAbertoNoite && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="primary" size="sm">
                          <FiMoon className="w-3 h-3" />
                          Aberto à noite
                        </Badge>
                      </div>
                    )}
                    {/* Overlay escuro sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{comercio.nome}</h3>
                      <Badge variant="outline" size="sm">
                        {getTipoNome(comercio.tipo)}
                      </Badge>
                    </div>
                    {comercio.badgeAbertoNoite && !comercio.imagem && (
                      <Badge variant="primary" size="sm">
                        <FiMoon className="w-3 h-3" />
                        Aberto à noite
                      </Badge>
                    )}
                  </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <FiMapPin className="w-4 h-4 text-orange-500" />
                    <span>{comercio.endereco}</span>
                  </div>
                  {comercio.telefone && (
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <FiPhone className="w-4 h-4 text-orange-500" />
                      <span>{comercio.telefone}</span>
                    </div>
                  )}
                  {comercio.horarioFuncionamento && (
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <FiClock className="w-4 h-4 text-orange-500" />
                      <span>Seg-Sex: {comercio.horarioFuncionamento.segunda}</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{comercio.descricao}</p>

                {comercio.status === 'vazio' && (
                  <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                    <p className="text-sm text-blue-500 font-medium">
                      Imóvel disponível para locação
                      {comercio.tempoVazio && ` • Vazio há ${comercio.tempoVazio}`}
                    </p>
                  </div>
                )}
                </div>
              </div>
            ))}
          </div>

          {comerciosFiltrados.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 mb-4">
                <FiShoppingBag className="w-8 h-8 text-orange-500" />
              </div>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">
                Nenhum comércio encontrado com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalhes */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedComercio(null)
        }}
        item={selectedComercio}
        type="comercio"
      />
    </div>
  )
}

export default ComerciosAtivos

