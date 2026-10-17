export default function Loader() {
  return (
    <div className="fixed inset-0 -z-0 flex items-end justify-center bg-ink pb-6" aria-hidden>
      <div className="h-0.5 w-40 overflow-hidden rounded bg-line">
        <div className="h-full w-1/2 animate-[load_1s_ease-in-out_infinite] bg-gold" />
      </div>
    </div>
  )
}
