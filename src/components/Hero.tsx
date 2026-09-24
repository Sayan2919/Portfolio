import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown, Download, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { contact, profile } from '../data/resume'
import { useAssetExists } from '../hooks/useAssetExists'
import { scrollToSection } from '../hooks/useLenis'
import { LinkedinIcon } from './icons/BrandIcons'
import { MagneticButton } from './primitives'
import { NeuralCanvas } from './NeuralCanvas'

const NAME_LETTERS = profile.name.split('')
const cvHref = `${import.meta.env.BASE_URL}${profile.cv}`

function RoleRotator() {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % profile.roles.length)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="font-display flex h-8 items-center justify-center text-base font-medium text-cyan sm:h-9 sm:text-lg md:justify-start">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[index]}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -14 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function ProfilePhoto() {
  const [imgError, setImgError] = useState(false)
  const src = `${import.meta.env.BASE_URL}${profile.photo}`

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto h-32 w-32 shrink-0 sm:h-36 sm:w-36 md:mx-0"
    >
      <motion.div
        aria-hidden
        className="absolute -inset-1.5 rounded-full opacity-90"
        style={{
          background: 'conic-gradient(from 0deg, var(--violet), var(--cyan), var(--emerald), var(--violet))',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-[3px] overflow-hidden rounded-full bg-bg-elevated">
        {imgError ? (
          <div className="font-display flex h-full w-full items-center justify-center text-3xl font-bold text-text">
            {profile.initials}
          </div>
        ) : (
          <img
            src={src}
            alt={profile.name}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>
    </motion.div>
  )
}

export function Hero() {
  const cvExists = useAssetExists(cvHref)

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      <NeuralCanvas className="absolute inset-0 h-full w-full opacity-70" />

      <div className="container-page relative z-10 flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:gap-14 md:text-left">
        <ProfilePhoto />

        <div className="flex flex-1 flex-col items-center gap-5 md:items-start">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-text-dim"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
            {profile.kicker}
          </motion.span>

          <h1 className="font-display gradient-text text-glow text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {NAME_LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.035, ease: [0.16, 1, 0.3, 1] }}
              >
                {letter === ' ' ? ' ' : letter}
              </motion.span>
            ))}
          </h1>

          <RoleRotator />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="max-w-xl text-balance text-base text-text-dim sm:text-lg"
          >
            {profile.bridgeLine}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            {cvExists && (
              <MagneticButton as="a" href={cvHref} download variant="solid">
                <Download size={16} />
                Download CV
              </MagneticButton>
            )}
            <MagneticButton
              as="a"
              href={`mailto:${contact.email}`}
              variant={cvExists ? 'ghost' : 'solid'}
            >
              <Mail size={16} />
              Contact
            </MagneticButton>
            <MagneticButton as="a" href={contact.linkedin} target="_blank" rel="noreferrer" variant="ghost">
              <LinkedinIcon size={16} />
              LinkedIn
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToSection('origins')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.4, duration: 0.6 }, y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute inset-x-0 bottom-6 z-10 mx-auto flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-text-faint transition-colors hover:text-text-dim"
      >
        <span className="flex items-center gap-1">
          Scroll to begin
          <ArrowRight size={12} className="rotate-90" />
        </span>
        <ChevronDown size={16} />
      </motion.button>
    </section>
  )
}
