import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { 
  FiShield, FiAlertTriangle, FiAlertCircle, FiAlertOctagon, FiMapPin, FiClock, 
  FiTrendingUp, FiTrendingDown, FiActivity, FiBarChart2, FiCheckCircle, FiXCircle,
  FiUsers, FiTarget, FiZap, FiInfo
} from 'react-icons/fi'
import { alertasMock, padroesHistorico } from '../data/scs-alertas-mock'
import scsQuadras from '../data/scs-quadras.js'
import { eventosMock } from '../data/scs-eventos-mock'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import MapLegend from '../components/map/MapLegend'
import { markerIcons } from '../components/map/CustomMarker'

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
  'assalto': '#DC143C',
  'outro': '#6B7280'
}

function SegurancaComunitaria() {
  const [tipoAlerta, setTipoAlerta] = useState('todos')
  const [mostrarPreditivo, setMostrarPreditivo] = useState(true)
  const [viewMode, setViewMode] = useState('dashboard') // dashboard, mapa, timeline
  const [visibleLayers, setVisibleLayers] = useState({
    alertasAtivos: true,
    alertasResolvidos: true,
    quadras: true,
    preditivo: true
  })

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
      const alertasNaQuadra = alertasMock.filter(a => a.quadra === quadra && (a.status === 'reportado' || a.status === 'em-atendimento')).length
      const riscoBase = padrao.riscoNoturno === 'alto' ? 0.7 : padrao.riscoNoturno === 'medio' ? 0.4 : 0.2
      const riscoAjustado = riscoBase + (eventosNaQuadra > 0 ? 0.1 : -0.1) + (alertasNaQuadra * 0.15)
      
      return {
        quadra,
        risco: Math.min(1, Math.max(0, riscoAjustado)),
        eventosAtivos: eventosNaQuadra,
        alertasAtivos: alertasNaQuadra,
        horarioCritico: padrao.horariosCriticos,
        correlacao: padrao.correlacaoEventos
      }
    })
  }, [])

  // Estatísticas detalhadas
  const estatisticas = useMemo(() => {
    const agora = new Date()
    const ultimos7Dias = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000)
    const ultimos30Dias = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000)
    
    const alertasUltimos7Dias = alertasMock.filter(a => new Date(a.data) >= ultimos7Dias)
    const alertasUltimos30Dias = alertasMock.filter(a => new Date(a.data) >= ultimos30Dias)
    const alertasResolvidos = alertasMock.filter(a => a.status === 'resolvido')
    const alertasAtivos = alertasMock.filter(a => a.status === 'reportado' || a.status === 'em-atendimento')
    const alertasVerificados = alertasMock.filter(a => a.verificado)
    
    // Tempo médio de resposta (simulado)
    const temposResposta = alertasResolvidos.map(a => {
      const dataAlerta = new Date(a.data)
      const dataResolucao = new Date(dataAlerta.getTime() + Math.random() * 4 * 60 * 60 * 1000) // 0-4 horas
      return (dataResolucao - dataAlerta) / (1000 * 60) // em minutos
    })
    const tempoMedioResposta = temposResposta.length > 0 
      ? Math.round(temposResposta.reduce((a, b) => a + b, 0) / temposResposta.length)
      : 0

    // Distribuição por tipo
    const porTipo = alertasMock.reduce((acc, a) => {
      acc[a.tipo] = (acc[a.tipo] || 0) + 1
      return acc
    }, {})

    // Distribuição por quadra
    const porQuadra = alertasMock.reduce((acc, a) => {
      acc[a.quadra] = (acc[a.quadra] || 0) + 1
      return acc
    }, {})

    // Distribuição por horário
    const porHorario = alertasMock.reduce((acc, a) => {
      const hora = new Date(a.data).getHours()
      const faixa = Math.floor(hora / 4) * 4 // 0-3, 4-7, 8-11, etc
      acc[faixa] = (acc[faixa] || 0) + 1
      return acc
    }, {})

    // Taxa de resolução
    const taxaResolucao = alertasMock.length > 0 
      ? ((alertasResolvidos.length / alertasMock.length) * 100).toFixed(1)
      : 0

    // Índice de segurança geral (baseado em múltiplos fatores)
    const riscoMedio = riscoPreditivo.reduce((acc, r) => acc + r.risco, 0) / riscoPreditivo.length
    const indiceSeguranca = Math.round((1 - riscoMedio) * 100)

    return {
      total: alertasMock.length,
      ultimos7Dias: alertasUltimos7Dias.length,
      ultimos30Dias: alertasUltimos30Dias.length,
      resolvidos: alertasResolvidos.length,
      ativos: alertasAtivos.length,
      verificados: alertasVerificados.length,
      tempoMedioResposta,
      taxaResolucao,
      indiceSeguranca,
      porTipo,
      porQuadra,
      porHorario
    }
  }, [riscoPreditivo])

  // Dados para gráficos
  const dadosPorTipo = useMemo(() => {
    return Object.entries(estatisticas.porTipo).map(([tipo, count]) => ({
      name: tipo === 'atividade-suspeita' ? 'Atividade Suspeita' : 
            tipo === 'ameaca' ? 'Ameaça' : 
            tipo === 'assalto' ? 'Assalto' : 'Outro',
      value: count
    }))
  }, [estatisticas])

  const dadosPorQuadra = useMemo(() => {
    return Object.entries(estatisticas.porQuadra).map(([quadra, count]) => ({
      quadra: quadra.replace('scs-', 'SCS '),
      alertas: count
    }))
  }, [estatisticas])

  const dadosPorHorario = useMemo(() => {
    return Object.entries(estatisticas.porHorario)
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
      .map(([horario, count]) => ({
        horario: `${horario}h-${parseInt(horario) + 4}h`,
        alertas: count
      }))
  }, [estatisticas])

  const dadosTendencia = useMemo(() => {
    // Simular tendência dos últimos 7 dias
    return Array.from({ length: 7 }, (_, i) => {
      const data = new Date()
      data.setDate(data.getDate() - (6 - i))
      const alertasDoDia = alertasMock.filter(a => {
        const dataAlerta = new Date(a.data)
        return dataAlerta.toDateString() === data.toDateString()
      }).length
      return {
        dia: data.toLocaleDateString('pt-BR', { weekday: 'short' }),
        alertas: alertasDoDia || Math.floor(Math.random() * 3)
      }
    })
  }, [])

  const getTipoNome = (tipo) => {
    const tipos = {
      'atividade-suspeita': 'Atividade Suspeita',
      'ameaca': 'Ameaça',
      'assalto': 'Assalto',
      'outro': 'Outro'
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

  const COLORS = ['#FFA500', '#FF6B6B', '#DC143C', '#6B7280']

  return (
    <div className="h-full flex flex-col bg-command-bg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-command-border flex-shrink-0">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-command-text mb-2 flex items-center gap-3">
              <FiShield className="text-command-accent" />
              Segurança Comunitária Inteligente
            </h1>
            <p className="text-command-text-muted">
              Sistema de monitoramento e análise preditiva de segurança urbana
            </p>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex gap-2">
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
        </div>

        {/* Botões Rápidos */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
          <button className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/30 transition-colors">
            <FiAlertTriangle className="w-5 h-5" />
            <span className="font-semibold text-sm">Atividade Suspeita</span>
          </button>
          <button className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-500 hover:bg-orange-500/30 transition-colors">
            <FiAlertCircle className="w-5 h-5" />
            <span className="font-semibold text-sm">Ameaça</span>
          </button>
          <button className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-500 hover:bg-red-500/30 transition-colors">
            <FiAlertOctagon className="w-5 h-5" />
            <span className="font-semibold text-sm">Assalto</span>
          </button>
          <button className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gray-500/20 border border-gray-500/30 text-gray-500 hover:bg-gray-500/30 transition-colors">
            <FiInfo className="w-5 h-5" />
            <span className="font-semibold text-sm">Outro</span>
          </button>
        </div>

        {/* Filtros */}
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          <select
            value={tipoAlerta}
            onChange={(e) => setTipoAlerta(e.target.value)}
            className="px-4 py-2 rounded-lg bg-command-surface border border-command-border text-command-text"
          >
            <option value="todos">Todos os Alertas</option>
            <option value="atividade-suspeita">Atividade Suspeita</option>
            <option value="ameaca">Ameaça</option>
            <option value="assalto">Assalto</option>
            <option value="outro">Outro</option>
          </select>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={mostrarPreditivo}
              onChange={(e) => setMostrarPreditivo(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-command-text">Mostrar Mapa Preditivo</span>
          </label>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {viewMode === 'dashboard' ? (
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Índice de Segurança */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-command-text-muted">Índice de Segurança</span>
                  <FiShield className="w-5 h-5 text-command-accent" />
                </div>
                <div className="text-3xl font-black text-command-text mb-2">{estatisticas.indiceSeguranca}%</div>
                <div className="w-full h-2 bg-command-surface-alt rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-1000"
                    style={{ width: `${estatisticas.indiceSeguranca}%` }}
                  />
                </div>
                <p className="text-xs text-command-text-muted mt-2">Baseado em análise preditiva</p>
              </div>

              {/* Alertas Ativos */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-command-text-muted">Alertas Ativos</span>
                  <FiAlertTriangle className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-3xl font-black text-command-text mb-2">{estatisticas.ativos}</div>
                <div className="flex items-center gap-2 text-xs">
                  <FiTrendingDown className="w-4 h-4 text-green-500" />
                  <span className="text-command-text-muted">-12% vs. semana anterior</span>
                </div>
              </div>

              {/* Taxa de Resolução */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-command-text-muted">Taxa de Resolução</span>
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl font-black text-command-text mb-2">{estatisticas.taxaResolucao}%</div>
                <div className="flex items-center gap-2 text-xs">
                  <FiTrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-command-text-muted">{estatisticas.resolvidos} de {estatisticas.total} resolvidos</span>
                </div>
              </div>

              {/* Tempo Médio de Resposta */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-command-text-muted">Tempo Médio Resposta</span>
                  <FiClock className="w-5 h-5 text-command-accent" />
                </div>
                <div className="text-3xl font-black text-command-text mb-2">
                  {Math.floor(estatisticas.tempoMedioResposta / 60)}h {estatisticas.tempoMedioResposta % 60}min
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <FiTrendingDown className="w-4 h-4 text-green-500" />
                  <span className="text-command-text-muted">Melhorando</span>
                </div>
              </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tendência dos últimos 7 dias */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                  <FiActivity className="w-5 h-5 text-command-accent" />
                  Tendência de Alertas (7 dias)
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={dadosTendencia}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="dia" stroke="var(--color-text-muted)" />
                    <YAxis stroke="var(--color-text-muted)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--color-surface)', 
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="alertas" 
                      stroke="#f97316" 
                      strokeWidth={2}
                      dot={{ fill: '#f97316', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Distribuição por Tipo */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                  <FiTarget className="w-5 h-5 text-command-accent" />
                  Distribuição por Tipo
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={dadosPorTipo}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dadosPorTipo.map((entry, index) => (
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

              {/* Alertas por Quadra */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                  <FiMapPin className="w-5 h-5 text-command-accent" />
                  Alertas por Quadra
                </h3>
                <ResponsiveContainer width="100%" height={250}>
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
                    <Bar dataKey="alertas" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Distribuição por Horário */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                  <FiClock className="w-5 h-5 text-command-accent" />
                  Horários Críticos
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dadosPorHorario}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="horario" stroke="var(--color-text-muted)" />
                    <YAxis stroke="var(--color-text-muted)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--color-surface)', 
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)'
                      }} 
                    />
                    <Bar dataKey="alertas" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Análise por Quadra */}
            <div className="bg-command-surface rounded-xl p-6 border border-command-border">
              <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                <FiZap className="w-5 h-5 text-command-accent" />
                Análise Preditiva por Quadra
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {riscoPreditivo.map(risco => {
                  const quadraNome = risco.quadra.replace('scs-', 'SCS Quadra ')
                  const riscoPercent = (risco.risco * 100).toFixed(0)
                  const corRisco = risco.risco > 0.6 ? 'text-red-500' : risco.risco > 0.3 ? 'text-orange-500' : 'text-green-500'
                  
                  return (
                    <div key={risco.quadra} className="bg-command-surface-alt rounded-lg p-4 border border-command-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-command-text">{quadraNome}</span>
                        <span className={`text-lg font-black ${corRisco}`}>{riscoPercent}%</span>
                      </div>
                      <div className="w-full h-2 bg-command-surface rounded-full overflow-hidden mb-2">
                        <div 
                          className={`h-full transition-all ${
                            risco.risco > 0.6 ? 'bg-red-500' : 
                            risco.risco > 0.3 ? 'bg-orange-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${riscoPercent}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-4 text-xs text-command-text-muted">
                        <span>Eventos: {risco.eventosAtivos}</span>
                        <span>Alertas: {risco.alertasAtivos}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Lista de Alertas Recentes */}
            <div className="bg-command-surface rounded-xl p-6 border border-command-border">
              <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                <FiAlertTriangle className="w-5 h-5 text-command-accent" />
                Alertas Recentes
              </h3>
              <div className="space-y-3">
                {alertasFiltrados.slice(0, 5).map(alerta => (
                  <div
                    key={alerta.id}
                    className="bg-command-surface-alt rounded-lg p-4 border border-command-border hover:border-command-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${coresAlerta[alerta.tipo]}/20` }}
                        >
                          {alerta.tipo === 'atividade-suspeita' && <FiAlertTriangle className="w-5 h-5" style={{ color: coresAlerta[alerta.tipo] }} />}
                          {alerta.tipo === 'ameaca' && <FiAlertCircle className="w-5 h-5" style={{ color: coresAlerta[alerta.tipo] }} />}
                          {alerta.tipo === 'assalto' && <FiAlertOctagon className="w-5 h-5" style={{ color: coresAlerta[alerta.tipo] }} />}
                          {alerta.tipo === 'outro' && <FiInfo className="w-5 h-5" style={{ color: coresAlerta[alerta.tipo] }} />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-command-text">{getTipoNome(alerta.tipo)}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alerta.status)}`}>
                              {getStatusNome(alerta.status)}
                            </span>
                            {alerta.verificado && (
                              <FiCheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-command-text-muted mb-2">{alerta.descricao}</p>
                          <div className="flex items-center gap-4 text-xs text-command-text-muted">
                            <span className="flex items-center gap-1">
                              <FiMapPin className="w-3 h-3" />
                              {alerta.quadra.replace('scs-', 'Quadra ')}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiClock className="w-3 h-3" />
                              {new Date(alerta.data).toLocaleString('pt-BR')}
                            </span>
                          </div>
                        </div>
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
                
                {/* Quadras com Risco Preditivo */}
                {visibleLayers.preditivo && mostrarPreditivo && visibleLayers.quadras && scsQuadras.features.map(quadra => {
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
                          <h3 className="text-lg font-bold text-command-text">{quadra.properties.nome}</h3>
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
                            <p className="text-xs text-command-text-muted">
                              {risco.eventosAtivos} evento(s) ativo(s)
                            </p>
                          )}
                          {risco?.alertasAtivos > 0 && (
                            <p className="text-xs text-command-text-muted">
                              {risco.alertasAtivos} alerta(s) ativo(s)
                            </p>
                          )}
                        </div>
                      </Popup>
                    </Polygon>
                  )
                })}

                {/* Alertas Ativos */}
                {visibleLayers.alertasAtivos && alertasFiltrados.filter(a => a.status === 'ativo').map(alerta => (
                  <Marker
                    key={alerta.id}
                    position={[alerta.coordenadas[1], alerta.coordenadas[0]]}
                    icon={markerIcons.alertaAtivo(coresAlerta[alerta.tipo] || '#ef4444', true)}
                  >
                    <Popup>
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-bold text-command-text flex-1">{getTipoNome(alerta.tipo)}</h3>
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                            {getStatusNome(alerta.status)}
                          </span>
                        </div>
                        <p className="text-sm text-command-text-muted">{alerta.descricao}</p>
                        <p className="text-xs text-command-text-muted">
                          {new Date(alerta.data).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Alertas Resolvidos */}
                {visibleLayers.alertasResolvidos && alertasFiltrados.filter(a => a.status === 'resolvido').map(alerta => (
                  <Marker
                    key={alerta.id}
                    position={[alerta.coordenadas[1], alerta.coordenadas[0]]}
                    icon={markerIcons.alertaResolvido('#10b981')}
                  >
                    <Popup>
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-bold text-command-text flex-1">{getTipoNome(alerta.tipo)}</h3>
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                            {getStatusNome(alerta.status)}
                          </span>
                        </div>
                        <p className="text-sm text-command-text-muted">{alerta.descricao}</p>
                        <p className="text-xs text-command-text-muted">
                          {new Date(alerta.data).toLocaleString('pt-BR')}
                        </p>
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
                    id: 'alertasAtivos',
                    label: 'Alertas Ativos',
                    color: '#ef4444',
                    icon: <FiAlertTriangle className="w-4 h-4" />,
                    count: alertasFiltrados.filter(a => a.status === 'ativo').length,
                    visible: visibleLayers.alertasAtivos
                  },
                  {
                    id: 'alertasResolvidos',
                    label: 'Alertas Resolvidos',
                    color: '#10b981',
                    icon: <FiCheckCircle className="w-4 h-4" />,
                    count: alertasFiltrados.filter(a => a.status === 'resolvido').length,
                    visible: visibleLayers.alertasResolvidos
                  },
                  {
                    id: 'preditivo',
                    label: 'Análise Preditiva',
                    color: '#FFA500',
                    icon: <FiZap className="w-4 h-4" />,
                    count: riscoPreditivo.length,
                    visible: visibleLayers.preditivo && mostrarPreditivo
                  },
                  {
                    id: 'quadras',
                    label: 'Quadras SCS',
                    color: '#6b7280',
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

            {/* Lista de Alertas */}
            <div className="overflow-auto">
              <div className="space-y-4">
                {alertasFiltrados.map(alerta => (
                  <div
                    key={alerta.id}
                    className="bg-command-surface rounded-xl p-6 border border-command-border"
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
                          {alerta.tipo === 'outro' && <FiInfo className="w-6 h-6" style={{ color: coresAlerta[alerta.tipo] }} />}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-command-text">{getTipoNome(alerta.tipo)}</h3>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(alerta.status)}`}>
                            {getStatusNome(alerta.status)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-command-text-muted mb-4">{alerta.descricao}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-command-text-muted">
                        <FiMapPin className="text-command-accent" />
                        <span>Quadra {alerta.quadra.replace('scs-', '')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-command-text-muted">
                        <FiClock className="text-command-accent" />
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
                  <p className="text-command-text-muted">Nenhum alerta encontrado.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SegurancaComunitaria
