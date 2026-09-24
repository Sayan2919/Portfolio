import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { navLinks } from '../data/resume'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollToSection } from '../hooks/useLenis'
import type { Theme } from '../hooks/useTheme'
import { ThemeToggle } from './ThemeToggle'

const sectionIds = navLinks.map((link) => link.id)

type NavProps = {
  theme: Theme
  onToggleTheme: () => void
}

export function Nav({ theme, onToggleTheme }: NavProps) {
  const [open, setOpen] = useState(false)
  const activeId = useActiveSection(sectionIds)

  function scrollTo(id: string) {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 sm:top-6">
      <nav className="glass flex w-full max-w-xl items-center justify-between gap-2 rounded-full px-3 py-2 sm:px-4">
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--violet),var(--cyan))] text-sm font-bold text-white"
          aria-label="Scroll to top"
        >
          SH
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => scrollTo(link.id)}
                className={`font-display relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeId === link.id ? 'text-text' : 'text-text-dim hover:text-text'
                }`}
              >
                {activeId === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-surface"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-violet/50 md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="glass absolute top-16 w-[calc(100%-2rem)] max-w-xl rounded-2xl p-2 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className={`font-display w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                      activeId === link.id ? 'bg-surface text-text' : 'text-text-dim hover:text-text'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
