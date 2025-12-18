import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { 
  FiHome, FiMapPin, FiCalendar, FiTrendingUp, FiFilter, FiDollarSign, 
  FiBarChart2, FiZap, FiTarget, FiClock, FiUsers, FiShield, FiCheckCircle,
  FiAlertCircle, FiInfo, FiMail, FiPhone, FiArrowRight, FiTrendingDown
} from 'react-icons/fi'
import { imoveisVaziosMock, espacosPublicosMock, analiseMercado } from '../data/scs-vacancia-mock'
import { eventosMock } from '../data/scs-eventos-mock'
import scsQuadras from '../data/scs-quadras.js'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import PageHeader from '../components/ui/PageHeader'
import MapLegend from '../components/map/MapLegend'
import { markerIcons } from '../components/map/CustomMarker'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

function VacanciaReativacao() {
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [filtroQuadra, setFiltroQuadra] = useState('todas')
  const [viewMode, setViewMode] = useState('dashboard') // dashboard, mapa
  const [visibleLayers, setVisibleLayers] = useState({
    imoveisVazios: true,
    espacosPublicos: true,
    quadras: true
  })

  const itensFiltrados = useMemo(() => {
    const todos = [...imoveisVaziosMock, ...espacosPublicosMock]
    return todos.filter(item => {
      const isVazio = imoveisVaziosMock.some(v => v.id === item.id)
      const isPublico = espacosPublicosMock.some(p => p.id === item.id)
      
      const matchTipo = filtroTipo === 'todos' || 
        (filtroTipo === 'vazio' && isVazio) ||
        (filtroTipo === 'publico' && isPublico)
      const matchQuadra = filtroQuadra === 'todas' || item.quadra === filtroQuadra
      return matchTipo && matchQuadra
    })
  }, [filtroTipo, filtroQuadra])

  // Estatísticas avançadas
  const estatisticas = useMemo(() => {
    const totalVazios = imoveisVaziosMock.length
    const totalPublicos = espacosPublicosMock.length
    const espacosPublicos = totalPublicos
    const areaTotalVazia = imoveisVaziosMock.reduce((acc, item) => acc + item.area, 0)
    const valorTotalPerdido = imoveisVaziosMock.reduce((acc, item) => acc + (item.valorAluguel || 0), 0)
    const tempoMedioVazio = imoveisVaziosMock.reduce((acc, item) => {
      const meses = parseInt(item.tempoVazio.replace(' meses', ''))
      return acc + meses
    }, 0) / totalVazios

    // Análise por potencial
    const altoPotencial = imoveisVaziosMock.filter(i => i.potencialReativacao === 'muito-alto' || i.potencialReativacao === 'alto').length
    const medioPotencial = imoveisVaziosMock.filter(i => i.potencialReativacao === 'medio').length

    // Eventos que podem usar espaços públicos
    const eventosDisponiveis = eventosMock.filter(evt => 
      evt.quadra === 'scs-5' || evt.quadra === 'scs-6'
    )

    return {
      totalVazios,
      totalPublicos,
      areaTotalVazia,
      valorTotalPerdido,
      tempoMedioVazio: tempoMedioVazio.toFixed(1),
      altoPotencial,
      medioPotencial,
      eventosDisponiveis: eventosDisponiveis.length,
      taxaOcupacaoGeral: ((1 - (totalVazios / (totalVazios + 50))) * 100).toFixed(1), // Simulado
      espacosPublicos: espacosPublicosMock.length
    }
  }, [])

  // Dados para gráficos
  const dadosPorQuadra = useMemo(() => {
    return Object.entries(analiseMercado).map(([quadra, dados]) => ({
      quadra: quadra.replace('scs-', 'SCS '),
      taxaVacancia: dados.taxaVacancia,
      valorMedio: dados.valorMedioM2
    }))
  }, [])

  const dadosTendencia = useMemo(() => {
    return imoveisVaziosMock.map(item => ({
      nome: item.nome.substring(0, 15) + '...',
      meses: parseInt(item.tempoVazio.replace(' meses', '')),
      valor: item.valorAluguel || 0
    }))
  }, [])

  const dadosPotencial = useMemo(() => {
    const muitoAlto = imoveisVaziosMock.filter(i => i.potencialReativacao === 'muito-alto').length
    const alto = imoveisVaziosMock.filter(i => i.potencialReativacao === 'alto').length
    const medio = imoveisVaziosMock.filter(i => i.potencialReativacao === 'medio').length
    
    return [
      { name: 'Muito Alto', value: muitoAlto },
      { name: 'Alto', value: alto },
      { name: 'Médio', value: medio }
    ]
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

  const getPotencialColor = (potencial) => {
    const cores = {
      'muito-alto': 'from-green-500 to-emerald-600',
      'alto': 'from-teal-500 to-cyan-600',
      'medio': 'from-orange-500 to-amber-600',
      'baixo': 'from-red-500 to-pink-600'
    }
    return cores[potencial] || 'from-gray-500 to-gray-600'
  }

  const getPotencialLabel = (potencial) => {
    const labels = {
      'muito-alto': 'Muito Alto',
      'alto': 'Alto',
      'medio': 'Médio',
      'baixo': 'Baixo'
    }
    return labels[potencial] || potencial
  }

  const COLORS = ['#10b981', '#14b8a6', '#f59e0b']

  return (
    <div className="h-full flex flex-col bg-command-bg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-command-border flex-shrink-0">
        <PageHeader
          icon={FiHome}
          title="Vacância e Reativação de Espaços"
          subtitle="Reduzir imóveis ociosos e estimular ocupação temporária e permanente"
        />

        {/* View Mode Toggle */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setViewMode('dashboard')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              viewMode === 'dashboard' 
                ? 'bg-command-accent text-white' 
                : 'bg-command-surface text-command-text hover:bg-command-surface-alt'
            }`}
          >
            <FiBarChart2 className="inline w-4 h-4 mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setViewMode('mapa')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              viewMode === 'mapa' 
                ? 'bg-command-accent text-white' 
                : 'bg-command-surface text-command-text hover:bg-command-surface-alt'
            }`}
          >
            <FiMapPin className="inline w-4 h-4 mr-2" />
            Mapa
          </button>
        </div>

        {/* Filtros */}
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-command-text mb-2">
              Tipo
            </label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-command-surface border border-command-border text-command-text focus:outline-none focus:ring-2 focus:ring-command-accent"
            >
              <option value="todos">Todos</option>
              <option value="vazio">Imóveis Vazios</option>
              <option value="publico">Espaços Públicos</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-command-text mb-2">
              Quadra
            </label>
            <select
              value={filtroQuadra}
              onChange={(e) => setFiltroQuadra(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-command-surface border border-command-border text-command-text focus:outline-none focus:ring-2 focus:ring-command-accent"
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {viewMode === 'dashboard' ? (
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Imóveis Vazios */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-command-text-muted">Imóveis Vazios</span>
                  <FiHome className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-3xl font-black text-command-text mb-2">{estatisticas.totalVazios}</div>
                <div className="flex items-center gap-2 text-xs">
                  <FiTrendingDown className="w-4 h-4 text-green-500" />
                  <span className="text-command-text-muted">-2 este mês</span>
                </div>
              </div>

              {/* Área Total Vazia */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-command-text-muted">Área Total Vazia</span>
                  <FiBarChart2 className="w-5 h-5 text-command-accent" />
                </div>
                <div className="text-3xl font-black text-command-text mb-2">{estatisticas.areaTotalVazia} m²</div>
                <div className="text-xs text-command-text-muted">Potencial de ocupação</div>
              </div>

              {/* Valor Perdido Mensal */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-command-text-muted">Valor Perdido/Mês</span>
                  <FiDollarSign className="w-5 h-5 text-red-500" />
                </div>
                <div className="text-3xl font-black text-command-text mb-2">
                  R$ {estatisticas.valorTotalPerdido.toLocaleString('pt-BR')}
                </div>
                <div className="text-xs text-command-text-muted">Em aluguéis não arrecadados</div>
              </div>

              {/* Tempo Médio Vazio */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-command-text-muted">Tempo Médio Vazio</span>
                  <FiClock className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-3xl font-black text-command-text mb-2">{estatisticas.tempoMedioVazio} meses</div>
                <div className="text-xs text-command-text-muted">Média de vacância</div>
              </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Taxa de Vacância por Quadra */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                  <FiBarChart2 className="w-5 h-5 text-command-accent" />
                  Taxa de Vacância por Quadra
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dadosPorQuadra}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="quadra" stroke="var(--color-text-muted)" />
                    <YAxis stroke="var(--color-text-muted)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--color-surface)', 
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)'
                      }} 
                    />
                    <Bar dataKey="taxaVacancia" fill="#ef4444" name="Taxa de Vacância (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Potencial de Reativação */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                  <FiZap className="w-5 h-5 text-command-accent" />
                  Potencial de Reativação
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dadosPotencial}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dadosPotencial.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--color-surface)', 
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Tempo de Vacância vs Valor */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                  <FiTrendingUp className="w-5 h-5 text-command-accent" />
                  Tempo de Vacância vs Valor
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dadosTendencia}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="nome" stroke="var(--color-text-muted)" />
                    <YAxis yAxisId="left" stroke="var(--color-text-muted)" />
                    <YAxis yAxisId="right" orientation="right" stroke="var(--color-text-muted)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--color-surface)', 
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)'
                      }} 
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="meses" 
                      stroke="#f97316" 
                      strokeWidth={2}
                      name="Meses Vazio"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="valor" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Valor Aluguel (R$)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Análise de Mercado */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                  <FiTarget className="w-5 h-5 text-command-accent" />
                  Análise de Mercado por Quadra
                </h3>
                <div className="space-y-3">
                  {Object.entries(analiseMercado).map(([quadra, dados]) => (
                    <div key={quadra} className="bg-command-surface-alt rounded-lg p-4 border border-command-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-command-text">{quadra.replace('scs-', 'SCS Quadra ')}</span>
                        <span className={`text-sm font-bold ${
                          dados.tendencia === 'crescimento' ? 'text-green-500' :
                          dados.tendencia === 'estavel' ? 'text-yellow-500' :
                          'text-red-500'
                        }`}>
                          {dados.tendencia === 'crescimento' ? '↑' : dados.tendencia === 'estavel' ? '→' : '↓'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-command-text-muted">Vacância: </span>
                          <span className="font-semibold text-command-text">{dados.taxaVacancia}%</span>
                        </div>
                        <div>
                          <span className="text-command-text-muted">Valor/m²: </span>
                          <span className="font-semibold text-command-text">R$ {dados.valorMedioM2.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-command-text-muted">Demanda: </span>
                          <span className={`font-semibold ${
                            dados.demanda === 'alta' ? 'text-green-500' :
                            dados.demanda === 'media' ? 'text-yellow-500' :
                            'text-red-500'
                          }`}>
                            {dados.demanda.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <span className="text-command-text-muted">Oportunidades: </span>
                          <span className="font-semibold text-command-text">{dados.oportunidades.length}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lista de Imóveis Vazios */}
            <div className="bg-command-surface rounded-xl p-6 border border-command-border">
              <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                <FiHome className="w-5 h-5 text-command-accent" />
                Imóveis Vazios Disponíveis
              </h3>
              <div className="space-y-4">
                {imoveisVaziosMock.map(imovel => (
                  <div
                    key={imovel.id}
                    className="bg-command-surface-alt rounded-xl overflow-hidden border border-command-border hover:border-command-accent/50 transition-all"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                      {/* Imagem */}
                      <div className="relative h-48 md:h-full overflow-hidden rounded-lg">
                        <img
                          src={imovel.imagem}
                          alt={imovel.nome}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-blue-500/90 backdrop-blur-sm text-white text-xs font-bold">
                          Imóvel Vazio
                        </div>
                        <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getPotencialColor(imovel.potencialReativacao)}`}>
                          Potencial: {getPotencialLabel(imovel.potencialReativacao)}
                        </div>
                      </div>

                      {/* Informações */}
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <h4 className="text-xl font-black text-command-text mb-2">{imovel.nome}</h4>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-command-text-muted mb-3">
                            <span className="flex items-center gap-1">
                              <FiMapPin className="w-4 h-4" />
                              {imovel.endereco}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiHome className="w-4 h-4" />
                              {getQuadraNome(imovel.quadra)}
                            </span>
                          </div>
                          <p className="text-sm text-command-text-muted">{imovel.descricao}</p>
                        </div>

                        {/* Métricas */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="bg-command-surface rounded-lg p-3 border border-command-border">
                            <div className="text-xs text-command-text-muted mb-1">Área</div>
                            <div className="text-lg font-black text-command-text">{imovel.area} m²</div>
                          </div>
                          <div className="bg-command-surface rounded-lg p-3 border border-command-border">
                            <div className="text-xs text-command-text-muted mb-1">Aluguel</div>
                            <div className="text-lg font-black text-command-text">R$ {imovel.valorAluguel.toLocaleString('pt-BR')}</div>
                          </div>
                          <div className="bg-command-surface rounded-lg p-3 border border-command-border">
                            <div className="text-xs text-command-text-muted mb-1">R$/m²</div>
                            <div className="text-lg font-black text-command-text">R$ {imovel.valorAluguelM2.toFixed(2)}</div>
                          </div>
                          <div className="bg-command-surface rounded-lg p-3 border border-command-border">
                            <div className="text-xs text-command-text-muted mb-1">Vazio há</div>
                            <div className="text-lg font-black text-command-text">{imovel.tempoVazio}</div>
                          </div>
                        </div>

                        {/* Sugestões de Uso */}
                        <div>
                          <div className="text-xs font-semibold text-command-text-muted mb-2">Sugestões de Uso (IA):</div>
                          <div className="flex flex-wrap gap-2">
                            {imovel.sugestoesUso.map((sugestao, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 rounded-full text-xs bg-command-accent/20 text-command-accent border border-command-accent/30 font-semibold"
                              >
                                {sugestao}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Condições */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {Object.entries(imovel.condicoes).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2">
                              <FiCheckCircle className={`w-4 h-4 ${
                                value === 'excelente' ? 'text-green-500' :
                                value === 'boa' ? 'text-teal-500' :
                                'text-yellow-500'
                              }`} />
                              <div>
                                <div className="text-xs text-command-text-muted capitalize">{key}</div>
                                <div className="text-xs font-semibold text-command-text capitalize">{value}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Contato */}
                        <div className="flex items-center gap-4 pt-3 border-t border-command-border">
                          <div className="flex-1">
                            <div className="text-xs text-command-text-muted mb-1">Contato</div>
                            <div className="text-sm font-semibold text-command-text">{imovel.contato.proprietario}</div>
                            <div className="flex items-center gap-3 text-xs text-command-text-muted mt-1">
                              <span className="flex items-center gap-1">
                                <FiPhone className="w-3 h-3" />
                                {imovel.contato.telefone}
                              </span>
                              <span className="flex items-center gap-1">
                                <FiMail className="w-3 h-3" />
                                {imovel.contato.email}
                              </span>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-command-accent text-white rounded-lg font-semibold hover:bg-command-accent-hover transition-colors flex items-center gap-2">
                            <span>Ver Detalhes</span>
                            <FiArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Espaços Públicos */}
            <div className="bg-command-surface rounded-xl p-6 border border-command-border">
              <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                <FiCalendar className="w-5 h-5 text-command-accent" />
                Espaços Públicos Disponíveis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {espacosPublicosMock.map(espaco => (
                  <div
                    key={espaco.id}
                    className="bg-command-surface-alt rounded-xl overflow-hidden border border-command-border hover:border-command-accent/50 transition-all"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={espaco.imagem}
                        alt={espaco.nome}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold">
                        Espaço Público
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-black text-command-text mb-2">{espaco.nome}</h4>
                      <div className="flex items-center gap-2 text-sm text-command-text-muted mb-3">
                        <FiMapPin className="w-4 h-4" />
                        {espaco.endereco}
                      </div>
                      <p className="text-sm text-command-text-muted mb-4">{espaco.descricao}</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                          <div className="text-xs text-command-text-muted">Área</div>
                          <div className="text-lg font-black text-command-text">{espaco.area} m²</div>
                        </div>
                        <div>
                          <div className="text-xs text-command-text-muted">Capacidade</div>
                          <div className="text-lg font-black text-command-text">{espaco.capacidade} pessoas</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-xs font-semibold text-command-text-muted mb-2">Tipos de Eventos:</div>
                        <div className="flex flex-wrap gap-2">
                          {espaco.tipoEventos.map((tipo, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500 border border-green-500/30"
                            >
                              {tipo}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-command-border">
                        <div className="text-xs text-command-text-muted mb-1">Contato</div>
                        <div className="text-sm font-semibold text-command-text">{espaco.contato.responsavel}</div>
                        <div className="text-xs text-command-text-muted mt-1">{espaco.contato.telefone}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Mapa View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Mapa */}
            <div className="bg-command-surface rounded-xl border border-command-border overflow-hidden relative">
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
                        <h3 className="text-lg font-bold text-command-text">{quadra.properties.nome}</h3>
                        <p className="text-sm text-command-text-muted">{quadra.properties.descricao}</p>
                        {analiseMercado[quadra.properties.id] && (
                          <div className="mt-2 pt-2 border-t border-command-border">
                            <p className="text-xs text-command-text-muted">
                              Taxa de Vacância: {analiseMercado[quadra.properties.id].taxaVacancia}%
                            </p>
                            <p className="text-xs text-command-text-muted">
                              Valor médio: R$ {analiseMercado[quadra.properties.id].valorMedioM2.toFixed(2)}/m²
                            </p>
                          </div>
                        )}
                      </div>
                    </Popup>
                  </Polygon>
                ))}

                {/* Imóveis Vazios */}
                {visibleLayers.imoveisVazios && itensFiltrados.filter(item => imoveisVaziosMock.some(v => v.id === item.id)).map(item => (
                  <Marker
                    key={item.id}
                    position={[item.coordenadas[1], item.coordenadas[0]]}
                    icon={markerIcons.imovelVazio('#3b82f6')}
                  >
                    <Popup>
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-bold text-command-text flex-1">{item.nome}</h3>
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            Vazia
                          </span>
                        </div>
                        <p className="text-sm text-command-text-muted">{item.descricao}</p>
                        <div className="space-y-1 text-xs">
                          <p className="text-command-text-muted">Área: {item.area} m²</p>
                          <p className="text-command-text-muted">Aluguel: R$ {item.valorAluguel.toLocaleString('pt-BR')}</p>
                          <p className="text-command-text-muted">Vazio há: {item.tempoVazio}</p>
                          <p className={`font-semibold ${
                            item.potencialReativacao === 'muito-alto' || item.potencialReativacao === 'alto' 
                              ? 'text-green-500' 
                              : 'text-orange-500'
                          }`}>
                            Potencial: {getPotencialLabel(item.potencialReativacao)}
                          </p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Espaços Públicos */}
                {visibleLayers.espacosPublicos && itensFiltrados.filter(item => espacosPublicosMock.some(p => p.id === item.id)).map(item => (
                  <Marker
                    key={item.id}
                    position={[item.coordenadas[1], item.coordenadas[0]]}
                    icon={markerIcons.espacoPublico('#10b981')}
                  >
                    <Popup>
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-bold text-command-text flex-1">{item.nome}</h3>
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                            Público
                          </span>
                        </div>
                        <p className="text-sm text-command-text-muted">{item.descricao}</p>
                        <div className="space-y-1 text-xs">
                          <p className="text-command-text-muted">Área: {item.area} m²</p>
                          <p className="text-command-text-muted">Capacidade: {item.capacidade} pessoas</p>
                          <p className="text-command-text-muted">Disponível para eventos</p>
                        </div>
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
                    id: 'imoveisVazios',
                    label: 'Imóveis Vazios',
                    color: '#3b82f6',
                    icon: <FiHome className="w-4 h-4" />,
                    count: itensFiltrados.filter(item => imoveisVaziosMock.some(v => v.id === item.id)).length,
                    visible: visibleLayers.imoveisVazios
                  },
                  {
                    id: 'espacosPublicos',
                    label: 'Espaços Públicos',
                    color: '#10b981',
                    icon: <FiCalendar className="w-4 h-4" />,
                    count: itensFiltrados.filter(item => espacosPublicosMock.some(p => p.id === item.id)).length,
                    visible: visibleLayers.espacosPublicos
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

            {/* Lista */}
            <div className="overflow-auto">
              <div className="space-y-4">
                {itensFiltrados.map(item => {
                  const isVazio = imoveisVaziosMock.some(v => v.id === item.id)
                  
                  return (
                    <div
                      key={item.id}
                      className="bg-command-surface rounded-xl overflow-hidden border border-command-border"
                    >
                      {item.imagem && (
                        <div className="relative h-40 w-full overflow-hidden">
                          <img 
                            src={item.imagem} 
                            alt={item.nome}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full backdrop-blur-sm text-white text-xs font-semibold ${
                            isVazio ? 'bg-blue-500/90' : 'bg-green-500/90'
                          }`}>
                            {isVazio ? 'Imóvel Vazio' : 'Espaço Público'}
                          </div>
                        </div>
                      )}

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-command-text mb-2">{item.nome}</h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-command-text-muted">
                            <FiMapPin className="text-command-accent" />
                            <span>{item.endereco}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-command-text-muted">
                            <FiHome className="text-command-accent" />
                            <span>{getQuadraNome(item.quadra)}</span>
                          </div>
                        </div>

                        <p className="text-sm text-command-text-muted mb-4">{item.descricao}</p>

                        {isVazio && (
                          <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                              <p className="text-sm text-blue-500 font-medium mb-2">
                                Disponível para locação • Vazio há {item.tempoVazio}
                              </p>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <span className="text-command-text-muted">Área: </span>
                                  <span className="font-semibold text-command-text">{item.area} m²</span>
                                </div>
                                <div>
                                  <span className="text-command-text-muted">Aluguel: </span>
                                  <span className="font-semibold text-command-text">R$ {item.valorAluguel.toLocaleString('pt-BR')}</span>
                                </div>
                              </div>
                            </div>
                            {item.sugestoesUso && (
                              <div>
                                <div className="text-xs font-semibold text-command-text-muted mb-2">Sugestões de Uso:</div>
                                <div className="flex flex-wrap gap-2">
                                  {item.sugestoesUso.map((sugestao, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 rounded-full text-xs bg-command-accent/20 text-command-accent border border-command-accent/30"
                                    >
                                      {sugestao}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {!isVazio && item.disponivelParaEventos && (
                          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                            <p className="text-sm text-green-500 font-medium mb-2">
                              Disponível para eventos culturais
                            </p>
                            <div className="text-xs text-command-text-muted">
                              Capacidade: {item.capacidade} pessoas • Área: {item.area} m²
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {itensFiltrados.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-command-text-muted">Nenhum item encontrado com os filtros selecionados.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VacanciaReativacao
