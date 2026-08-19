interface MarqueeBandProps {
  items: string[]
  durationSeconds?: number
  className?: string
}

export function MarqueeBand({ items, durationSeconds = 18, className = '' }: MarqueeBandProps) {
  const track = [...items, ...items]

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap"
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="text-sm font-medium uppercase tracking-widest">{item}</span>
            <span className="text-sm text-white/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
