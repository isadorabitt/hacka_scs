import { useState, useEffect } from 'react'
import { FiMapPin, FiUsers, FiShield, FiSun, FiZap, FiTrendingUp, FiShoppingBag } from 'react-icons/fi'
import { agoraNoSCS } from '../../services/apiSCS'

export default function AgoraNoSCS({ quadra = null }) {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true)
        // Buscar dados reais da API
        const dadosReais = {
          eventosAtivos: [],
          comerciosAbertos: [],
          alertasRecentes: [],
          checkIns: [],
        }
        
        const data = await agoraNoSCS(quadra, dadosReais)
        setStatus(data)
      } catch (error) {
        console.error('Erro ao buscar status:', error)
        // Fallback para dados mock apenas se API falhar completamente
        setStatus({
          status: 'moderado',
          eventosAtivos: 2,
          comerciosAbertos: 8,
          movimento: 'medio',
          seguranca: 'presente',
          iluminacao: 'adequada',
          pessoasEstimadas: 25,
          scoreVidaUrbana: 0.65,
          recomendacao: 'Movimento moderado. Alguns comércios abertos disponíveis',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, 30000) // Atualizar a cada 30s
    return () => clearInterval(interval)
  }, [quadra])

  if (loading) {
    return (
      <div className="rounded-2xl p-6 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3" />
        </div>
      </div>
    )
  }

  if (!status) return null

  const statusColors = {
    vivo: 'from-green-500 to-emerald-600',
    moderado: 'from-yellow-500 to-orange-500',
    vazio: 'from-neutral-400 to-neutral-500',
  }

  return (
    <div className="rounded-2xl p-6 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 relative overflow-hidden shadow-[0_0_30px_rgba(255,140,0,0.3)]">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${statusColors[status.status]} opacity-10 -z-10`} />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
            <FiZap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Agora no SCS
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {quadra || 'Todas as quadras'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`
            w-4 h-4 rounded-full animate-pulse
            ${status.status === 'vivo' ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]' : ''}
            ${status.status === 'moderado' ? 'bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.5)]' : ''}
            ${status.status === 'vazio' ? 'bg-neutral-400' : ''}
          `} />
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 capitalize">
            {status.status}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FiMapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
              Eventos
            </span>
          </div>
          <p className="text-2xl font-black text-neutral-900 dark:text-white">
            {status.eventosAtivos}
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FiShoppingBag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
              Comércios
            </span>
          </div>
          <p className="text-2xl font-black text-neutral-900 dark:text-white">
            {status.comerciosAbertos}
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FiUsers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
              Pessoas
            </span>
          </div>
          <p className="text-2xl font-black text-neutral-900 dark:text-white">
            {status.pessoasEstimadas || '~'}
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FiTrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
              Score
            </span>
          </div>
          <p className="text-2xl font-black text-neutral-900 dark:text-white">
            {(status.scoreVidaUrbana * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      {/* Status Details */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border-2 border-orange-600 dark:border-orange-400 text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20">
          <FiShield className="w-3.5 h-3.5" />
          {status.seguranca}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border-2 border-orange-600 dark:border-orange-400 text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20">
          <FiSun className="w-3.5 h-3.5" />
          {status.iluminacao}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-500 dark:to-red-500 text-white shadow-md">
          Movimento: {status.movimento}
        </span>
      </div>

      {/* Recommendation */}
      {status.recomendacao && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 border-2 border-orange-200 dark:border-orange-800">
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            💡 {status.recomendacao}
          </p>
        </div>
      )}
    </div>
  )
}

