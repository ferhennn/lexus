import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { useAppStore } from '../../store/useAppStore'

export function NewProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const addProject = useAppStore((s) => s.addProject)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    addProject({ name: name.trim(), description: description.trim() })
    setName('')
    setDescription('')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="New Project">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-mute">
            Name
          </label>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-ink"
            placeholder="AI Commerce Platform"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-mute">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-ink"
            placeholder="What are you building?"
          />
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-line px-4 py-2 text-sm font-medium hover:bg-paper"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-black"
          >
            Create Project
          </button>
        </div>
      </form>
    </Modal>
  )
}
