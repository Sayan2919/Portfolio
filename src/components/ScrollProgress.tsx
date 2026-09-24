import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin gradient bar fixed to the top of the viewport, tracking overall scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-[linear-gradient(90deg,var(--violet),var(--cyan),var(--emerald))]"
      style={{ scaleX }}
    />
  )
}
