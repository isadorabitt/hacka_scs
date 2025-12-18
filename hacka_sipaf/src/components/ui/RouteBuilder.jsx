import { useState } from 'react'
import {
  FiX, FiZap, FiMapPin, FiClock, FiTrendingUp, FiNavigation,
  FiShoppingBag, FiMusic, FiImage, FiTarget,
  FiCheckCircle, FiDollarSign, FiPackage
} from 'react-icons/fi'

function RouteBuilder({ onClose = () => {} }) {
  const [startLocation, setStartLocation] = useState('')
  const [description, setDescription] = useState('')
  const [selectedInterests, setSelectedInterests] = useState([])
  const [timeAvailable, setTimeAvailable] = useState('60')
  const [budget, setBudget] = useState('medio')
  const [showRoute, setShowRoute] = useState(false)

  const interests = [
    { id: 'roupas', label: 'Roupas', icon: FiPackage },
    { id: 'sapatos', label: 'Sapatos', icon: FiShoppingBag },
    { id: 'comida', label: 'Comida', icon: FiShoppingBag },
    { id: 'cafe', label: 'Café', icon: FiShoppingBag },
    { id: 'cultura', label: 'Cultura', icon: FiMusic },
    { id: 'show', label: 'Shows', icon: FiMusic },
    { id: 'arte', label: 'Arte', icon: FiImage },
    { id: 'bar', label: 'Bares', icon: FiShoppingBag },
  ]

  const toggleInterest = (id) => {
    setSelectedInterests(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const handleGenerateRoute = () => {
    if (selectedInterests.length > 0 || description.trim().length > 0) {
      setShowRoute(true)
    }
  }

  // Gerar paradas baseadas nos interesses ou descrição
  const generateStops = () => {
    const stops = []
    
    // Ponto de partida
    stops.push({
      name: startLocation || 'Ponto de Partida',
      quadra: 1,
      time: '0 min',
      type: 'start'
    })

    // Paradas baseadas em interesses selecionados
    if (selectedInterests.length > 0) {
      selectedInterests.forEach((id, index) => {
        const interest = interests.find(i => i.id === id)
        stops.push({
          name: interest ? `${interest.label} - SCS Quadra ${(index % 6) + 1}` : id,
          quadra: (index % 6) + 1,
          time: `${(index + 1) * 15} min`,
          type: 'stop'
        })
      })
    } else {
      // Paradas padrão baseadas na descrição ou genéricas
      stops.push(
        { name: 'Loja Vintage Rock', quadra: 2, time: '15 min', type: 'stop' },
        { name: 'Café Alternativo', quadra: 3, time: '30 min', type: 'stop' },
        { name: 'Galeria de Arte', quadra: 5, time: '45 min', type: 'stop' }
      )
    }

    // Retorno
    stops.push({
      name: 'Retorno ao Início',
      quadra: 1,
      time: `${timeAvailable} min`,
      type: 'end'
    })

    return stops
  }

  const stops = generateStops()
  const canGenerate = selectedInterests.length > 0 || description.trim().length > 0

  return (
    <div className="bg-command-surface rounded-3xl p-8 relative shadow-2xl border border-command-border animate-fadeInScale">
      {/* Close button - apenas se onClose for fornecido */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-command-surface-alt rounded-xl transition-colors text-command-text-muted hover:text-command-text z-10"
        >
          <FiX className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <FiZap className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-command-text">
            Rota Inteligente
          </h2>
          <p className="text-sm text-command-text-muted">
            Configure sua rota perfeita pelo SCS
          </p>
        </div>
      </div>

      {!showRoute ? (
        <div className="space-y-6 animate-fadeIn">
          {/* Start Location Input */}
          <div>
            <label className="block text-sm font-bold text-command-text mb-3">
              <div className="flex items-center gap-2">
                <FiTarget className="w-4 h-4 text-command-accent" />
                Local de Partida
              </div>
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-command-text-muted" />
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                placeholder="Ex: Quadra 2, Restaurante Italiano"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-command-bg border border-command-border text-command-text placeholder-command-text-muted focus:outline-none focus:ring-2 focus:ring-command-accent focus:border-transparent font-medium transition-all"
              />
            </div>
          </div>

          {/* AI Description Input */}
          <div>
            <label className="block text-sm font-bold text-command-text mb-3">
              <div className="flex items-center gap-2">
                <FiZap className="w-4 h-4 text-amber-500" />
                Descreva sua rota ideal (IA)
              </div>
            </label>
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Ex: Quero passar por lojas mais retrô rock, cafés alternativos e galerias de arte underground..."
                className="w-full p-4 rounded-xl bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 border-2 border-amber-500/30 text-command-text placeholder-command-text-muted focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-medium resize-none transition-all"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-bold text-amber-500">
                <FiZap className="w-3 h-3" />
                IA
              </div>
            </div>
            <p className="text-xs text-command-text-muted mt-2">
              Descreva livremente o que você quer encontrar e a IA criará a rota perfeita
            </p>
          </div>

          {/* Time & Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-command-text mb-3">
                <div className="flex items-center gap-2">
                  <FiClock className="w-4 h-4 text-command-accent" />
                  Tempo Disponível
                </div>
              </label>
              <select
                value={timeAvailable}
                onChange={(e) => setTimeAvailable(e.target.value)}
                className="w-full px-4 py-4 rounded-xl bg-command-bg border border-command-border text-command-text focus:outline-none focus:ring-2 focus:ring-command-accent focus:border-transparent font-medium cursor-pointer transition-all"
              >
                <option value="30">30 minutos</option>
                <option value="60">1 hora</option>
                <option value="90">1h 30min</option>
                <option value="120">2 horas</option>
                <option value="180">3 horas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-command-text mb-3">
                <div className="flex items-center gap-2">
                  <FiDollarSign className="w-4 h-4 text-green-500" />
                  Orçamento
                </div>
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-4 rounded-xl bg-command-bg border border-command-border text-command-text focus:outline-none focus:ring-2 focus:ring-command-accent focus:border-transparent font-medium cursor-pointer transition-all"
              >
                <option value="baixo">Econômico (R$ 0-50)</option>
                <option value="medio">Moderado (R$ 50-150)</option>
                <option value="alto">Flexível (R$ 150+)</option>
              </select>
            </div>
          </div>

          {/* Interests Selection */}
          <div>
            <label className="block text-sm font-bold text-command-text mb-3">
              <div className="flex items-center gap-2">
                <FiShoppingBag className="w-4 h-4 text-command-accent" />
                Interesses (Opcional)
              </div>
            </label>
            <div className="grid grid-cols-4 gap-3">
              {interests.map((interest) => {
                const isSelected = selectedInterests.includes(interest.id)
                const Icon = interest.icon

                return (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`
                      p-4 rounded-xl font-bold text-sm transition-all relative
                      ${
                        isSelected
                          ? 'bg-command-accent text-white shadow-md scale-105'
                          : 'bg-command-surface text-command-text hover:bg-command-surface-alt border border-command-border'
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <FiCheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <span className="block text-xs">{interest.label}</span>
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-command-text-muted mt-2">
              {selectedInterests.length} interesse{selectedInterests.length !== 1 ? 's' : ''} selecionado{selectedInterests.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateRoute}
            disabled={!canGenerate}
            className={`
              w-full p-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all
              ${
                canGenerate
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                  : 'bg-command-surface-alt text-command-text-muted cursor-not-allowed'
              }
            `}
          >
            <FiZap className="w-5 h-5" />
            <span>
              {canGenerate
                ? 'Gerar Rota Inteligente'
                : 'Descreva sua rota ou selecione interesses'}
            </span>
            {canGenerate && <FiNavigation className="w-5 h-5" />}
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-command-accent rounded-xl flex items-center justify-center">
                <FiCheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-command-text">
                  Rota Gerada com Sucesso!
                </h3>
                <p className="text-sm text-command-text-muted">
                  {stops.length - 2} paradas otimizadas
                </p>
              </div>
            </div>
            {description.trim().length > 0 && (
              <div className="mt-4 p-3 bg-command-surface rounded-xl border border-amber-500/30">
                <div className="flex items-start gap-2">
                  <FiZap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-amber-500 mb-1">SUA DESCRIÇÃO</p>
                    <p className="text-sm text-command-text italic">&quot;{description}&quot;</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Route Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-command-surface rounded-xl p-4 border border-command-border">
              <div className="flex items-center gap-2 mb-2">
                <FiClock className="w-5 h-5 text-command-accent" />
                <span className="text-xs font-bold text-command-text-muted">DURAÇÃO</span>
              </div>
              <p className="font-black text-2xl text-command-text">{timeAvailable}min</p>
            </div>

            <div className="bg-command-surface rounded-xl p-4 border border-command-border">
              <div className="flex items-center gap-2 mb-2">
                <FiNavigation className="w-5 h-5 text-blue-500" />
                <span className="text-xs font-bold text-command-text-muted">DISTÂNCIA</span>
              </div>
              <p className="font-black text-2xl text-command-text">2.4km</p>
            </div>

            <div className="bg-command-surface rounded-xl p-4 border border-command-border">
              <div className="flex items-center gap-2 mb-2">
                <FiTrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-xs font-bold text-command-text-muted">SEGURANÇA</span>
              </div>
              <p className="font-black text-2xl text-command-text">94%</p>
            </div>
          </div>

          {/* Route Steps */}
          <div>
            <h4 className="font-bold text-command-text mb-4 flex items-center gap-2">
              <FiMapPin className="w-5 h-5 text-command-accent" />
              Suas Paradas
            </h4>
            <div className="space-y-3">
              {stops.map((stop, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-command-surface border border-command-border rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                    stop.type === 'start' ? 'bg-green-500/20 text-green-500 border-2 border-green-500' :
                    stop.type === 'end' ? 'bg-red-500/20 text-red-500 border-2 border-red-500' :
                    'bg-command-accent/20 text-command-accent border-2 border-command-accent'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-command-text">{stop.name}</p>
                    <p className="text-xs text-command-text-muted">Quadra {stop.quadra}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-command-text">{stop.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowRoute(false)}
              className="flex-1 px-6 py-4 bg-command-surface text-command-text rounded-xl font-bold hover:bg-command-surface-alt border border-command-border transition-all"
            >
              Voltar
            </button>
            <button
              className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <FiNavigation className="w-5 h-5" />
              Iniciar Navegação
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RouteBuilder

