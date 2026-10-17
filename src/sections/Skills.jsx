import { skills } from '../data/content'
import { Tag } from '../components/ui'

// Accessible HTML list of every skill. The orbiting 3D labels render in the
// fixed canvas behind (right side on desktop, above the list on mobile).
export default function Skills() {
  const setHover = (v) => { window.__skillsHover = v }
  return (
    <section
      id="skills"
      data-stop
      data-tint="#7DE3F4"
      data-label="Skills"
      className="relative flex min-h-[100svh] scroll-mt-0 items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-[44svh] sm:px-6 lg:py-24">
        <div className="reveal max-w-xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Skills</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Tools I build with</h2>
          <p className="mt-3 text-muted">From C++ for problem solving to full-stack web apps, Android and AI/ML.</p>
        </div>
        <div className="reveal mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
          {skills.map((s) => (
            <div key={s.group} className="min-w-0 rounded-2xl border border-line/80 bg-ink/70 p-4 backdrop-blur-md">
              <h3 className="mb-2.5 text-sm font-semibold text-cyan">{s.group}</h3>
              <ul className="flex flex-wrap gap-1.5" aria-label={`${s.group} skills`}>
                {s.items.map((i) => <li key={i}><Tag>{i}</Tag></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
