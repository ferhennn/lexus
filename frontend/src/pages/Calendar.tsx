import { useMemo, useState } from 'react'
import { useAppStore } from '../store/useAppStore'

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const projectColors = ['bg-ink', 'bg-info', 'bg-success', 'bg-warning', 'bg-danger']

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function toISODate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function buildMonthGrid(year: number, month: number) {
  const firstOfMonth = new Date(year, month, 1)
  const start = new Date(year, month, 1 - firstOfMonth.getDay())
  const days: Date[] = []
  for (let i = 0; i < 42; i++) {
    days.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
  }
  return days
}

export function Calendar() {
  const projects = useAppStore((s) => s.projects)
  const sprints = useAppStore((s) => s.sprints)

  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  const days = useMemo(() => buildMonthGrid(year, month), [year, month])
  const todayIso = toISODate(today)

  const colorByProject = useMemo(() => {
    const map: Record<string, string> = {}
    projects.forEach((p, i) => {
      map[p.id] = projectColors[i % projectColors.length]
    })
    return map
  }, [projects])

  function sprintsOnDay(iso: string) {
    return sprints.filter((s) => iso >= s.startDate && iso <= s.endDate)
  }

  function goToMonth(delta: number) {
    const d = new Date(year, month + delta, 1)
    setYear(d.getFullYear())
    setMonth(d.getMonth())
  }

  function goToToday() {
    setYear(today.getFullYear())
    setMonth(today.getMonth())
  }

  const visibleSprints = sprints.filter((s) => {
    const monthStart = toISODate(new Date(year, month, 1))
    const monthEnd = toISODate(new Date(year, month + 1, 0))
    return s.startDate <= monthEnd && s.endDate >= monthStart
  })

  return (
    <div className="px-4 py-6 sm:px-8 sm:py-8 lg:px-16 lg:py-12">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-medium uppercase tracking-widest text-mute">Schedule</div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="rounded-md border border-line px-3 py-1.5 text-xs font-medium hover:bg-white"
          >
            Today
          </button>
          <button
            onClick={() => goToMonth(-1)}
            className="rounded-md border border-line px-2.5 py-1.5 text-xs font-medium hover:bg-white"
            aria-label="Previous month"
          >
            ←
          </button>
          <button
            onClick={() => goToMonth(1)}
            className="rounded-md border border-line px-2.5 py-1.5 text-xs font-medium hover:bg-white"
            aria-label="Next month"
          >
            →
          </button>
        </div>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
        {monthNames[month]} {year}
      </h1>

      {projects.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-4">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center gap-2 text-xs text-mute">
              <span className={`h-2.5 w-2.5 rounded-full ${colorByProject[p.id]}`} />
              {p.name}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 overflow-x-auto border border-line bg-white">
      <div className="grid min-w-[640px] grid-cols-7">
        {weekdayLabels.map((label) => (
          <div
            key={label}
            className="border-b border-line px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide text-mute"
          >
            {label}
          </div>
        ))}
        {days.map((day) => {
          const iso = toISODate(day)
          const inMonth = day.getMonth() === month
          const isToday = iso === todayIso
          const daySprints = sprintsOnDay(iso)

          return (
            <div
              key={iso}
              className={`min-h-20 sm:min-h-24 border-b border-r border-line p-2 ${
                inMonth ? 'bg-white' : 'bg-paper/60'
              }`}
            >
              <div
                className={`mb-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                  isToday ? 'bg-ink font-semibold text-white' : inMonth ? 'text-ink' : 'text-mute'
                }`}
              >
                {day.getDate()}
              </div>
              <div className="flex flex-col gap-1">
                {daySprints.map((s) => {
                  const project = projects.find((p) => p.id === s.projectId)
                  const isStart = iso === s.startDate
                  const isEnd = iso === s.endDate
                  return (
                    <div
                      key={s.id}
                      title={`${project?.name ?? 'Unknown project'} — Sprint ${s.number}: ${s.goal}`}
                      className={`truncate rounded px-1.5 py-0.5 text-[10px] font-medium text-white ${colorByProject[s.projectId]}`}
                    >
                      {isStart ? '▶ ' : ''}
                      Sprint {s.number}
                      {isEnd ? ' ◀' : ''}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-mute">
          Sprints this month
        </h2>
        {visibleSprints.length === 0 ? (
          <div className="border border-dashed border-line bg-white p-6 text-sm text-mute">
            No sprints scheduled in {monthNames[month]}.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {visibleSprints.map((s) => {
              const project = projects.find((p) => p.id === s.projectId)
              return (
                <div
                  key={s.id}
                  className="flex flex-col gap-1 border border-line bg-white px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${colorByProject[s.projectId]}`} />
                    <span className="font-medium">{project?.name}</span>
                    <span className="text-mute">Sprint {s.number} · {s.goal}</span>
                  </div>
                  <span className="shrink-0 text-xs text-mute">
                    {s.startDate} → {s.endDate}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
