import { useState } from 'react'

type Category = 'MENTIONS' | 'TASKS' | 'PROJECTS' | 'AI' | 'SYSTEM'

interface Notification {
  id: number
  category: Category
  text: string
  time: string
  read: boolean
  archived: boolean
}

const initialNotifications: Notification[] = [
  { id: 1, category: 'MENTIONS', text: 'Vidhi mentioned you in TASK-182', time: '12m ago', read: false, archived: false },
  { id: 2, category: 'AI', text: 'AI detected a sprint risk', time: '1h ago', read: false, archived: false },
  { id: 3, category: 'SYSTEM', text: 'Sprint 08 ends in 3 days', time: '3h ago', read: false, archived: false },
  { id: 4, category: 'TASKS', text: 'Palak completed TASK-193', time: '5h ago', read: true, archived: false },
  { id: 5, category: 'PROJECTS', text: 'You were added to AI Commerce Platform', time: '1d ago', read: true, archived: false },
  { id: 6, category: 'AI', text: 'AI generated sprint documentation for Sprint 08', time: '1d ago', read: true, archived: false },
  { id: 7, category: 'MENTIONS', text: 'Achal mentioned you in a comment on TASK-186', time: '2d ago', read: true, archived: false },
]

const tabs: { key: 'ALL' | Category; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'MENTIONS', label: 'Mentions' },
  { key: 'TASKS', label: 'Tasks' },
  { key: 'PROJECTS', label: 'Projects' },
  { key: 'AI', label: 'AI' },
  { key: 'SYSTEM', label: 'System' },
]

const categoryColor: Record<Category, string> = {
  MENTIONS: 'text-info',
  TASKS: 'text-ink',
  PROJECTS: 'text-ink',
  AI: 'text-ink',
  SYSTEM: 'text-mute',
}

export function Inbox() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [tab, setTab] = useState<'ALL' | Category>('ALL')

  const visible = notifications.filter(
    (n) => !n.archived && (tab === 'ALL' || n.category === tab),
  )
  const unreadCount = notifications.filter((n) => !n.read && !n.archived).length

  function markRead(id: number) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  function archive(id: number) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, archived: true } : n)))
  }

  return (
    <div className="px-16 py-12">
      <div className="mb-1 text-xs font-medium uppercase tracking-widest text-mute">
        Notifications
      </div>
      <h1 className="text-5xl font-semibold tracking-tight text-ink">Inbox</h1>
      {unreadCount > 0 && (
        <p className="mt-3 text-sm text-mute">{unreadCount} unread</p>
      )}

      <div className="mt-8 flex gap-1 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium ${
              tab === t.key
                ? 'border-b-2 border-ink text-ink'
                : 'text-mute hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 border border-line bg-white">
        {visible.length === 0 && (
          <div className="p-8 text-sm text-mute">Nothing here.</div>
        )}
        {visible.map((n) => (
          <div
            key={n.id}
            className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-0"
          >
            <div className="flex items-center gap-3">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-transparent' : 'bg-accent'}`}
              />
              <div>
                <span className={`mr-2 text-xs font-semibold uppercase tracking-wide ${categoryColor[n.category]}`}>
                  {n.category}
                </span>
                <span className={`text-sm ${n.read ? 'text-ink/70' : 'font-medium text-ink'}`}>
                  {n.text}
                </span>
                <div className="mt-0.5 text-xs text-mute">{n.time}</div>
              </div>
            </div>
            <div className="flex shrink-0 gap-2 text-xs">
              {!n.read && (
                <button
                  onClick={() => markRead(n.id)}
                  className="rounded-md border border-line px-3 py-1.5 font-medium hover:bg-paper"
                >
                  Mark read
                </button>
              )}
              <button
                onClick={() => archive(n.id)}
                className="rounded-md border border-line px-3 py-1.5 font-medium hover:bg-paper"
              >
                Archive
              </button>
              <button className="rounded-md bg-ink px-3 py-1.5 font-medium text-white hover:bg-black">
                Open
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
