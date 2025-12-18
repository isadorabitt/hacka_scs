import { forwardRef } from 'react'
import { FiFilter } from 'react-icons/fi'
import { cn } from '../../utils/cn'
import Input from './Input'

const FilterBar = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl p-6 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl',
        'border border-neutral-200 dark:border-neutral-700',
        'mb-6',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 mb-4">
        <FiFilter className="w-5 h-5 text-orange-500" />
        <h2 className="font-semibold text-neutral-900 dark:text-white">Filtros</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  )
})

FilterBar.displayName = 'FilterBar'

export default FilterBar

