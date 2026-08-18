import { NavLink } from 'react-router-dom'
import { primaryNav, secondaryNav } from '../../lib/nav'
import type { NavItem } from '../../lib/nav'

function NavRow({ item }: { item: NavItem }) {
  return (
    <NavLink
      to={item.path}
      end={item.path === '/'}
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

export function Sidebar() {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col justify-between border-r border-line bg-white px-3 py-4">
      <div>
        <div className="mb-6 px-3 text-lg font-semibold tracking-tight">
          NEXUS
        </div>
        <nav className="flex flex-col gap-1">
          {primaryNav.map((item) => (
            <NavRow key={item.path} item={item} />
          ))}
        </nav>
      </div>
      <nav className="flex flex-col gap-1 border-t border-line pt-3">
        {secondaryNav.map((item) => (
          <NavRow key={item.path} item={item} />
        ))}
      </nav>
    </aside>
  )
}
