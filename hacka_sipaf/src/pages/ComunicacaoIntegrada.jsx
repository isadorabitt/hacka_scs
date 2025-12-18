import { useState } from 'react'
import { FiShare2, FiInstagram, FiMessageCircle, FiSend, FiCopy, FiCheck } from 'react-icons/fi'
import { eventosMock } from '../data/scs-eventos-mock'
import { toast } from 'react-hot-toast'

function ComunicacaoIntegrada() {
  const [eventoSelecionado, setEventoSelecionado] = useState(eventosMock[0])
  const [canalSelecionado, setCanalSelecionado] = useState('instagram')
  const [copiado, setCopiado] = useState(false)

  // Geração de conteúdo por IA para cada canal
  const conteudoPorCanal = {
    instagram: {
      feed: {
        titulo: eventoSelecionado.titulo,
        legenda: `🎉 ${eventoSelecionado.titulo}\n\n${eventoSelecionado.descricao}\n\n📍 ${eventoSelecionado.quadra.replace('scs-', 'SCS Quadra ')}\n📅 ${new Date(eventoSelecionado.data).toLocaleDateString('pt-BR')}\n⏰ ${eventoSelecionado.horario}\n\n🔗 Link oficial: ${eventoSelecionado.qrCode}\n\n#SCSConecta #SetorComercialSul #Brasilia #EventosDF`,
        hashtags: ['#SCSConecta', '#SetorComercialSul', '#Brasilia', '#EventosDF', '#CulturaDF']
      },
      story: {
        texto: `${eventoSelecionado.titulo}\n\n${new Date(eventoSelecionado.data).toLocaleDateString('pt-BR')} às ${eventoSelecionado.horario}\n\n${eventoSelecionado.quadra.replace('scs-', 'SCS Quadra ')}`
      }
    },
    whatsapp: {
      mensagem: `*${eventoSelecionado.titulo}*\n\n${eventoSelecionado.descricao}\n\n📍 ${eventoSelecionado.quadra.replace('scs-', 'SCS Quadra ')}\n📅 ${new Date(eventoSelecionado.data).toLocaleDateString('pt-BR')}\n⏰ ${eventoSelecionado.horario}\n\n🔗 ${eventoSelecionado.qrCode}`
    },
    telegram: {
      titulo: eventoSelecionado.titulo,
      mensagem: `${eventoSelecionado.descricao}\n\n📍 ${eventoSelecionado.quadra.replace('scs-', 'SCS Quadra ')}\n📅 ${new Date(eventoSelecionado.data).toLocaleDateString('pt-BR')}\n⏰ ${eventoSelecionado.horario}\n\n🔗 ${eventoSelecionado.qrCode}`
    }
  }

  const handleCopiar = (texto) => {
    navigator.clipboard.writeText(texto)
    setCopiado(true)
    toast.success('Conteúdo copiado!')
    setTimeout(() => setCopiado(false), 2000)
  }

  const handleCompartilhar = (canal) => {
    const conteudo = conteudoPorCanal[canal]
    let url = ''
    let texto = ''

    if (canal === 'whatsapp') {
      texto = conteudo.mensagem
      url = `https://wa.me/?text=${encodeURIComponent(texto)}`
      window.open(url, '_blank')
    } else if (canal === 'telegram') {
      texto = `${conteudo.titulo}\n\n${conteudo.mensagem}`
      url = `https://t.me/share/url?url=${encodeURIComponent(eventoSelecionado.qrCode)}&text=${encodeURIComponent(texto)}`
      window.open(url, '_blank')
    } else {
      // Instagram - copiar para área de transferência
      handleCopiar(conteudo.feed.legenda)
      toast.success('Legenda copiada! Cole no Instagram')
    }
  }

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-neutral-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-3">
            <FiShare2 className="text-orange-500" />
            Comunicação Integrada
          </h1>
          <p className="text-neutral-900 dark:text-white-muted">
            Ampliar o alcance dos eventos, comércios e alertas do SCS utilizando canais digitais consolidados
          </p>
        </div>

        {/* Seleção de Evento */}
        <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 mb-6">
          <label className="block text-sm font-medium text-neutral-900 dark:text-white-muted mb-2">
            Selecionar Evento
          </label>
          <select
            value={eventoSelecionado.id}
            onChange={(e) => {
              const evento = eventosMock.find(evt => evt.id === e.target.value)
              setEventoSelecionado(evento)
            }}
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white"
          >
            {eventosMock.map(evt => (
              <option key={evt.id} value={evt.id}>{evt.titulo}</option>
            ))}
          </select>
        </div>

        {/* Canais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Instagram */}
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <FiInstagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Instagram</h3>
                <p className="text-xs text-neutral-900 dark:text-white-muted">Alcance e Divulgação</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Feed */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Post para Feed</h4>
                <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 mb-3 border border-neutral-200 dark:border-neutral-700">
                  <p className="text-sm text-neutral-900 dark:text-white-muted whitespace-pre-line">
                    {conteudoPorCanal.instagram.feed.legenda}
                  </p>
                </div>
                <button
                  onClick={() => handleCompartilhar('instagram')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  <FiCopy />
                  <span>Copiar Legenda</span>
                </button>
              </div>

              {/* Story */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Story</h4>
                <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 mb-3 border border-neutral-200 dark:border-neutral-700">
                  <p className="text-sm text-neutral-900 dark:text-white whitespace-pre-line">
                    {conteudoPorCanal.instagram.story.texto}
                  </p>
                </div>
                <button
                  onClick={() => handleCopiar(conteudoPorCanal.instagram.story.texto)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 transition-colors border border-orange-500/20"
                >
                  <FiCopy />
                  <span>Copiar Texto</span>
                </button>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                <FiMessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">WhatsApp</h3>
                <p className="text-xs text-neutral-900 dark:text-white-muted">Ação Rápida</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Mensagem</h4>
                <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 mb-3 border border-neutral-200 dark:border-neutral-700">
                  <p className="text-sm text-neutral-900 dark:text-white-muted whitespace-pre-line">
                    {conteudoPorCanal.whatsapp.mensagem}
                  </p>
                </div>
                <button
                  onClick={() => handleCompartilhar('whatsapp')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  <FiSend />
                  <span>Compartilhar no WhatsApp</span>
                </button>
              </div>

              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-xs text-blue-500">
                  💡 Dica: Use em grupos locais de comerciantes e comunidade
                </p>
              </div>
            </div>
          </div>

          {/* Telegram */}
          <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                <FiSend className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Telegram</h3>
                <p className="text-xs text-neutral-900 dark:text-white-muted">Canal Institucional</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Publicação para Canal</h4>
                <div className="bg-white dark:bg-neutral-900 rounded-lg p-4 mb-3 border border-neutral-200 dark:border-neutral-700">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                    {conteudoPorCanal.telegram.titulo}
                  </p>
                  <p className="text-sm text-neutral-900 dark:text-white-muted whitespace-pre-line">
                    {conteudoPorCanal.telegram.mensagem}
                  </p>
                </div>
                <button
                  onClick={() => handleCompartilhar('telegram')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  <FiSend />
                  <span>Publicar no Telegram</span>
                </button>
              </div>

              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <p className="text-xs text-purple-500">
                  📢 Canal oficial "SCS Ativo" - histórico público e acessível
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nota sobre IA */}
        <div className="mt-6 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
          <p className="text-sm text-neutral-900 dark:text-white-muted">
            <strong>Nota:</strong> A IA sugere o melhor canal e horário de publicação, mas a publicação final é sempre validada por humano. 
            O app funciona como núcleo oficial e organizado, enquanto as redes sociais atuam como canais de distribuição.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ComunicacaoIntegrada

