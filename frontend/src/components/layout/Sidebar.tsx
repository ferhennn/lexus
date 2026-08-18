import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { primaryNav, secondaryNav } from '../../lib/nav'
import type { NavItem } from '../../lib/nav'

function NavRow({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  return (
    <NavLink
      to={item.path}
      end={item.path === '/'}
      onClick={onNavigate}
      className={({ isActive }) =>
        `block rounded-md px-3 py-2 text-sm transition-colors ${
          isActive
            ? 'bg-ink text-white'
            : 'text-ink/70 hover:bg-line/60 hover:text-ink'
        }`
      }
    >
      {item.label}
    </NavLink>
  )
}

export function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean
  onClose: () => void
}) {
  return (
    <>
      {mobileOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col justify-between border-r border-line bg-white px-3 py-4 transition-transform duration-200 ease-out lg:static lg:z-auto lg:w-60 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="mb-6 flex items-center justify-between px-3">
            <span className="text-lg font-semibold tracking-tight">NEXUS</span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-md p-1 text-mute hover:text-ink lg:hidden"
            >
              <X size={18} />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <NavRow key={item.path} item={item} onNavigate={onClose} />
            ))}
          </nav>
        </div>
        <nav className="flex flex-col gap-1 border-t border-line pt-3">
          {secondaryNav.map((item) => (
            <NavRow key={item.path} item={item} onNavigate={onClose} />
          ))}
        </nav>
      </aside>
    </>
  )
}
