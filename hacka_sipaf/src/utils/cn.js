/**
 * Utility function to merge classNames
 * Similar to clsx but simpler
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

