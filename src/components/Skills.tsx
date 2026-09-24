import { Bot, Brain, Cloud, Code2, Database, Layers, type LucideIcon } from 'lucide-react'
import { skillCategories, type SkillCategory } from '../data/resume'
import { GlassCard, Reveal, SectionHeading } from './primitives'

const iconMap: Record<SkillCategory['icon'], LucideIcon> = {
  sparkles: Bot,
  layers: Layers,
  brain: Brain,
  database: Database,
  cloud: Cloud,
  code: Code2,
}

export function Skills() {
  return (
    <section id="arsenal" className="relative z-10 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          kicker="The Arsenal"
          title="Tools gathered along the way"
          description="Every chapter added something to the toolkit — this is what ships production AI systems today."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => {
            const Icon = iconMap[category.icon]
            return (
              <Reveal key={category.id} delay={(i % 3) * 0.08}>
                <GlassCard className="flex h-full flex-col gap-4 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-soft text-violet">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-text sm:text-lg">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-dim transition-colors hover:border-violet/40 hover:text-text"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
