export function PagePlaceholder({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return (
    <div className="px-16 py-12">
      <div className="mb-2 text-xs font-medium uppercase tracking-widest text-mute">
        {eyebrow}
      </div>
      <h1 className="text-5xl font-semibold tracking-tight text-ink">
        {title}
      </h1>
    </div>
  )
}
