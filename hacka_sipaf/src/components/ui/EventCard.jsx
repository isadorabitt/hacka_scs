import { forwardRef } from 'react'
import { FiMapPin, FiCalendar, FiClock, FiUsers, FiShare2, FiMaximize2 } from 'react-icons/fi'
import { cn } from '../../utils/cn'
import Badge from './Badge'
import Button from './Button'
import { scsImages, getImageWithFallback } from '../../data/scs-images'

const EventCard = forwardRef(({
  evento,
  onShare,
  onQRCode,
  onClick,
  className,
  ...props
}, ref) => {
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
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        'rounded-2xl overflow-hidden border-2 border-neutral-300 dark:border-neutral-600',
        'bg-white dark:bg-neutral-800',
        'transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-orange-500 cursor-pointer',
        'group',
        className
      )}
      {...props}
    >
      {/* Imagem */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={getImageWithFallback(
            evento.imagem,
            scsImages.eventos.feiraArte
          )} 
          alt={evento.titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = getImageWithFallback(scsImages.eventos.feiraArte)
          }}
        />
        {evento.nivelDestaque === 'alto' && (
          <div className="absolute top-3 right-3">
            <Badge variant="primary" size="sm">
              ⭐ Destaque
            </Badge>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-black text-neutral-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
          {evento.titulo}
        </h3>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4 line-clamp-2 font-medium">
          {evento.descricao}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
            <FiMapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>{getQuadraNome(evento.quadra)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
            <FiCalendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>{new Date(evento.data).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
            <FiClock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>{evento.horario} - {evento.horarioFim}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
            <FiUsers className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>{evento.engajamento?.confirmacoes || 0} confirmados</span>
          </div>
        </div>

        {evento.necessidadeApoio && evento.necessidadeApoio.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Apoio necessário:</div>
            <div className="flex flex-wrap gap-2">
              {evento.necessidadeApoio.map(apoio => (
                <Badge key={apoio} variant="outline" size="sm">
                  {apoio === 'seguranca' ? '🛡️ Segurança' : '💡 Iluminação'}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            leftIcon={<FiShare2 />}
            onClick={(e) => {
              e.stopPropagation()
              onShare?.(evento)
            }}
          >
            Compartilhar
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<FiMaximize2 />}
            onClick={(e) => {
              e.stopPropagation()
              onQRCode?.(evento)
            }}
          >
            QR Code
          </Button>
        </div>
      </div>
    </div>
  )
})

EventCard.displayName = 'EventCard'

export default EventCard

