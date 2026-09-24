import { About } from './components/About'
import { Aurora } from './components/Aurora'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { JourneySpine } from './components/JourneySpine'
import { Languages } from './components/Languages'
import { Nav } from './components/Nav'
import { Origins } from './components/Origins'
import { ScrollProgress } from './components/ScrollProgress'
import { Skills } from './components/Skills'
import { Stats } from './components/Stats'
import { useLenis } from './hooks/useLenis'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()
  useLenis()

  return (
    <>
      <Aurora />
      <div aria-hidden className="noise-overlay" />
      <ScrollProgress />
      <Nav theme={theme} onToggleTheme={toggleTheme} />

      <main className="relative">
        <Hero />
        <Stats />
        <About />
        <Origins />
        <JourneySpine />
        <Skills />
        <Languages />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
