import { useEffect, useState } from 'react'

const GOLD = '#F5A524'

// Desktop-only rail on the right edge: one dot per [data-stop] section.
// The active dot fills with that section's accent and shows its label.
export default function ProgressRail() {
  const [stops, setStops] = useState([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = [...document.querySelectorAll('[data-stop]')]
    const projects = els.filter((el) => el.dataset.number)
    setStops(
      els.map((el) => ({
        id: el.id,
        label: el.dataset.label || el.id,
        number: el.dataset.number,
        color: el.dataset.tint || GOLD,
      })),
    )
    const total = String(projects.length).padStart(2, '0')
    setStops((s) => s.map((x) => ({ ...x, total })))

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const mid = window.scrollY + window.innerHeight * 0.5
        let a = 0
        els.forEach((el, i) => { if (el.offsetTop <= mid) a = i })
        setActive(a)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  if (!stops.length) return null
  const go = (id) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <nav aria-label="Section progress" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="absolute bottom-2 right-[7px] top-2 w-px bg-line" aria-hidden />
      <ol className="relative flex flex-col gap-5">
        {stops.map((s, i) => {
          const on = i === active
          const text = s.number ? `${s.number} / ${s.total}  ${s.label}` : s.label
          return (
            <li key={s.id} className="group flex items-center justify-end gap-3">
              <span
                className={`whitespace-nowrap rounded-full bg-ink/80 px-2.5 py-1 text-xs font-medium backdrop-blur transition-opacity duration-300 ${
                  on ? 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 2xl:opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
                }`}
                style={{ color: on ? s.color : undefined }}
                aria-hidden
              >
                {text}
              </span>
              <button
                type="button"
                onClick={() => go(s.id)}
                aria-label={`Go to ${s.label}`}
                aria-current={on ? 'true' : undefined}
                className="relative flex h-11 w-4 items-center justify-center"
              >
                <span
                  className="block h-[15px] w-[15px] rounded-full border-2 transition-all duration-300"
                  style={{
                    borderColor: on ? s.color : '#3a4566',
                    backgroundColor: on ? s.color : '#0B0F1A',
                    transform: on ? 'scale(1.15)' : 'scale(1)',
                    boxShadow: on ? `0 0 14px ${s.color}88` : 'none',
                  }}
                />
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
