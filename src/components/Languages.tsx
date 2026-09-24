import { motion } from 'framer-motion'
import { cefrScale, languages, type CefrLevel, type LanguageEntry } from '../data/resume'
import { GlassCard, Reveal, SectionHeading } from './primitives'

const skillRows: { key: keyof LanguageEntry; label: string }[] = [
  { key: 'listening', label: 'Listening' },
  { key: 'reading', label: 'Reading' },
  { key: 'spokenProduction', label: 'Speaking' },
  { key: 'spokenInteraction', label: 'Interaction' },
  { key: 'writing', label: 'Writing' },
]

function ProficiencyBar({ level, delay }: { level: CefrLevel; delay: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--violet),var(--cyan))]"
          initial={{ width: '0%' }}
          whileInView={{ width: `${cefrScale[level]}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="font-display w-8 shrink-0 text-right text-xs font-semibold text-text-dim">{level}</span>
    </div>
  )
}

export function Languages() {
  return (
    <section id="languages" className="relative z-10 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          kicker="How I Communicate"
          title="Languages across the journey"
          description="CEFR proficiency levels — A1/A2 basic user, B1/B2 independent user, C1/C2 proficient user."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {languages.map((lang, i) => (
            <Reveal key={lang.id} delay={i * 0.08}>
              <GlassCard className="flex h-full flex-col gap-4 p-6" spotlight={false}>
                <h3 className="font-display text-lg font-semibold text-text">{lang.name}</h3>

                {lang.isMotherTongue ? (
                  <span className="font-display inline-flex w-fit items-center gap-2 rounded-full bg-emerald-soft px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-emerald">
                    Mother Tongue
                  </span>
                ) : (
                  <div className="flex flex-col gap-3">
                    {skillRows.map((row, rowIndex) => {
                      const level = lang[row.key] as CefrLevel | undefined
                      if (!level) return null
                      return (
                        <div key={row.key} className="flex flex-col gap-1.5">
                          <span className="text-xs font-medium text-text-faint">{row.label}</span>
                          <ProficiencyBar level={level} delay={rowIndex * 0.08} />
                        </div>
                      )
                    })}
                  </div>
                )}
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
