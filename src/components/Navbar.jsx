import { useState } from 'react'
import { nav, profile } from '../data/content'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-ink/75 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <a href="#top" className="font-display text-lg font-bold">
          {profile.name.split(' ')[0]}<span className="text-gold">.</span>
        </a>
        <ul className="hidden gap-8 md:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className="text-sm text-muted transition-colors hover:text-gold">{n.label}</a>
            </li>
          ))}
        </ul>
        <button
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="relative block h-0.5 w-6 bg-text before:absolute before:-top-2 before:h-0.5 before:w-6 before:bg-text after:absolute after:top-2 after:h-0.5 after:w-6 after:bg-text" />
        </button>
      </nav>
      {open && (
        <ul className="border-t border-line bg-ink px-4 py-2 md:hidden">
          {nav.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} onClick={() => setOpen(false)} className="block py-3 text-muted hover:text-gold">{n.label}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
