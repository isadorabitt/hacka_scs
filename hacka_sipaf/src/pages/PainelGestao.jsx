import { useState, useMemo } from 'react'
import { FiBarChart2, FiTrendingUp, FiTrendingDown, FiAlertCircle, FiMapPin, FiCalendar, FiShield, FiHome } from 'react-icons/fi'
import { eventosMock } from '../data/scs-eventos-mock'
import { comerciosMock } from '../data/scs-comercios-mock'
import { alertasMock, padroesHistorico } from '../data/scs-alertas-mock'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function PainelGestao() {
  const [periodo, setPeriodo] = useState('semana')

  // Estatísticas gerais
  const estatisticas = useMemo(() => {
    const eventosPorQuadra = eventosMock.reduce((acc, evt) => {
      acc[evt.quadra] = (acc[evt.quadra] || 0) + 1
      return acc
    }, {})

    const comerciosAtivos = comerciosMock.filter(c => c.status === 'ativo').length
    const imoveisVazios = comerciosMock.filter(c => c.status === 'vazio').length
    const taxaOcupacao = ((comerciosAtivos / (comerciosAtivos + imoveisVazios)) * 100).toFixed(1)

    const alertasPorTipo = alertasMock.reduce((acc, alt) => {
      acc[alt.tipo] = (acc[alt.tipo] || 0) + 1
      return acc
    }, {})

    const engajamentoTotal = eventosMock.reduce((acc, evt) => {
      return acc + evt.engajamento.qrScans
    }, 0)

    return {
      eventosPorQuadra,
      comerciosAtivos,
      imoveisVazios,
      taxaOcupacao,
      alertasPorTipo,
      engajamentoTotal
    }
  }, [])

  // Dados para gráficos
  const dadosEventosQuadra = useMemo(() => {
    return Object.entries(estatisticas.eventosPorQuadra).map(([quadra, count]) => ({
      quadra: quadra.replace('scs-', 'SCS '),
      eventos: count
    }))
  }, [estatisticas])

  const dadosEngajamento = useMemo(() => {
    return eventosMock.map(evt => ({
      evento: evt.titulo.substring(0, 20) + '...',
      visualizacoes: evt.engajamento.visualizacoes,
      qrScans: evt.engajamento.qrScans,
      confirmacoes: evt.engajamento.confirmacoes
    }))
  }, [])

  // Recomendações de IA
  const recomendacoes = useMemo(() => {
    const recs = []
    
    // Análise de risco
    Object.entries(padroesHistorico).forEach(([quadra, padrao]) => {
      if (padrao.riscoNoturno === 'alto') {
        recs.push({
          tipo: 'seguranca',
          quadra: quadra.replace('scs-', 'SCS '),
          mensagem: 'Reforço policial recomendado durante eventos noturnos',
          prioridade: 'alta'
        })
      }
    })

    // Análise de ocupação
    if (parseFloat(estatisticas.taxaOcupacao) < 70) {
      recs.push({
        tipo: 'ocupacao',
        mensagem: 'Taxa de ocupação abaixo do ideal. Incentivar eventos culturais nas quadras 5 e 6',
        prioridade: 'media'
      })
    }

    // Análise de eventos
    const eventosNoturnos = eventosMock.filter(evt => parseInt(evt.horario.split(':')[0]) >= 18)
    if (eventosNoturnos.length > 0) {
      recs.push({
        tipo: 'eventos',
        mensagem: `${eventosNoturnos.length} evento(s) noturno(s) agendado(s). Verificar necessidade de iluminação adicional`,
        prioridade: 'media'
      })
    }

    return recs
  }, [estatisticas])

  return (
    <div className="h-full overflow-auto bg-white dark:bg-neutral-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-3">
            <FiBarChart2 className="text-orange-500" />
            Painel de Gestão com IA
          </h1>
          <p className="text-neutral-900 dark:text-white-muted">
            Apoiar decisões baseadas em dados reais do território
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-900 dark:text-white-muted">Eventos Ativos</span>
              <FiCalendar className="text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-neutral-900 dark:text-white">{eventosMock.length}</div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-500">
              <FiTrendingUp />
              <span>+12% esta semana</span>
            </div>
          </div>

          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-900 dark:text-white-muted">Taxa de Ocupação</span>
              <FiHome className="text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-neutral-900 dark:text-white">{estatisticas.taxaOcupacao}%</div>
            <div className="flex items-center gap-1 mt-2 text-sm text-neutral-900 dark:text-white-muted">
              <span>{estatisticas.comerciosAtivos} ativos / {estatisticas.imoveisVazios} vazios</span>
            </div>
          </div>

          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-900 dark:text-white-muted">Engajamento QR</span>
              <FiMapPin className="text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-neutral-900 dark:text-white">{estatisticas.engajamentoTotal}</div>
            <div className="flex items-center gap-1 mt-2 text-sm text-green-500">
              <FiTrendingUp />
              <span>Scans totais</span>
            </div>
          </div>

          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-900 dark:text-white-muted">Alertas de Segurança</span>
              <FiShield className="text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-neutral-900 dark:text-white">{alertasMock.length}</div>
            <div className="flex items-center gap-1 mt-2 text-sm text-red-500">
              <FiTrendingDown />
              <span>-5% esta semana</span>
            </div>
          </div>
        </div>

        {/* Recomendações de IA */}
        <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FiAlertCircle className="text-orange-500" />
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Recomendações de IA</h2>
            <span className="text-xs text-neutral-900 dark:text-white-muted">(A IA recomenda, nunca decide)</span>
          </div>
          <div className="space-y-3">
            {recomendacoes.map((rec, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${
                  rec.prioridade === 'alta'
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-yellow-500/10 border-yellow-500/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        rec.prioridade === 'alta'
                          ? 'bg-red-500/20 text-red-500'
                          : 'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {rec.prioridade === 'alta' ? 'Alta Prioridade' : 'Média Prioridade'}
                      </span>
                      {rec.quadra && (
                        <span className="px-2 py-1 rounded text-xs bg-orange-500/20 text-orange-500">
                          {rec.quadra}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-900 dark:text-white">{rec.mensagem}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Eventos por Quadra */}
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Eventos por Quadra</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosEventosQuadra}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quadra" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="eventos" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Engajamento */}
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Engajamento por Evento</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosEngajamento}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="evento" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visualizacoes" stroke="#3B82F6" />
                <Line type="monotone" dataKey="qrScans" stroke="#F59E0B" />
                <Line type="monotone" dataKey="confirmacoes" stroke="#10B981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Integrações GDF */}
        <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Integrações Estratégicas com o GDF</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Agenda Oficial do GDF</h4>
              <p className="text-sm text-neutral-900 dark:text-white-muted">
                Sincronização automática de eventos institucionais (quando disponível)
              </p>
            </div>
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Administração Regional</h4>
              <p className="text-sm text-neutral-900 dark:text-white-muted">
                Validação de eventos, comércios e espaços públicos do SCS
              </p>
            </div>
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Dados Abertos do GDF</h4>
              <p className="text-sm text-neutral-900 dark:text-white-muted">
                Uso de bases públicas para enriquecer análises
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">SEI/GDF (Futuro)</h4>
              <p className="text-sm text-neutral-900 dark:text-white-muted">
                Registro interno de eventos de grande porte e solicitações de apoio
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PainelGestao

