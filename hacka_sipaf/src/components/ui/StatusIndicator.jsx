import { cn } from '../../utils/cn'

export default function StatusIndicator({
  status,
  size = 'md',
  pulse = false,
  className,
}) {
  const statusConfig = {
    vivo: {
      color: 'bg-green-500',
      glow: 'shadow-[0_0_20px_rgba(34,197,94,0.5)]',
      label: 'Vivo',
    },
    moderado: {
      color: 'bg-yellow-500',
      glow: 'shadow-[0_0_20px_rgba(234,179,8,0.5)]',
      label: 'Moderado',
    },
    vazio: {
      color: 'bg-neutral-400',
      glow: '',
      label: 'Vazio',
    },
    alto: {
      color: 'bg-red-500',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]',
      label: 'Alto',
    },
    medio: {
      color: 'bg-yellow-500',
      glow: 'shadow-[0_0_20px_rgba(234,179,8,0.5)]',
      label: 'Médio',
    },
    baixo: {
      color: 'bg-green-500',
      glow: 'shadow-[0_0_20px_rgba(34,197,94,0.5)]',
      label: 'Baixo',
    },
  }

  const config = statusConfig[status] || statusConfig.vazio
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  }

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          'rounded-full',
          config.color,
          sizes[size],
          config.glow,
          pulse && 'animate-pulse',
          className
        )}
      />
      {config.label && (
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {config.label}
        </span>
      )}
    </div>
  )
}

