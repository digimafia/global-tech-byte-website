import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { CustomCursor } from './components/layout/CustomCursor'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { BackToTop } from './components/layout/BackToTop'
import { ScrollToTop } from './components/layout/ScrollToTop'
import { Home } from './pages/Home'

// Home is eager (it's the primary landing page / LCP path). Everything else
// is route-split so visitors landing on '/' don't pay for the JS of pages
// they may never visit — a Core Web Vitals win with no visual change.
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })))
const Work = lazy(() => import('./pages/Work').then((m) => ({ default: m.Work })))
const Careers = lazy(() => import('./pages/Careers').then((m) => ({ default: m.Careers })))
const Internships = lazy(() => import('./pages/Internships').then((m) => ({ default: m.Internships })))
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })))
const Legal = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Legal })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only rounded-full bg-[var(--color-orange)] px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<Legal title="Privacy Policy" path="/privacy-policy" />} />
            <Route path="/terms" element={<Legal title="Terms & Conditions" path="/terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
