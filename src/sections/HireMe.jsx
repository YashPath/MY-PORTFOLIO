import { useState } from 'react'
import { clientDemos, showcase, contact } from '../data/content'
import { LaptopMockup, PhoneMockup } from '../components/DeviceMockup'

const TYPES = clientDemos.types

// "Your business, my demo": a business owner picks their type and sees
// a real, live site I built for that kind of business.
export default function HireMe() {
  const [typeId, setTypeId] = useState(TYPES[0].id)
  const t = TYPES.find((x) => x.id === typeId)
  const p = showcase.find((x) => x.id === t.project)

  const wa = (text) => `${contact.whatsappLink}?text=${encodeURIComponent(text)}`
  const wantOne = wa(`Hi Yash, I saw your ${p.title} demo. I want a website like this for my ${t.noun}. Can we talk?`)
  const other = wa('Hi Yash, I run a business and want a website. Can we talk?')

  return (
    <section
      id="hire"
      data-stop
      data-tint={p.accent}
      data-label="Hire Me"
      className="relative flex min-h-[100svh] items-center"
      style={{ '--accent': p.accent }}
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="reveal max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold">For business owners</p>
          <h2 className="text-3xl font-bold [text-wrap:balance] sm:text-4xl">Run a business? See your website before you pay.</h2>
          <p className="mt-3 text-muted">Pick your business and open a real site I built for one like it. Yours gets your name, photos and prices.</p>
        </div>

        {/* business picker */}
        <div role="tablist" aria-label="Business type" className="reveal -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {TYPES.map((x) => {
            const on = x.id === typeId
            const acc = showcase.find((s) => s.id === x.project).accent
            return (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="hire-demo"
                onClick={() => setTypeId(x.id)}
                className={`min-h-11 shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                  on ? 'text-ink' : 'border-line bg-ink/60 text-muted hover:text-text'
                }`}
                style={on ? { background: acc, borderColor: acc } : undefined}
              >
                {x.label}
              </button>
            )
          })}
          <a
            href={other}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 shrink-0 items-center rounded-full border border-dashed border-line px-5 py-2 text-sm text-muted hover:border-gold hover:text-gold"
          >
            Something else? Message me
          </a>
        </div>

        <div id="hire-demo" role="tabpanel" className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,360px)] md:items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
          <div className="min-w-0" key={p.id}>
            <div className="hidden md:block"><LaptopMockup p={p} /></div>
            <div className="md:hidden"><PhoneMockup p={p} /></div>
          </div>

          <div className="min-w-0 rounded-3xl border border-line/80 bg-ink/75 p-6 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Demo: {p.title}</p>
            <h3 className="mt-2 text-xl font-bold sm:text-2xl">What your customers get</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-text/90">
              {t.points.map((pt) => (
                <li key={pt} className="flex gap-2.5">
                  <span className="mt-0.5 text-[var(--accent)]" aria-hidden>✓</span>
                  {pt}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">{clientDemos.startingPrice}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row md:flex-col">
              <a
                href={wantOne}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-[#062b14] hover:bg-[#3ee07a]"
              >
                I want one like this
              </a>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border border-line px-5 py-3 text-sm font-semibold text-text hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Open live demo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
