import { Button, Tag } from '../components/ui'
import { LaptopMockup, PhoneMockup } from '../components/DeviceMockup'

// One stop per project: text card + device mockup.
// The project's 3D object renders in the fixed canvas behind, as an accent.
export default function Showcase({ p }) {
  return (
    <section id={p.id} data-stop data-tint={p.accent} data-label={p.title} data-number={p.number} className="relative flex min-h-[100svh] items-center">
      <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-[minmax(0,400px)_minmax(0,1fr)] md:items-center md:gap-12 md:py-24">
        {/* mockup: first on mobile, right column on desktop */}
        <div className="reveal md:order-2">
          <div className="hidden md:block">
            <LaptopMockup p={p} />
          </div>
          <div className="md:hidden">
            <PhoneMockup p={p} />
          </div>
        </div>

        <div
          className="reveal min-w-0 rounded-3xl border border-line/80 bg-ink/75 p-6 backdrop-blur-md md:order-1 md:bg-ink/55"
          style={{ '--accent': p.accent }}
        >
          <p className="font-display text-sm font-bold tracking-[0.25em] text-[var(--accent)]">{p.number} / PROJECT</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{p.title}</h2>
          <p className="mt-1 text-muted">{p.subtitle}</p>
          <p className="mt-4 text-sm leading-relaxed text-text/90">{p.description}</p>
          <ul className="mt-4 space-y-1.5 text-sm text-muted">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2"><span className="text-[var(--accent)]" aria-hidden>◆</span>{f}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">{p.tech.map((t) => <Tag key={t}>{t}</Tag>)}</div>
          {(p.live || p.github) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {p.live && <Button href={p.live}>Live Demo</Button>}
              {p.github && <Button href={p.github} variant="ghost">GitHub</Button>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
