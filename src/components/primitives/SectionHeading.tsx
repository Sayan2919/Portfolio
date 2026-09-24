import { Reveal } from './Reveal'

type SectionHeadingProps = {
  kicker: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

/** Chapter-style heading used at the top of every section: a small kicker label above a large title. */
export function SectionHeading({ kicker, title, description, align = 'left' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <Reveal className={`flex flex-col gap-4 ${alignment} max-w-2xl`}>
      <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-cyan">{kicker}</span>
      <h2 className="font-display text-3xl font-semibold sm:text-4xl md:text-5xl">{title}</h2>
      {description && <p className="text-base text-text-dim sm:text-lg">{description}</p>}
    </Reveal>
  )
}
