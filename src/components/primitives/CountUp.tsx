import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type CountUpProps = {
  value: number
  suffix?: string
  duration?: number
  decimals?: number
  className?: string
}

/** Animates a number counting up from 0 once it scrolls into view. */
export function CountUp({ value, suffix = '', duration = 1.6, decimals, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  // Reduced-motion has no animation to run, so its final value is the
  // initial state directly — nothing to synchronize via an effect.
  const [display, setDisplay] = useState(() => (reduceMotion ? value : 0))
  const resolvedDecimals = decimals ?? (Number.isInteger(value) ? 0 : 1)

  useEffect(() => {
    if (!inView || reduceMotion) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    })
    return () => controls.stop()
  }, [inView, value, duration, reduceMotion])

  return (
    <span ref={ref} className={className}>
      {display.toFixed(resolvedDecimals)}
      {suffix}
    </span>
  )
}
