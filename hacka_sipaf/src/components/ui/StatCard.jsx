import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const StatCard = forwardRef(({
  label,
  value,
  icon: Icon,
  trend,
  trendValue,
  variant = 'default',
  className,
  ...props
}, ref) => {
  const variants = {
    default: 'bg-white dark:bg-neutral-800',
    gradient: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
    glass: 'bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700',
        'transition-all duration-300 hover:scale-105 hover:shadow-lg',
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
          {Icon && <Icon className="w-5 h-5 text-white" />}
        </div>
        {trend && (
          <div className={cn(
            'flex items-center gap-1 text-sm font-medium',
            trend === 'up' ? 'text-green-500' : 'text-red-500'
          )}>
            {trend === 'up' ? '↑' : '↓'}
            {trendValue}
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
          {label}
        </p>
        <p className="text-3xl font-bold text-neutral-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  )
})

StatCard.displayName = 'StatCard'

export default StatCard

