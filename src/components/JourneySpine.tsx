import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Building2, MapPin, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import { experience } from '../data/resume'
import { GlassCard, Reveal, SectionHeading } from './primitives'

function ChapterNode({ chapter, current }: { chapter: string; current?: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-6 top-1 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full sm:left-8"
      style={{
        background: 'var(--bg)',
        border: `2px solid ${current ? 'var(--emerald)' : 'var(--violet)'}`,
        boxShadow: current ? '0 0 20px var(--emerald-soft)' : '0 0 16px var(--violet-soft)',
      }}
    >
      <span className="font-display text-[0.65rem] font-bold text-text">{chapter}</span>
    </motion.div>
  )
}

export function JourneySpine() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.4'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const markerTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="journey" className="relative z-10 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          kicker="The Journey"
          title="Four chapters, one throughline"
          description="Each role built on the last — from predicting physical systems to architecting the agents that reason about them."
        />

        <div ref={containerRef} className="relative mt-14">
          {/* base track */}
          <div
            aria-hidden
            className="absolute left-6 top-0 h-full w-px bg-border sm:left-8"
          />
          {/* scroll-drawn fill */}
          <motion.div
            aria-hidden
            className="absolute left-6 top-0 h-full w-px origin-top sm:left-8"
            style={{
              scaleY: reduceMotion ? 1 : lineScale,
              background: 'linear-gradient(180deg, var(--violet), var(--cyan), var(--emerald))',
            }}
          />
          {/* traveling marker */}
          {!reduceMotion && (
            <motion.div
              aria-hidden
              className="absolute left-6 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full sm:left-8"
              style={{
                top: markerTop,
                background: 'var(--cyan)',
                boxShadow: '0 0 14px var(--cyan)',
              }}
            />
          )}

          <ol className="flex flex-col gap-14">
            {experience.map((entry) => (
              <li key={entry.id} className="relative pl-16 sm:pl-20">
                <ChapterNode chapter={entry.chapter} current={entry.current} />

                <Reveal delay={0.05}>
                  <GlassCard className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-lg font-semibold text-text sm:text-xl">{entry.role}</h3>
                          {entry.current && (
                            <span className="font-display inline-flex items-center gap-1 rounded-full bg-emerald-soft px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-emerald">
                              <Sparkles size={10} />
                              Current Chapter
                            </span>
                          )}
                        </div>
                        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-cyan">
                          <Building2 size={14} />
                          {entry.org}
                        </p>
                      </div>
                      <span className="font-display shrink-0 rounded-full border border-border px-3 py-1 text-xs font-medium text-text-dim">
                        {entry.start} — {entry.end}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-faint">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {entry.location}
                      </span>
                      <span>{entry.department}</span>
                    </div>

                    <ul className="mt-5 flex flex-col gap-2.5">
                      {entry.highlights.map((h) => (
                        <li key={h.label} className="flex gap-2.5 text-sm text-text-dim">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet" />
                          <span>
                            <span className="font-semibold text-text">{h.label}:</span> {h.detail}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-text-dim">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlassCard>

                  <p className="mt-4 max-w-xl text-sm italic text-text-faint">{entry.narrative}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
