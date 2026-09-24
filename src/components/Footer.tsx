import { profile } from '../data/resume'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-border py-8">
      <div className="container-page flex flex-col items-center justify-between gap-3 text-center text-xs text-text-faint sm:flex-row sm:text-left">
        <span>
          © {year} {profile.name}. All rights reserved.
        </span>
        <span>Built with React &amp; Framer Motion · Deployed via GitHub Actions</span>
      </div>
    </footer>
  )
}
