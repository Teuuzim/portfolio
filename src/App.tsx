import { About } from './components/About'
import { Automation } from './components/Automation'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { useLanguage } from './hooks/useLanguage'
import { useTheme } from './hooks/useTheme'

function App() {
  const { language, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <a href="#main-content" className="skip-link">
        {language === 'en' ? 'Skip to main content' : 'Ir para o conteúdo principal'}
      </a>
      <Navbar
        language={language}
        theme={theme}
        onLanguageToggle={toggleLanguage}
        onThemeToggle={toggleTheme}
      />
      <main id="main-content">
        <Hero language={language} />
        <About language={language} />
        <Skills language={language} />
        <Experience language={language} />
        <Automation language={language} />
        <Projects language={language} />
        <Education language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
    </>
  )
}

export default App
