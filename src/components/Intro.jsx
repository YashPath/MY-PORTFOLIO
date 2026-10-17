import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { profile } from '../data/content'

const KEY = 'yp-intro-seen'
function shouldPlay() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.scrollY > 40) return false
  try { return !sessionStorage.getItem(KEY) } catch { return true }
}

// First-load intro (~1.5 s): the name assembles letter by letter, then glides into
// the hero heading while the backdrop fades to reveal the mountains.
// Scroll, click, touch or any key skips it. It never blocks the page underneath.
export default function Intro() {
  const [play] = useState(shouldPlay)
  const [done, setDone] = useState(!play)
  const wrap = useRef(null)
  const name = useRef(null)

  useEffect(() => {
    const heroName = document.getElementById('hero-name')
    if (!play) {
      if (heroName) heroName.style.opacity = ''
      return
    }
    try { sessionStorage.setItem(KEY, '1') } catch { /* private mode: intro may replay, fine */ }
    if (heroName) heroName.style.opacity = '0'

    const letters = name.current.querySelectorAll('[data-l]')
    const tl = gsap.timeline({ onComplete: finish })
    tl.from(letters, { y: 40, opacity: 0, rotateX: -80, duration: 0.5, ease: 'power3.out', stagger: 0.035 })
    tl.add(() => {
      // FLIP: move the intro name onto the real hero heading
      if (!heroName) return
      const a = name.current.getBoundingClientRect()
      const b = heroName.getBoundingClientRect()
      gsap.to(name.current, {
        x: b.left - a.left + (b.width - a.width) / 2,
        y: b.top - a.top + (b.height - a.height) / 2,
        scale: b.height / a.height,
        duration: 0.6,
        ease: 'power3.inOut',
      })
    }, '+=0.15')
    tl.to(wrap.current, { backgroundColor: 'rgba(11,15,26,0)', duration: 0.6, ease: 'power2.out' }, '<')
    tl.to({}, { duration: 0.6 })

    function finish() {
      skip.done = true
      if (heroName) heroName.style.opacity = ''
      setDone(true)
    }
    function skip() {
      if (skip.done) return
      skip.done = true
      tl.kill()
      gsap.killTweensOf(name.current)
      finish()
    }
    const opts = { once: true, passive: true }
    // hard cap: the overlay never stays longer than 2.5 s, even on a slow device
    const cap = setTimeout(skip, 2500)
    const onScroll = () => { if (window.scrollY > 10) skip() }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', skip, opts)
    window.addEventListener('touchstart', skip, opts)
    window.addEventListener('pointerdown', skip, opts)
    window.addEventListener('keydown', skip, opts)
    return () => {
      tl.kill()
      clearTimeout(cap)
      window.removeEventListener('scroll', onScroll)
      ;['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((e) => window.removeEventListener(e, skip))
    }
  }, [play])

  if (done) return null
  return (
    <div
      ref={wrap}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-ink px-4"
      style={{ perspective: 600 }}
    >
      <h1 ref={name} className="origin-center whitespace-nowrap text-5xl font-bold leading-[1.05] sm:text-7xl">
        {profile.name.split('').map((ch, i) => (
          <span key={i} data-l className="inline-block">{ch === ' ' ? ' ' : ch}</span>
        ))}
      </h1>
    </div>
  )
}
