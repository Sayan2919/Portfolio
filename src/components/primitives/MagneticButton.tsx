import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'

type CommonProps = {
  children: ReactNode
  className?: string
  variant?: 'solid' | 'ghost'
}

type MagneticButtonProps = CommonProps &
  (
    | ({ as?: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>)
  )

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium font-display tracking-wide transition-colors duration-300 whitespace-nowrap'
const variants = {
  solid: 'text-white',
  ghost: 'glass text-text hover:border-violet/40',
}

/** A button/link that gently follows the cursor within a small radius. */
export function MagneticButton({ children, className = '', variant = 'solid', as, ...rest }: MagneticButtonProps) {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    if (reduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.3)
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.3)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const Tag = as === 'a' ? motion.a : motion.button

  return (
    <Tag
      {...(rest as Record<string, unknown>)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {variant === 'solid' && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(120deg,var(--violet),var(--cyan))] shadow-[var(--glow)] transition-transform duration-300 group-hover:scale-105"
        />
      )}
      {children}
    </Tag>
  )
}
