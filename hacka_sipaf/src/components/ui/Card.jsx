import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const Card = forwardRef(({
  children,
  variant = 'default',
  hover = false,
  glow = false,
  className,
  ...props
}, ref) => {
  const baseStyles = 'rounded-2xl transition-all duration-300'
  
  const variants = {
    default: 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
    glass: 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/20 dark:border-neutral-700/50',
    elevated: 'bg-white dark:bg-neutral-800 shadow-lg border border-neutral-200 dark:border-neutral-700',
    gradient: 'bg-gradient-to-br from-orange-500/10 to-blue-500/10 border border-orange-500/20 dark:border-blue-500/20',
  }
  
  const hoverStyles = hover ? 'hover:scale-[1.02] hover:shadow-xl cursor-pointer' : ''
  const glowStyles = glow ? 'shadow-[0_0_30px_rgba(255,140,0,0.3)]' : ''
  
  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        hoverStyles,
        glowStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

const CardHeader = forwardRef(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 pb-4', className)}
    {...props}
  >
    {children}
  </div>
))

CardHeader.displayName = 'CardHeader'

const CardBody = forwardRef(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6', className)}
    {...props}
  >
    {children}
  </div>
))

CardBody.displayName = 'CardBody'

const CardFooter = forwardRef(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 pt-4 border-t border-neutral-200 dark:border-neutral-700', className)}
    {...props}
  >
    {children}
  </div>
))

CardFooter.displayName = 'CardFooter'

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter

export default Card

