import { useCallback, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Greeting } from './components/Greeting'
import { Header } from './components/Header'
import { Projects } from './components/Projects'
import { ScrollToTop } from './components/ScrollToTop'
import { Skills } from './components/Skills'
import { SplashScreen } from './components/SplashScreen'
import { splash } from './data/profile'
import { translations } from './data/translations'
import { useLanguage } from './hooks/useLanguage'
import { useTheme } from './hooks/useTheme'

function App() {
  const { language, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  // The intro screen is skipped for reduced motion: it's pure delay there.
  const [splashDone, setSplashDone] = useState(
    () => !splash.enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const finishSplash = useCallback(() => setSplashDone(true), [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        {language === 'en' ? 'Skip to main content' : 'Ir para o conteúdo principal'}
      </a>
      <Header
        language={language}
        theme={theme}
        onLanguageToggle={toggleLanguage}
        onThemeToggle={toggleTheme}
      />
      {/* overflow-x-clip keeps the side slide-ins from widening the page on mobile. */}
      <main id="main-content" className="overflow-x-clip">
        <Greeting language={language} play={splashDone} />
        <Skills language={language} />
        <Education language={language} />
        <Experience language={language} />
        <Projects language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
      <ScrollToTop label={translations[language].footer.backToTop} />
      <AnimatePresence>{!splashDone && <SplashScreen onDone={finishSplash} />}</AnimatePresence>
    </MotionConfig>
  )
}

export default App
