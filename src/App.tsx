import { MotionConfig } from 'motion/react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Reveal } from './components/Reveal'
import { ScrollProgress } from './components/ScrollProgress'
import { Skills } from './components/Skills'
import { useLanguage } from './hooks/useLanguage'
import { useTheme } from './hooks/useTheme'

function App() {
  const { language, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        {language === 'en' ? 'Skip to main content' : 'Ir para o conteúdo principal'}
      </a>
      <ScrollProgress />
      <Navbar
        language={language}
        theme={theme}
        onLanguageToggle={toggleLanguage}
        onThemeToggle={toggleTheme}
      />
      <main id="main-content">
        <Hero language={language} />
        <Reveal><About language={language} /></Reveal>
        <Reveal><Skills language={language} /></Reveal>
        <Reveal><Experience language={language} /></Reveal>
        <Reveal><Projects language={language} /></Reveal>
        <Reveal><Education language={language} /></Reveal>
        <Reveal><Contact language={language} /></Reveal>
      </main>
      <Footer language={language} />
    </MotionConfig>
  )
}

export default App
