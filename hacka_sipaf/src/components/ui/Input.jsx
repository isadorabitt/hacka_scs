import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200',
            'bg-white dark:bg-neutral-800',
            'border-neutral-200 dark:border-neutral-700',
            'focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20',
            'placeholder:text-neutral-400',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input

