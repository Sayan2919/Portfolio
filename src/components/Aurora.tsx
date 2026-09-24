import { motion, useReducedMotion } from 'framer-motion'

/**
 * Fixed full-viewport background: slowly drifting aurora gradient blobs over
 * the base color, plus a static vignette. Sits behind all content (z-0);
 * App renders the noise overlay above it. Colors read from theme tokens so
 * the whole thing re-tints instantly on theme toggle.
 */
export function Aurora() {
  const reduceMotion = useReducedMotion()

  // This container is `fixed` (viewport-height, not document-height), so
  // blob positions are percentages of the viewport — a large rem-based
  // offset like `top: 85rem` would sit outside the box and never render.
  const blobs = [
    { color: 'var(--violet)', size: '46rem', top: '-18%', left: '-12%', duration: 26 },
    { color: 'var(--cyan)', size: '38rem', top: '-8%', left: '58%', duration: 32 },
    { color: 'var(--emerald)', size: '34rem', top: '55%', left: '-10%', duration: 30 },
    { color: 'var(--violet)', size: '30rem', top: '62%', left: '62%', duration: 24 },
  ]

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[110px]"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: blob.color,
            opacity: 'var(--aurora-opacity)',
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 60, -30, 0],
                  y: [0, -40, 30, 0],
                }
          }
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg)_75%)]" />
    </div>
  )
}
