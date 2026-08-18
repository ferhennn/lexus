import { useState } from 'react'
import { members } from '../lib/mockData'
import { useAppStore } from '../store/useAppStore'
import { NewProjectModal } from '../components/project/NewProjectModal'

const healthColor: Record<string, string> = {
  ON_TRACK: 'text-success',
  AT_RISK: 'text-warning',
  OFF_TRACK: 'text-danger',
}

const healthLabel: Record<string, string> = {
  ON_TRACK: 'On Track',
  AT_RISK: 'At Risk',
  OFF_TRACK: 'Off Track',
}

export function Projects() {
  const projects = useAppStore((s) => s.projects)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="px-16 py-12">
      <div className="mb-1 flex items-center justify-between">
        <div className="text-xs font-medium uppercase tracking-widest text-mute">
          Workspace
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-black"
        >
          + New Project
        </button>
      </div>
      <h1 className="text-5xl font-semibold tracking-tight text-ink">Projects</h1>

      <div className="mt-12 flex flex-col gap-6">
        {projects.map((project, i) => (
          <div key={project.id} className="border border-line bg-white p-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-mute">
              Project {String(i + 1).padStart(2, '0')}
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">{project.name}</h2>
            <p className="mt-2 max-w-xl text-sm text-mute">
              {project.description || 'No description yet.'}
            </p>

            <div className="mt-6 grid grid-cols-5 gap-8 border-t border-line pt-6 text-sm">
              <div>
                <div className="mb-1 text-xs uppercase tracking-wide text-mute">Progress</div>
                <div className="text-lg font-medium">{project.progress}%</div>
              </div>
              <div>
                <div className="mb-1 text-xs uppercase tracking-wide text-mute">Sprint</div>
                <div className="text-lg font-medium">
                  {project.sprintNumber ? `Sprint ${project.sprintNumber}` : '—'}
                </div>
              </div>
              <div>
                <div className="mb-1 text-xs uppercase tracking-wide text-mute">Members</div>
                <div className="text-lg font-medium">{project.memberCount}</div>
              </div>
              <div>
                <div className="mb-1 text-xs uppercase tracking-wide text-mute">Health</div>
                <div className={`text-lg font-medium ${healthColor[project.health]}`}>
                  {healthLabel[project.health]}
                </div>
              </div>
              <div>
                <div className="mb-1 text-xs uppercase tracking-wide text-mute">Team</div>
                <div className="flex -space-x-2">
                  {members.slice(0, 4).map((m) => (
                    <div
                      key={m.id}
                      title={m.name}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-ink text-xs font-medium text-white"
                    >
                      {m.initials}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <NewProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
