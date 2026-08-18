import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'

const CURRENT_USER = 'devendra'

const priorityColor: Record<string, string> = {
  URGENT: 'text-danger',
  HIGH: 'text-warning',
  MEDIUM: 'text-info',
  LOW: 'text-mute',
}

function TaskRow({ id, title, status, priority }: { id: string; title: string; status: string; priority: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line py-3 text-sm last:border-0">
      <div>
        <span className="mr-2 font-mono text-xs text-mute">{id}</span>
        <span>{title}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs font-medium ${priorityColor[priority]}`}>{priority}</span>
        <span className="text-xs text-mute">{status.replace('_', ' ')}</span>
      </div>
    </div>
  )
}

function EmptyRow({ text }: { text: string }) {
  return <div className="py-3 text-sm text-mute">{text}</div>
}

export function MyWork() {
  const tasks = useAppStore((s) => s.tasks).filter((t) => t.assigneeId === CURRENT_USER)
  const [suggestionDismissed, setSuggestionDismissed] = useState(false)

  const today = tasks.filter((t) => t.status === 'TODO' || t.status === 'IN_PROGRESS')
  const upcoming = tasks.filter((t) => t.status === 'BACKLOG')
  const completed = tasks.filter((t) => t.status === 'DONE')
  const blocked = tasks.filter((t) => t.blocked)

  return (
    <div className="px-4 py-6 sm:px-8 sm:py-8 lg:px-16 lg:py-12">
      <div className="mb-1 text-xs font-medium uppercase tracking-widest text-mute">
        Personal
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">My Work</h1>

      {!suggestionDismissed && (
        <div className="mt-8 border border-accent/40 bg-accent/10 p-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink/60">
            AI Suggestions
          </h2>
          <p className="text-base leading-snug text-ink">
            You have {today.length} active task{today.length === 1 ? '' : 's'} this sprint.
            Consider moving low-priority documentation to next sprint to protect delivery
            focus.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => setSuggestionDismissed(true)}
              className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-black"
            >
              Apply
            </button>
            <button
              onClick={() => setSuggestionDismissed(true)}
              className="rounded-md border border-line px-4 py-2 text-sm font-medium hover:bg-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <section className="border border-line bg-white p-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-mute">
            Today
          </h2>
          {today.length ? (
            today.map((t) => <TaskRow key={t.id} {...t} />)
          ) : (
            <EmptyRow text="Nothing due today. Clear runway." />
          )}
        </section>

        <section className="border border-line bg-white p-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-mute">
            Upcoming
          </h2>
          {upcoming.length ? (
            upcoming.map((t) => <TaskRow key={t.id} {...t} />)
          ) : (
            <EmptyRow text="Nothing scheduled in the next 7 days." />
          )}
        </section>

        <section className="border border-line bg-white p-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-mute">
            Recently Completed
          </h2>
          {completed.length ? (
            completed.map((t) => <TaskRow key={t.id} {...t} />)
          ) : (
            <EmptyRow text="Nothing completed yet." />
          )}
        </section>

        <section className="border border-line bg-white p-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-mute">
            Blocked
          </h2>
          {blocked.length ? (
            blocked.map((t) => <TaskRow key={t.id} {...t} />)
          ) : (
            <EmptyRow text="Nothing blocked. Good sign." />
          )}
        </section>
      </div>
    </div>
  )
}
