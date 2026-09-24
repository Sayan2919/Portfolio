import { Check, Copy, Download, Mail, Phone } from 'lucide-react'
import { useState } from 'react'
import { contact, profile } from '../data/resume'
import { useAssetExists } from '../hooks/useAssetExists'
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons'
import { GlassCard, MagneticButton, Reveal, SectionHeading } from './primitives'

const cvHref = `${import.meta.env.BASE_URL}${profile.cv}`

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API unavailable — the mailto link on the card still works.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy email address"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-dim transition-colors hover:border-violet/50 hover:text-text"
    >
      {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
    </button>
  )
}

const links = [
  { icon: LinkedinIcon, label: 'LinkedIn', value: contact.linkedinLabel, href: contact.linkedin },
  { icon: GithubIcon, label: 'GitHub', value: contact.githubLabel, href: contact.github },
]

export function Contact() {
  const cvExists = useAssetExists(cvHref)

  return (
    <section id="contact" className="relative z-10 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          kicker="Next Chapter"
          title="Let's write what comes next"
          description="Open to conversations about multi-agent systems, RAG architecture, and teams shipping Generative AI at scale."
        />

        <Reveal delay={0.1} className="mt-12">
          <GlassCard className="grid gap-6 p-6 sm:p-10 md:grid-cols-2" spotlight={false}>
            <div className="flex flex-col justify-between gap-6">
              <div>
                <h3 className="font-display text-2xl font-semibold text-text sm:text-3xl">
                  Have a role, a problem, or an idea worth building?
                </h3>
                <p className="mt-3 text-text-dim">
                  The inbox is open. Reach out directly, or grab the full CV for the details this page keeps concise.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <MagneticButton as="a" href={`mailto:${contact.email}`} variant="solid">
                  <Mail size={16} />
                  Say Hello
                </MagneticButton>
                {cvExists && (
                  <MagneticButton as="a" href={cvHref} download variant="ghost">
                    <Download size={16} />
                    Download CV
                  </MagneticButton>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3.5">
                <a href={`mailto:${contact.email}`} className="flex min-w-0 items-center gap-3 text-sm text-text">
                  <Mail size={16} className="shrink-0 text-cyan" />
                  <span className="truncate">{contact.email}</span>
                </a>
                <CopyEmailButton />
              </div>

              <a
                href={`tel:${contact.phoneHref}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 text-sm text-text transition-colors hover:border-violet/40"
              >
                <Phone size={16} className="shrink-0 text-cyan" />
                {contact.phone}
              </a>

              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 text-sm text-text transition-colors hover:border-violet/40"
                >
                  <link.icon size={16} className="shrink-0 text-cyan" />
                  {link.value}
                </a>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
