import { useEffect, useRef, useState } from 'react'

// Project media lives in src/assets/projects/ and is bundled by Vite, so the URLs
// resolve from the script itself and work on any host or preview.
// content.js refers to files as '/projects/<name>'.
const bundled = import.meta.glob('../assets/projects/*', { eager: true, query: '?url', import: 'default' })
const asset = (src) => {
  if (!src) return src
  const name = src.split('/').pop()
  return bundled[`../assets/projects/${name}`] || (src.startsWith('/') ? import.meta.env.BASE_URL + src.slice(1) : src)
}
const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Placeholder({ title, accent }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-ink-2 text-center"
      style={{ backgroundImage: `radial-gradient(circle at 50% 40%, ${accent}33, transparent 65%)` }}
    >
      <div>
        <p className="font-display text-lg font-bold text-text sm:text-2xl">{title}</p>
        <p className="mt-1 text-xs text-muted">Preview coming soon</p>
      </div>
    </div>
  )
}

// Plays only while on screen; never autoplays with reduced motion.
function ScreenVideo({ src, poster, alt }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v || reduced) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload !== 'auto') v.preload = 'auto'
          v.play().catch(() => {})
        } else v.pause()
      },
      { threshold: 0.35 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      className="h-full w-full object-cover object-top"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
    />
  )
}

function Screen({ p, mobile }) {
  const [failed, setFailed] = useState(false)
  const img = asset(mobile ? p.imageMobile || p.image : p.image)
  const alt = `${p.title} ${mobile ? 'mobile' : 'homepage'} screenshot`
  if (!img || failed) return <Placeholder title={p.title} accent={p.accent} />
  if (!mobile && p.video) return <ScreenVideo src={asset(p.video)} poster={img} alt={`${p.title} scrolling preview`} />
  return (
    <img
      src={img}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover object-top"
    />
  )
}

export function LaptopMockup({ p }) {
  return (
    <div className="mockup-hover w-full" style={{ '--accent': p.accent }}>
      <div className="rounded-t-[14px] border border-[#2a3350] bg-[#05070d] p-[1.6%] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-ink-2">
          <Screen p={p} />
        </div>
      </div>
      <div className="relative mx-auto h-[10px] w-[112%] -translate-x-[5.4%] rounded-b-[14px] bg-gradient-to-b from-[#3a4566] to-[#1a2033]">
        <div className="absolute left-1/2 top-0 h-[4px] w-[14%] -translate-x-1/2 rounded-b-md bg-[#0b0f1a]" />
      </div>
    </div>
  )
}

export function PhoneMockup({ p }) {
  return (
    <div className="mx-auto w-[min(56vw,230px)]">
      <div className="rounded-[28px] border border-[#2a3350] bg-[#05070d] p-[6px] shadow-[0_24px_60px_-18px_rgba(0,0,0,0.85)]">
        <div className="relative aspect-[390/844] overflow-hidden rounded-[22px] bg-ink-2">
          <Screen p={p} mobile />
          <div className="absolute left-1/2 top-[6px] h-[14px] w-[30%] -translate-x-1/2 rounded-full bg-black/90" />
        </div>
      </div>
    </div>
  )
}
