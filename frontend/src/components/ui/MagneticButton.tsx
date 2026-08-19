import { useRef, useState, type ButtonHTMLAttributes } from 'react'

type MagneticButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  pull?: number
}

export function MagneticButton({ pull = 14, className = '', children, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    setOffset({ x: relX * pull, y: relY * pull })
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 })
  }

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
}
