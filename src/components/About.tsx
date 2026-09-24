import { MapPin, Cake, Globe2, Languages as LanguagesIcon } from 'lucide-react'
import { profile } from '../data/resume'
import { GlassCard, Reveal, SectionHeading } from './primitives'

const quickFacts = [
  { icon: MapPin, label: 'Based in', value: profile.location },
  { icon: Globe2, label: 'Nationality', value: profile.nationality },
  { icon: Cake, label: 'Born', value: profile.dateOfBirth },
  { icon: LanguagesIcon, label: 'Mother tongue', value: 'Bengali' },
]

export function About() {
  return (
    <section id="about" className="relative z-10 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading kicker="Who I Am" title="The engineer behind the systems" />

        <div className="mt-10 grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <Reveal delay={0.1}>
            <GlassCard className="h-full p-6 sm:p-8" spotlight={false}>
              <p className="text-base leading-relaxed text-text-dim sm:text-lg">{profile.summary}</p>
            </GlassCard>
          </Reveal>

          <div className="grid grid-cols-2 gap-3">
            {quickFacts.map((fact, i) => (
              <Reveal key={fact.label} delay={0.15 + i * 0.05}>
                <GlassCard className="flex h-full flex-col gap-2 p-4" spotlight={false}>
                  <fact.icon size={18} className="text-cyan" />
                  <span className="text-xs font-medium uppercase tracking-wide text-text-faint">{fact.label}</span>
                  <span className="font-display text-sm font-semibold text-text sm:text-base">{fact.value}</span>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
