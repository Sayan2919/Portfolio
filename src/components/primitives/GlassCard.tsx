import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'

type GlassCardProps = {
  children: ReactNode
  className?: string
  spotlight?: boolean
  as?: 'div' | 'article' | 'li'
}

/**
 * Frosted-glass surface. When `spotlight` is set, a soft radial highlight
 * tracks the cursor across the card — pure CSS custom-property + motion
 * value, no re-render per mouse move.
 */
export function GlassCard({ children, className = '', spotlight = true, as = 'div' }: GlassCardProps) {
  const reduceMotion = useReducedMotion()
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
  const background = useMotionTemplate`radial-gradient(240px circle at ${mouseX}% ${mouseY}%, var(--violet-soft), transparent 70%)`

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    if (reduceMotion || !spotlight) return
    const bounds = event.currentTarget.getBoundingClientRect()
    mouseX.set(((event.clientX - bounds.left) / bounds.width) * 100)
    mouseY.set(((event.clientY - bounds.top) / bounds.height) * 100)
  }

  // Unify to motion.div's prop types — all three tags are plain block
  // containers here, so the div event/prop shape is a safe fit for each.
  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      onMouseMove={handleMouseMove}
      // `isolate` opens a fresh stacking context so the spotlight's
      // negative z-index stays pinned behind this card's own content
      // instead of falling behind the page. Children render directly
      // (no wrapper div) so any grid/flex classes callers pass in
      // `className` apply straight to them, not to an inert wrapper.
      className={`glass group relative isolate overflow-hidden rounded-2xl ${className}`}
    >
      {spotlight && !reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      {children}
    </MotionTag>
  )
}
