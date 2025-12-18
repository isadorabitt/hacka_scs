import { cn } from '../../utils/cn'

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className,
  ...props
}) {
  const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full'
  
  const variants = {
    default: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100',
    primary: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    outline: 'border-2 border-orange-500 text-orange-500 bg-transparent',
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }
  
  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn(
          'w-2 h-2 rounded-full',
          variant === 'default' ? 'bg-neutral-400' : 'bg-white/80'
        )} />
      )}
      {children}
    </span>
  )
}

