import { useState, useMemo } from 'react'
import { 
  FiShare2, FiInstagram, FiMessageCircle, FiSend, FiCopy, FiCheck, 
  FiTrendingUp, FiTrendingDown, FiUsers, FiEye, FiMousePointer, FiClock,
  FiBarChart2, FiZap, FiCalendar, FiTarget, FiRefreshCw, FiSettings,
  FiCheckCircle, FiAlertCircle, FiInfo
} from 'react-icons/fi'
import { eventosMock } from '../data/scs-eventos-mock'
import { metricasCanais, historicoPublicacoes, templatesPersonalizados } from '../data/scs-comunicacao-mock'
import { toast } from 'react-hot-toast'
// PageHeader será criado inline para manter consistência com command-*
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

function ComunicacaoIntegrada() {
  const [eventoSelecionado, setEventoSelecionado] = useState(eventosMock[0])
  const [canalSelecionado, setCanalSelecionado] = useState('instagram')
  const [copiado, setCopiado] = useState({})
  const [viewMode, setViewMode] = useState('criar') // criar, analise, historico

  // Geração de conteúdo por IA para cada canal
  const conteudoPorCanal = useMemo(() => {
    const evento = eventoSelecionado
    const quadraNome = evento.quadra.replace('scs-', 'SCS Quadra ')
    const dataFormatada = new Date(evento.data).toLocaleDateString('pt-BR')
    
    return {
      instagram: {
        feed: {
          titulo: evento.titulo,
          legenda: `🎉 ${evento.titulo}\n\n${evento.descricao}\n\n📍 ${quadraNome}\n📅 ${dataFormatada}\n⏰ ${evento.horario}\n\n🔗 Link oficial: ${evento.qrCode}\n\n${metricasCanais.instagram.hashtagsSugeridas.join(' ')}`,
          hashtags: metricasCanais.instagram.hashtagsSugeridas
        },
        story: {
          texto: `${evento.titulo}\n\n${dataFormatada} às ${evento.horario}\n\n${quadraNome}`
        }
      },
      whatsapp: {
        mensagem: `*${evento.titulo}*\n\n${evento.descricao}\n\n📍 ${quadraNome}\n📅 ${dataFormatada}\n⏰ ${evento.horario}\n\n🔗 ${evento.qrCode}`
      },
      telegram: {
        titulo: evento.titulo,
        mensagem: `${evento.descricao}\n\n📍 ${quadraNome}\n📅 ${dataFormatada}\n⏰ ${evento.horario}\n\n🔗 ${evento.qrCode}`
      }
    }
  }, [eventoSelecionado])

  // Estatísticas consolidadas
  const estatisticas = useMemo(() => {
    const totalAlcance = historicoPublicacoes.reduce((acc, p) => acc + p.alcance, 0)
    const totalEngajamento = historicoPublicacoes.reduce((acc, p) => acc + p.engajamento, 0)
    const totalCliques = historicoPublicacoes.reduce((acc, p) => acc + p.cliques, 0)
    const taxaEngajamentoGeral = totalAlcance > 0 ? ((totalEngajamento / totalAlcance) * 100).toFixed(2) : 0
    const taxaCliques = totalAlcance > 0 ? ((totalCliques / totalAlcance) * 100).toFixed(2) : 0

    return {
      totalAlcance,
      totalEngajamento,
      totalCliques,
      taxaEngajamentoGeral,
      taxaCliques,
      publicacoesTotal: historicoPublicacoes.length
    }
  }, [])

  // Dados para gráficos
  const dadosPorCanal = useMemo(() => {
    const instagram = historicoPublicacoes.filter(p => p.canal === 'instagram')
    const whatsapp = historicoPublicacoes.filter(p => p.canal === 'whatsapp')
    const telegram = historicoPublicacoes.filter(p => p.canal === 'telegram')

    return [
      {
        canal: 'Instagram',
        alcance: instagram.reduce((acc, p) => acc + p.alcance, 0),
        engajamento: instagram.reduce((acc, p) => acc + p.engajamento, 0),
        cliques: instagram.reduce((acc, p) => acc + p.cliques, 0)
      },
      {
        canal: 'WhatsApp',
        alcance: whatsapp.reduce((acc, p) => acc + p.alcance, 0),
        engajamento: whatsapp.reduce((acc, p) => acc + p.engajamento, 0),
        cliques: whatsapp.reduce((acc, p) => acc + p.cliques, 0)
      },
      {
        canal: 'Telegram',
        alcance: telegram.reduce((acc, p) => acc + p.alcance, 0),
        engajamento: telegram.reduce((acc, p) => acc + p.engajamento, 0),
        cliques: telegram.reduce((acc, p) => acc + p.cliques, 0)
      }
    ]
  }, [])

  const dadosTendencia = useMemo(() => {
    return historicoPublicacoes
      .sort((a, b) => new Date(a.data) - new Date(b.data))
      .map(pub => ({
        data: new Date(pub.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        alcance: pub.alcance,
        engajamento: pub.engajamento
      }))
  }, [])

  const handleCopiar = (texto, tipo) => {
    navigator.clipboard.writeText(texto)
    setCopiado(prev => ({ ...prev, [tipo]: true }))
    toast.success('Conteúdo copiado!')
    setTimeout(() => setCopiado(prev => ({ ...prev, [tipo]: false })), 2000)
  }

  const handleCompartilhar = (canal) => {
    const conteudo = conteudoPorCanal[canal]
    let url = ''
    let texto = ''

    if (canal === 'whatsapp') {
      texto = conteudo.mensagem
      url = `https://wa.me/?text=${encodeURIComponent(texto)}`
      window.open(url, '_blank')
      toast.success('Abrindo WhatsApp...')
    } else if (canal === 'telegram') {
      texto = `${conteudo.titulo}\n\n${conteudo.mensagem}`
      url = `https://t.me/share/url?url=${encodeURIComponent(eventoSelecionado.qrCode)}&text=${encodeURIComponent(texto)}`
      window.open(url, '_blank')
      toast.success('Abrindo Telegram...')
    } else {
      handleCopiar(conteudo.feed.legenda, 'instagram-feed')
    }
  }

  const getMelhorHorario = (canal) => {
    return metricasCanais[canal]?.melhorHorario || 'N/A'
  }

  const getMelhorDia = (canal) => {
    const dias = {
      'segunda': 'Segunda-feira',
      'terca': 'Terça-feira',
      'quarta': 'Quarta-feira',
      'quinta': 'Quinta-feira',
      'sexta': 'Sexta-feira',
      'sabado': 'Sábado',
      'domingo': 'Domingo'
    }
    return dias[metricasCanais[canal]?.melhorDia] || 'N/A'
  }

  const COLORS = ['#a855f7', '#10b981', '#3b82f6']

  return (
    <div className="h-full overflow-y-auto p-6 bg-gradient-to-br from-neutral-50 via-orange-50/30 to-blue-50/30 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-command-text mb-2 flex items-center gap-3">
            <FiShare2 className="text-command-accent" />
            Comunicação Integrada
          </h1>
          <p className="text-lg text-command-text-muted max-w-2xl">
            Ampliar o alcance dos eventos, comércios e alertas do SCS utilizando canais digitais consolidados
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setViewMode('criar')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              viewMode === 'criar' 
                ? 'bg-command-accent text-white' 
                : 'bg-command-surface text-command-text hover:bg-command-surface-alt'
            }`}
          >
            <FiSend className="inline w-4 h-4 mr-2" />
            Criar Conteúdo
          </button>
          <button
            onClick={() => setViewMode('analise')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              viewMode === 'analise' 
                ? 'bg-command-accent text-white' 
                : 'bg-command-surface text-command-text hover:bg-command-surface-alt'
            }`}
          >
            <FiBarChart2 className="inline w-4 h-4 mr-2" />
            Análise de Performance
          </button>
          <button
            onClick={() => setViewMode('historico')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              viewMode === 'historico' 
                ? 'bg-command-accent text-white' 
                : 'bg-command-surface text-command-text hover:bg-command-surface-alt'
            }`}
          >
            <FiClock className="inline w-4 h-4 mr-2" />
            Histórico
          </button>
        </div>

        {viewMode === 'criar' ? (
          <>
            {/* Seleção de Evento */}
            <div className="bg-command-surface rounded-xl p-6 border border-command-border mb-6">
              <label className="block text-sm font-semibold text-command-text mb-2">
                Selecionar Evento
              </label>
              <select
                value={eventoSelecionado.id}
                onChange={(e) => {
                  const evento = eventosMock.find(evt => evt.id === e.target.value)
                  setEventoSelecionado(evento)
                }}
                className="w-full px-4 py-3 rounded-lg bg-command-surface-alt border border-command-border text-command-text focus:outline-none focus:ring-2 focus:ring-command-accent font-semibold"
              >
                {eventosMock.map(evt => (
                  <option key={evt.id} value={evt.id}>{evt.titulo}</option>
                ))}
              </select>
            </div>

            {/* Canais */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Instagram */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <FiInstagram className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-command-text">Instagram</h3>
                    <p className="text-xs text-command-text-muted">Alcance e Divulgação</p>
                  </div>
                </div>

                {/* Métricas Rápidas */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-command-surface-alt rounded-lg border border-command-border">
                  <div>
                    <div className="text-xs text-command-text-muted">Seguidores</div>
                    <div className="text-sm font-black text-command-text">{metricasCanais.instagram.seguidores.toLocaleString('pt-BR')}</div>
                  </div>
                  <div>
                    <div className="text-xs text-command-text-muted">Engajamento</div>
                    <div className="text-sm font-black text-command-text">{metricasCanais.instagram.engajamentoMedio}%</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Feed */}
                  <div>
                    <h4 className="text-sm font-semibold text-command-text mb-2">Post para Feed</h4>
                    <div className="bg-command-surface-alt rounded-lg p-4 mb-3 border border-command-border max-h-64 overflow-y-auto">
                      <p className="text-sm text-command-text-muted whitespace-pre-line">
                        {conteudoPorCanal.instagram.feed.legenda}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCompartilhar('instagram')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-colors font-semibold"
                    >
                      {copiado['instagram-feed'] ? (
                        <>
                          <FiCheck className="w-4 h-4" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <FiCopy className="w-4 h-4" />
                          <span>Copiar Legenda</span>
                        </>
                      )}
                    </button>
                    <div className="mt-2 p-2 bg-purple-500/10 rounded-lg border border-purple-500/30">
                      <div className="text-xs text-purple-500 font-semibold mb-1">💡 Melhor Horário: {getMelhorHorario('instagram')}</div>
                      <div className="text-xs text-purple-500">📅 Melhor Dia: {getMelhorDia('instagram')}</div>
                    </div>
                  </div>

                  {/* Story */}
                  <div>
                    <h4 className="text-sm font-semibold text-command-text mb-2">Story</h4>
                    <div className="bg-command-surface-alt rounded-lg p-4 mb-3 border border-command-border">
                      <p className="text-sm text-command-text whitespace-pre-line">
                        {conteudoPorCanal.instagram.story.texto}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopiar(conteudoPorCanal.instagram.story.texto, 'instagram-story')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-command-accent/10 text-command-accent hover:bg-command-accent/20 transition-colors border border-command-accent/30 font-semibold"
                    >
                      {copiado['instagram-story'] ? (
                        <>
                          <FiCheck className="w-4 h-4" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <FiCopy className="w-4 h-4" />
                          <span>Copiar Texto</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                    <FiMessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-command-text">WhatsApp</h3>
                    <p className="text-xs text-command-text-muted">Ação Rápida</p>
                  </div>
                </div>

                {/* Métricas Rápidas */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-command-surface-alt rounded-lg border border-command-border">
                  <div>
                    <div className="text-xs text-command-text-muted">Grupos</div>
                    <div className="text-sm font-black text-command-text">{metricasCanais.whatsapp.gruposAtivos}</div>
                  </div>
                  <div>
                    <div className="text-xs text-command-text-muted">Membros</div>
                    <div className="text-sm font-black text-command-text">{metricasCanais.whatsapp.membrosTotal.toLocaleString('pt-BR')}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-command-text mb-2">Mensagem</h4>
                    <div className="bg-command-surface-alt rounded-lg p-4 mb-3 border border-command-border max-h-64 overflow-y-auto">
                      <p className="text-sm text-command-text-muted whitespace-pre-line">
                        {conteudoPorCanal.whatsapp.mensagem}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCompartilhar('whatsapp')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors font-semibold"
                    >
                      <FiSend className="w-4 h-4" />
                      <span>Compartilhar no WhatsApp</span>
                    </button>
                    <div className="mt-2 p-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <div className="text-xs text-blue-500 font-semibold mb-1">💡 Dica: Use em grupos locais de comerciantes e comunidade</div>
                      <div className="text-xs text-blue-500">⏰ Melhor Horário: {getMelhorHorario('whatsapp')}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Telegram */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                    <FiSend className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-command-text">Telegram</h3>
                    <p className="text-xs text-command-text-muted">Canal Institucional</p>
                  </div>
                </div>

                {/* Métricas Rápidas */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-command-surface-alt rounded-lg border border-command-border">
                  <div>
                    <div className="text-xs text-command-text-muted">Membros</div>
                    <div className="text-sm font-black text-command-text">{metricasCanais.telegram.membros.toLocaleString('pt-BR')}</div>
                  </div>
                  <div>
                    <div className="text-xs text-command-text-muted">Engajamento</div>
                    <div className="text-sm font-black text-command-text">{metricasCanais.telegram.taxaEngajamento}%</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-command-text mb-2">Publicação para Canal</h4>
                    <div className="bg-command-surface-alt rounded-lg p-4 mb-3 border border-command-border max-h-64 overflow-y-auto">
                      <p className="text-sm font-semibold text-command-text mb-2">
                        {conteudoPorCanal.telegram.titulo}
                      </p>
                      <p className="text-sm text-command-text-muted whitespace-pre-line">
                        {conteudoPorCanal.telegram.mensagem}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCompartilhar('telegram')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors font-semibold"
                    >
                      <FiSend className="w-4 h-4" />
                      <span>Publicar no Telegram</span>
                    </button>
                    <div className="mt-2 p-2 bg-purple-500/10 rounded-lg border border-purple-500/30">
                      <div className="text-xs text-purple-500 font-semibold mb-1">📢 Canal oficial "SCS Ativo" - histórico público e acessível</div>
                      <div className="text-xs text-purple-500">⏰ Melhor Horário: {getMelhorHorario('telegram')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nota sobre IA */}
            <div className="mt-6 bg-command-surface rounded-xl p-6 border border-command-border">
              <div className="flex items-start gap-3">
                <FiZap className="w-5 h-5 text-command-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-command-text mb-2">Geração Inteligente de Conteúdo</h4>
                  <p className="text-sm text-command-text-muted">
                    A IA analisa o tipo de evento, público-alvo e histórico de engajamento para sugerir o melhor canal, 
                    horário de publicação e hashtags. O conteúdo é otimizado automaticamente para cada plataforma, 
                    mantendo a consistência da mensagem oficial.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : viewMode === 'analise' ? (
          /* Análise de Performance */
          <div className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-command-text-muted">Alcance Total</span>
                  <FiEye className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-3xl font-black text-command-text mb-2">
                  {estatisticas.totalAlcance.toLocaleString('pt-BR')}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <FiTrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-command-text-muted">+12% vs. mês anterior</span>
                </div>
              </div>

              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-command-text-muted">Engajamento Total</span>
                  <FiUsers className="w-5 h-5 text-purple-500" />
                </div>
                <div className="text-3xl font-black text-command-text mb-2">
                  {estatisticas.totalEngajamento.toLocaleString('pt-BR')}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <FiTrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-command-text-muted">Taxa: {estatisticas.taxaEngajamentoGeral}%</span>
                </div>
              </div>

              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-command-text-muted">Cliques</span>
                  <FiMousePointer className="w-5 h-5 text-command-accent" />
                </div>
                <div className="text-3xl font-black text-command-text mb-2">
                  {estatisticas.totalCliques.toLocaleString('pt-BR')}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <FiTrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-command-text-muted">Taxa: {estatisticas.taxaCliques}%</span>
                </div>
              </div>

              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-command-text-muted">Publicações</span>
                  <FiShare2 className="w-5 h-5 text-teal-500" />
                </div>
                <div className="text-3xl font-black text-command-text mb-2">
                  {estatisticas.publicacoesTotal}
                </div>
                <div className="text-xs text-command-text-muted">Últimos 30 dias</div>
              </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance por Canal */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                  <FiBarChart2 className="w-5 h-5 text-command-accent" />
                  Performance por Canal
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dadosPorCanal}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="canal" stroke="var(--color-text-muted)" />
                    <YAxis stroke="var(--color-text-muted)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--color-surface)', 
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="alcance" fill="#3b82f6" name="Alcance" />
                    <Bar dataKey="engajamento" fill="#a855f7" name="Engajamento" />
                    <Bar dataKey="cliques" fill="#10b981" name="Cliques" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Tendência de Alcance */}
              <div className="bg-command-surface rounded-xl p-6 border border-command-border">
                <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                  <FiTrendingUp className="w-5 h-5 text-command-accent" />
                  Tendência de Alcance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dadosTendencia}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="data" stroke="var(--color-text-muted)" />
                    <YAxis stroke="var(--color-text-muted)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--color-surface)', 
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)'
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="alcance" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Alcance"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="engajamento" 
                      stroke="#a855f7" 
                      strokeWidth={2}
                      name="Engajamento"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Análise Detalhada por Canal */}
            <div className="bg-command-surface rounded-xl p-6 border border-command-border">
              <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                <FiTarget className="w-5 h-5 text-command-accent" />
                Análise Detalhada por Canal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Instagram */}
                <div className="bg-command-surface-alt rounded-xl p-6 border border-command-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <FiInstagram className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-command-text">Instagram</h4>
                      <p className="text-xs text-command-text-muted">Rede Social</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-command-text-muted mb-1">Seguidores</div>
                      <div className="text-2xl font-black text-command-text">{metricasCanais.instagram.seguidores.toLocaleString('pt-BR')}</div>
                    </div>
                    <div>
                      <div className="text-xs text-command-text-muted mb-1">Alcance Médio</div>
                      <div className="text-lg font-black text-command-text">{metricasCanais.instagram.alcanceMedio.toLocaleString('pt-BR')}</div>
                    </div>
                    <div>
                      <div className="text-xs text-command-text-muted mb-1">Taxa de Engajamento</div>
                      <div className="text-lg font-black text-command-text">{metricasCanais.instagram.engajamentoMedio}%</div>
                    </div>
                    <div className="pt-3 border-t border-command-border">
                      <div className="text-xs text-command-text-muted mb-2">Melhor Horário</div>
                      <div className="flex items-center gap-2">
                        <FiClock className="w-4 h-4 text-command-accent" />
                        <span className="text-sm font-semibold text-command-text">{getMelhorHorario('instagram')}</span>
                      </div>
                      <div className="text-xs text-command-text-muted mt-1">{getMelhorDia('instagram')}</div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-command-surface-alt rounded-xl p-6 border border-command-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                      <FiMessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-command-text">WhatsApp</h4>
                      <p className="text-xs text-command-text-muted">Mensageria</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-command-text-muted mb-1">Grupos Ativos</div>
                      <div className="text-2xl font-black text-command-text">{metricasCanais.whatsapp.gruposAtivos}</div>
                    </div>
                    <div>
                      <div className="text-xs text-command-text-muted mb-1">Total de Membros</div>
                      <div className="text-lg font-black text-command-text">{metricasCanais.whatsapp.membrosTotal.toLocaleString('pt-BR')}</div>
                    </div>
                    <div>
                      <div className="text-xs text-command-text-muted mb-1">Taxa de Resposta</div>
                      <div className="text-lg font-black text-command-text">{metricasCanais.whatsapp.taxaResposta}%</div>
                    </div>
                    <div className="pt-3 border-t border-command-border">
                      <div className="text-xs text-command-text-muted mb-2">Melhor Horário</div>
                      <div className="flex items-center gap-2">
                        <FiClock className="w-4 h-4 text-command-accent" />
                        <span className="text-sm font-semibold text-command-text">{getMelhorHorario('whatsapp')}</span>
                      </div>
                      <div className="text-xs text-command-text-muted mt-1">{getMelhorDia('whatsapp')}</div>
                    </div>
                  </div>
                </div>

                {/* Telegram */}
                <div className="bg-command-surface-alt rounded-xl p-6 border border-command-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                      <FiSend className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-command-text">Telegram</h4>
                      <p className="text-xs text-command-text-muted">Canal Oficial</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-command-text-muted mb-1">Membros</div>
                      <div className="text-2xl font-black text-command-text">{metricasCanais.telegram.membros.toLocaleString('pt-BR')}</div>
                    </div>
                    <div>
                      <div className="text-xs text-command-text-muted mb-1">Visualizações Médias</div>
                      <div className="text-lg font-black text-command-text">{metricasCanais.telegram.visualizacoesMedias.toLocaleString('pt-BR')}</div>
                    </div>
                    <div>
                      <div className="text-xs text-command-text-muted mb-1">Taxa de Engajamento</div>
                      <div className="text-lg font-black text-command-text">{metricasCanais.telegram.taxaEngajamento}%</div>
                    </div>
                    <div className="pt-3 border-t border-command-border">
                      <div className="text-xs text-command-text-muted mb-2">Melhor Horário</div>
                      <div className="flex items-center gap-2">
                        <FiClock className="w-4 h-4 text-command-accent" />
                        <span className="text-sm font-semibold text-command-text">{getMelhorHorario('telegram')}</span>
                      </div>
                      <div className="text-xs text-command-text-muted mt-1">{getMelhorDia('telegram')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Histórico */
          <div className="space-y-6">
            <div className="bg-command-surface rounded-xl p-6 border border-command-border">
              <h3 className="text-lg font-bold text-command-text mb-4 flex items-center gap-2">
                <FiClock className="w-5 h-5 text-command-accent" />
                Histórico de Publicações
              </h3>
              <div className="space-y-3">
                {historicoPublicacoes.map(pub => {
                  const evento = eventosMock.find(e => e.id === pub.evento)
                  const canalInfo = {
                    instagram: { nome: 'Instagram', cor: 'from-purple-500 to-pink-500', icon: FiInstagram },
                    whatsapp: { nome: 'WhatsApp', cor: 'from-green-500 to-emerald-500', icon: FiMessageCircle },
                    telegram: { nome: 'Telegram', cor: 'from-blue-500 to-cyan-500', icon: FiSend }
                  }
                  const info = canalInfo[pub.canal]
                  const Icon = info.icon

                  return (
                    <div
                      key={pub.id}
                      className="bg-command-surface-alt rounded-xl p-4 border border-command-border hover:border-command-accent/50 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${info.cor} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-command-text">{info.nome}</h4>
                              <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-500 border border-green-500/30">
                                {pub.status === 'publicado' ? 'Publicado' : 'Agendado'}
                              </span>
                            </div>
                            <p className="text-sm text-command-text-muted mb-3">{evento?.titulo || 'Evento não encontrado'}</p>
                            <div className="grid grid-cols-3 gap-4 text-xs">
                              <div>
                                <div className="text-command-text-muted mb-1">Alcance</div>
                                <div className="font-black text-command-text">{pub.alcance.toLocaleString('pt-BR')}</div>
                              </div>
                              <div>
                                <div className="text-command-text-muted mb-1">Engajamento</div>
                                <div className="font-black text-command-text">{pub.engajamento.toLocaleString('pt-BR')}</div>
                              </div>
                              <div>
                                <div className="text-command-text-muted mb-1">Cliques</div>
                                <div className="font-black text-command-text">{pub.cliques.toLocaleString('pt-BR')}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-command-text-muted">
                          {new Date(pub.data).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ComunicacaoIntegrada
