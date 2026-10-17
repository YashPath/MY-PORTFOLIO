export function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 md:py-28 ${className}`}>
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>}
      {title && <h2 className="mb-10 text-3xl font-bold sm:text-4xl">{title}</h2>}
      {children}
    </section>
  )
}

export function Button({ href, children, variant = 'primary', download, className = '', ...rest }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors min-h-11'
  const styles = {
    primary: 'bg-gold text-ink hover:bg-[#ffb83d]',
    ghost: 'border border-line text-text hover:border-gold hover:text-gold',
  }
  const external = href?.startsWith('http')
  return (
    <a
      href={href}
      className={`${base} ${styles[variant]} ${className}`}
      download={download}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}

export function Tag({ children }) {
  return <span className="rounded-full border border-line bg-ink-2 px-3 py-1 text-xs text-muted">{children}</span>
}
