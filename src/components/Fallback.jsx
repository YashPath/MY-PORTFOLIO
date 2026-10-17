// Shown when WebGL isn't available: a static gradient backdrop.
export default function Fallback() {
  return (
    <div aria-hidden className="fixed inset-0 bg-ink bg-[radial-gradient(ellipse_at_70%_20%,rgba(125,227,244,0.16),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(245,165,36,0.14),transparent_55%)]" />
  )
}
