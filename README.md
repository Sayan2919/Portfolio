# Sayan Hazra — Portfolio

Personal portfolio site, built as a chronological "journey" through Sayan's
career — from airspace simulation at ISRO/IISc to architecting multi-agent
AI systems today.

**Live:** https://sayan2919.github.io/Portfolio/

## Tech stack

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first config, see `src/index.css`)
- [Framer Motion](https://motion.dev/) for animation, [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- [lucide-react](https://lucide.dev/) for icons

## Local development

```bash
npm install
npm run dev       # starts a dev server, usually http://localhost:5173
npm run build     # type-checks and produces a production build in dist/
npm run preview   # serves the production build locally
npm run lint      # oxlint
```

> **Node version:** this project targets Node ^20.19 or >=22.12 (Vite 8's
> requirement). If `npm install`/`npm run build` fails with a
> `Cannot find native binding` error, it's a known npm bug with optional
> dependencies (https://github.com/npm/cli/issues/4828) — usually triggered
> by an out-of-range Node patch version. Fix: upgrade Node, or run
> `npm install @rolldown/binding-<your-platform> --no-save` (and the same
> for `@oxlint/binding-<your-platform>` if `npm run lint` fails the same
> way) to pull in the missing native binding directly.

## Editing content

**Every piece of copy on the site — name, roles, experience, education,
skills, languages, contact links — lives in one file:**
[`src/data/resume.ts`](src/data/resume.ts). Edit it there; no component has
hardcoded text. The experience and education arrays are stored
chronologically (oldest → newest) since the page reads as a story that
arrives at "today".

### Assets to add

Two files are referenced by the site but aren't committed (they're
personal/binary and belong to Sayan, not the repo template):

| File | Where it's used | Notes |
|---|---|---|
| `public/profile.jpg` | Hero photo | If missing, the hero shows an "SH" monogram instead — the site still works, it's just a graceful fallback. Square-ish, at least 400×400px. |
| `public/Sayan_Hazra_CV.pdf` | "Download CV" buttons (Hero + Contact) | If missing, those buttons hide themselves automatically (checked via a HEAD request on load). |

Drop both files in `public/` with those exact names, commit, and they pick
up automatically — no code changes needed.

### Double-check before relying on it

`contact.linkedin` in `src/data/resume.ts` is currently set to
`https://www.linkedin.com/in/sayan-hazra` — a best guess from the CV (which
only showed the display text "Sayan Hazra", not the underlying URL). Verify
it resolves to the right profile and update it if not.

## Design

Dark-first "glass + aurora" theme (drifting gradient blobs, frosted glass
cards, a cursor-reactive particle network in the hero) with a light mode
toggle in the nav — persisted in `localStorage`, seeded from
`prefers-color-scheme` on first visit. All color tokens live in
`src/index.css` as CSS custom properties, swapped via `[data-theme]`, so
new components should use the `bg-*`/`text-*`/`border-*`/`var(--*)` tokens
rather than hardcoded colors to stay theme-aware.

Every animation is disabled under `prefers-reduced-motion`.

## Deployment (CI/CD)

Hosted on **GitHub Pages**, deployed by GitHub Actions:

- [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) — on every
  push to `master`, builds the site and publishes `dist/` to Pages. Also
  runnable manually from the Actions tab (`workflow_dispatch`).
- [`.github/workflows/ci.yml`](.github/workflows/ci.yml) — on every pull
  request into `master`, runs lint + typecheck + build so broken PRs are
  caught before merge.

No manual deploy step — merge to `master` and the live site updates within
a minute or two. Check the **Actions** tab on GitHub to watch a deploy or
see why one failed.
