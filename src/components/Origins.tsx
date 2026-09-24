import { GraduationCap, MapPin } from 'lucide-react'
import { education } from '../data/resume'
import { GlassCard, Reveal, SectionHeading } from './primitives'

export function Origins() {
  return (
    <section id="origins" className="relative z-10 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          kicker="Chapter 00 — Origins"
          title="Where the foundation was laid"
          description="Before the systems and the scale, there was the classroom — where the fundamentals took root."
        />

        <div className="relative mt-12 grid gap-6 sm:grid-cols-2">
          {/* connecting line between the two cards on larger screens */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 hidden h-px w-12 -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,var(--violet),var(--cyan))] sm:block"
          />

          {education.map((entry, i) => (
            <Reveal key={entry.id} delay={i * 0.12}>
              <GlassCard className="flex h-full flex-col gap-4 p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-soft text-violet">
                    <GraduationCap size={20} />
                  </div>
                  <span className="font-display rounded-full border border-border px-3 py-1 text-xs font-medium text-text-dim">
                    EQF Level {entry.eqf}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-text sm:text-xl">{entry.degree}</h3>
                  <p className="text-sm font-medium text-cyan">{entry.institution}</p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-faint">
                  <span>
                    {entry.start} — {entry.end}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {entry.location}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {entry.techniques.map((technique) => (
                    <span
                      key={technique}
                      className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-text-dim"
                    >
                      {technique}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
