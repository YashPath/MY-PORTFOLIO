import { lazy, Suspense, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import Fallback from './components/Fallback'
import Intro from './components/Intro'
import ProgressRail from './components/ProgressRail'
import Hero from './sections/Hero'
import Showcase from './sections/Showcase'
import HireMe from './sections/HireMe'
import Contact from './sections/Contact'
import { profile, showcase } from './data/content'

gsap.registerPlugin(ScrollTrigger)
const Scene = lazy(() => import('./three/Scene'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch { return false }
}

export default function App() {
  const [webgl] = useState(hasWebGL)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {webgl ? (
        <Suspense fallback={<Loader />}>
          <Scene items={showcase} firstStop={1} stops={showcase.length + 3} />
        </Suspense>
      ) : <Fallback />}
      <Intro />
      <Navbar />
      <ProgressRail />
      <main className="relative z-10">
        <Hero />
        {showcase.map((p) => <Showcase key={p.id} p={p} />)}
        <HireMe />
        <Contact />
      </main>
      <footer className="relative z-10 py-6 text-center text-xs text-muted">© {new Date().getFullYear()} {profile.name}</footer>
    </>
  )
}
