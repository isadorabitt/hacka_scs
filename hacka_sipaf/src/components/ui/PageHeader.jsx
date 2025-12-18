import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const PageHeader = forwardRef(({
  title,
  subtitle,
  icon: Icon,
  action,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('mb-8', className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
              <Icon className="w-6 h-6 text-white" />
            </div>
          )}
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  )
})

PageHeader.displayName = 'PageHeader'

export default PageHeader

