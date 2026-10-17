import { profile } from '../data/content'
import { Button } from '../components/ui'

export default function Hero() {
  return (
    <section id="top" data-stop data-label="Home" className="relative flex min-h-[100svh] items-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(11,15,26,0.85)_0%,rgba(11,15,26,0.4)_55%,transparent_80%)] md:bg-[linear-gradient(90deg,rgba(11,15,26,0.6)_0%,transparent_50%)]" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6">
        <p className="reveal mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan">{profile.location}</p>
        <h1 id="hero-name" className="text-5xl font-bold leading-[1.05] drop-shadow-[0_2px_20px_rgba(11,15,26,0.9)] sm:text-7xl">{profile.name}</h1>
        <p className="reveal mt-4 text-xl font-medium text-gold sm:text-2xl">{profile.role}</p>
        <p className="reveal mt-4 max-w-xl text-lg text-muted">{profile.tagline}</p>
        <div className="reveal mt-8 flex flex-wrap gap-3">
          <Button href="#spices">View My Work</Button>
          <Button href="#hire" variant="ghost">Hire Me</Button>
        </div>
      </div>
      <a href="#spices" aria-label="Scroll to projects" className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
        Scroll
        <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
      </a>
    </section>
  )
}
