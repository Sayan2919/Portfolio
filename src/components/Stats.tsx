import { stats } from '../data/resume'
import { CountUp, GlassCard, Reveal } from './primitives'

export function Stats() {
  return (
    <section aria-label="Impact at a glance" className="relative z-10">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <GlassCard className="flex h-full flex-col items-center gap-1 px-4 py-6 text-center" spotlight={false}>
                <span className="font-display gradient-text text-3xl font-bold sm:text-4xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-xs font-medium text-text-dim sm:text-sm">{stat.label}</span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
