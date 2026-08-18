import { sprint } from '../lib/mockData'

export function Sprints() {
  return (
    <div className="px-16 py-12">
      <div className="mb-1 text-xs font-medium uppercase tracking-widest text-mute">
        Delivery
      </div>
      <h1 className="text-5xl font-semibold tracking-tight text-ink">Sprints</h1>

      <div className="mt-10 border border-line bg-white p-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-mute">
          Sprint {sprint.number}
        </div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">{sprint.goal}</h2>
        <p className="mt-2 text-sm text-mute">
          {sprint.startDate} → {sprint.endDate}
        </p>

        <div className="mt-6 grid grid-cols-4 gap-8 border-t border-line pt-6">
          <div>
            <div className="mb-1 text-xs uppercase tracking-wide text-mute">Committed</div>
            <div className="text-2xl font-semibold">{sprint.committedPoints} pts</div>
          </div>
          <div>
            <div className="mb-1 text-xs uppercase tracking-wide text-mute">Completed</div>
            <div className="text-2xl font-semibold">{sprint.completedPoints} pts</div>
          </div>
          <div>
            <div className="mb-1 text-xs uppercase tracking-wide text-mute">Remaining</div>
            <div className="text-2xl font-semibold">{sprint.remainingPoints} pts</div>
          </div>
          <div>
            <div className="mb-1 text-xs uppercase tracking-wide text-mute">Velocity</div>
            <div className="text-2xl font-semibold">{sprint.velocity}</div>
          </div>
        </div>

        <div className="mt-6 h-2 w-full rounded-full bg-line">
          <div
            className="h-2 rounded-full bg-ink"
            style={{ width: `${Math.round((sprint.completedPoints / sprint.committedPoints) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
