import { useState, useMemo } from 'react'
import { FiShoppingBag, FiMapPin, FiClock, FiPhone, FiFilter, FiMoon } from 'react-icons/fi'
import { comerciosMock } from '../data/scs-comercios-mock'
import scsQuadras from '../data/scs-quadras.js'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'

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
    <div className="h-full flex flex-col bg-command-bg">
      <div className="p-6 border-b border-command-border">
        <h1 className="text-4xl font-bold text-command-text mb-2 flex items-center gap-3">
          <FiShoppingBag className="text-command-accent" />
          Comércios Ativos por Quadra
        </h1>
        <p className="text-command-text-muted">
          Combate a ideia de "zona morta" destacando comércios abertos, especialmente à noite
        </p>

        {/* Filtros */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-command-text-muted mb-2">
              Quadra
            </label>
            <select
              value={filtroQuadra}
              onChange={(e) => setFiltroQuadra(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-command-surface border border-command-border text-command-text"
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

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-command-text-muted mb-2">
              Tipo
            </label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-command-surface border border-command-border text-command-text"
            >
              <option value="todos">Todos os Tipos</option>
              <option value="bar">Bares</option>
              <option value="restaurante">Restaurantes</option>
              <option value="servico">Serviços</option>
              <option value="espaco-publico">Espaços Públicos</option>
              <option value="vazio">Imóveis Vazios</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={mostrarAbertosNoite}
                onChange={(e) => setMostrarAbertosNoite(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm text-command-text flex items-center gap-1">
                <FiMoon className="text-command-accent" />
                Abertos à noite
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Mapa e Lista */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-hidden">
        {/* Mapa */}
        <div className="bg-command-surface rounded-xl border border-command-border overflow-hidden">
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
                  <div>
                    <h3 className="font-bold">{quadra.properties.nome}</h3>
                    <p className="text-sm text-gray-600">{quadra.properties.descricao}</p>
                  </div>
                </Popup>
              </Polygon>
            ))}

            {/* Comércios */}
            {comerciosFiltrados.map(comercio => (
              <Marker
                key={comercio.id}
                position={[comercio.coordenadas[1], comercio.coordenadas[0]]}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{comercio.nome}</h3>
                    <p className="text-sm text-gray-600">{getTipoNome(comercio.tipo)}</p>
                    {comercio.abertoNoite && (
                      <span className="inline-block mt-2 px-2 py-1 rounded bg-amber-500/20 text-amber-500 text-xs font-semibold">
                        <FiMoon className="inline mr-1" />
                        Aberto à noite
                      </span>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Lista de Comércios */}
        <div className="overflow-auto">
          <div className="space-y-4">
            {comerciosFiltrados.map(comercio => (
              <div
                key={comercio.id}
                className="bg-command-surface rounded-xl overflow-hidden border border-command-border"
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
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-sm text-white text-xs font-semibold">
                        <FiMoon />
                        Aberto à noite
                      </div>
                    )}
                    {/* Overlay escuro sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-command-text mb-1">{comercio.nome}</h3>
                      <span className="inline-block px-3 py-1 rounded-full bg-command-accent/10 text-command-accent text-sm font-medium">
                        {getTipoNome(comercio.tipo)}
                      </span>
                    </div>
                    {comercio.badgeAbertoNoite && !comercio.imagem && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-xs font-semibold">
                        <FiMoon />
                        Aberto à noite
                      </span>
                    )}
                  </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-command-text-muted">
                    <FiMapPin className="text-command-accent" />
                    <span>{comercio.endereco}</span>
                  </div>
                  {comercio.telefone && (
                    <div className="flex items-center gap-2 text-sm text-command-text-muted">
                      <FiPhone className="text-command-accent" />
                      <span>{comercio.telefone}</span>
                    </div>
                  )}
                  {comercio.horarioFuncionamento && (
                    <div className="flex items-center gap-2 text-sm text-command-text-muted">
                      <FiClock className="text-command-accent" />
                      <span>Seg-Sex: {comercio.horarioFuncionamento.segunda}</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-command-text-muted mb-3">{comercio.descricao}</p>

                {comercio.status === 'vazio' && (
                  <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
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
            <div className="text-center py-12">
              <p className="text-command-text-muted">Nenhum comércio encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ComerciosAtivos

