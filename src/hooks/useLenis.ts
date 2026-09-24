import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import { useEffect } from 'react'

let activeLenis: Lenis | null = null

/** Initialises Lenis smooth scrolling for the page lifetime. Skipped entirely under reduced-motion. */
export function useLenis() {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    })
    activeLenis = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      activeLenis = null
    }
  }, [reduceMotion])
}

/** Smooth-scrolls to a section by id, routing through Lenis when it's active so in-page nav stays buttery. */
export function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return

  if (activeLenis) {
    activeLenis.scrollTo(target, { offset: 0 })
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
