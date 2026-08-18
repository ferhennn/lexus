import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Project, Task, TaskPriority, TaskStatus } from '../lib/mockData'

const seedProjects: Project[] = [
  {
    id: 'ai-commerce',
    name: 'AI Commerce Platform',
    description: 'Building an intelligent commerce platform for independent retailers.',
    status: 'ACTIVE',
    health: 'ON_TRACK',
    progress: 68,
    sprintNumber: 8,
    memberCount: 12,
  },
]

const seedTasks: Task[] = [
  { id: 'TASK-184', projectId: 'ai-commerce', title: 'Design authentication flow', status: 'DONE', priority: 'HIGH', storyPoints: 5, assigneeId: 'vidhi', labels: ['design', 'auth'] },
  { id: 'TASK-185', projectId: 'ai-commerce', title: 'Create PostgreSQL schema', status: 'DONE', priority: 'HIGH', storyPoints: 3, assigneeId: 'achal', labels: ['backend', 'database'] },
  { id: 'TASK-186', projectId: 'ai-commerce', title: 'Implement JWT authentication', status: 'IN_PROGRESS', priority: 'URGENT', storyPoints: 8, assigneeId: 'achal', labels: ['backend', 'security'] },
  { id: 'TASK-187', projectId: 'ai-commerce', title: 'Build project dashboard', status: 'IN_REVIEW', priority: 'MEDIUM', storyPoints: 8, assigneeId: 'vidhi', labels: ['frontend'] },
  { id: 'TASK-188', projectId: 'ai-commerce', title: 'Integrate payment API', status: 'TODO', priority: 'URGENT', storyPoints: 13, assigneeId: 'achal', labels: ['backend', 'payments'], blocked: true },
  { id: 'TASK-189', projectId: 'ai-commerce', title: 'Write API documentation', status: 'TODO', priority: 'LOW', storyPoints: 3, assigneeId: 'devendra', labels: ['docs'], aiGenerated: true },
  { id: 'TASK-190', projectId: 'ai-commerce', title: 'Create QA test suite', status: 'TESTING', priority: 'HIGH', storyPoints: 5, assigneeId: 'palak', labels: ['qa'] },
]

export interface Team {
  id: string
  name: string
  memberIds: string[]
  projectIds: string[]
}

const seedTeams: Team[] = [
  {
    id: 'core-engineering',
    name: 'Core Engineering',
    memberIds: ['devendra', 'achal', 'vidhi', 'palak'],
    projectIds: ['ai-commerce'],
  },
]

export type NotificationCategory = 'MENTIONS' | 'TASKS' | 'PROJECTS' | 'AI' | 'SYSTEM'

export interface Notification {
  id: number
  category: NotificationCategory
  text: string
  time: string
  read: boolean
  archived: boolean
}

const seedNotifications: Notification[] = [
  { id: 1, category: 'MENTIONS', text: 'Vidhi mentioned you in TASK-182', time: '12m ago', read: false, archived: false },
  { id: 2, category: 'AI', text: 'AI detected a sprint risk', time: '1h ago', read: false, archived: false },
  { id: 3, category: 'SYSTEM', text: 'Sprint 08 ends in 3 days', time: '3h ago', read: false, archived: false },
  { id: 4, category: 'TASKS', text: 'Palak completed TASK-193', time: '5h ago', read: true, archived: false },
  { id: 5, category: 'PROJECTS', text: 'You were added to AI Commerce Platform', time: '1d ago', read: true, archived: false },
  { id: 6, category: 'AI', text: 'AI generated sprint documentation for Sprint 08', time: '1d ago', read: true, archived: false },
  { id: 7, category: 'MENTIONS', text: 'Achal mentioned you in a comment on TASK-186', time: '2d ago', read: true, archived: false },
]

interface NewProjectInput {
  name: string
  description: string
}

interface NewTaskInput {
  title: string
  projectId: string
  status: TaskStatus
  priority: TaskPriority
  storyPoints: number
  assigneeId: string
}

interface AppState {
  projects: Project[]
  tasks: Task[]
  teams: Team[]
  notifications: Notification[]
  taskCounter: number
  addProject: (input: NewProjectInput) => Project
  addTask: (input: NewTaskInput) => Task
  updateTaskStatus: (id: string, status: TaskStatus) => void
  addTeam: (name: string) => Team
  deleteTeam: (teamId: string) => void
  addMemberToTeam: (teamId: string, memberId: string) => void
  removeMemberFromTeam: (teamId: string, memberId: string) => void
  assignProjectToTeam: (teamId: string, projectId: string) => void
  unassignProjectFromTeam: (teamId: string, projectId: string) => void
  markNotificationRead: (id: number) => void
  archiveNotification: (id: number) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
  projects: seedProjects,
  tasks: seedTasks,
  teams: seedTeams,
  notifications: seedNotifications,
  taskCounter: 191,

  addProject: (input) => {
    const newProject: Project = {
      id: input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `project-${Date.now()}`,
      name: input.name,
      description: input.description,
      status: 'PLANNING',
      health: 'ON_TRACK',
      progress: 0,
      sprintNumber: 0,
      memberCount: 1,
    }
    set((state) => ({ projects: [...state.projects, newProject] }))
    return newProject
  },

  addTask: (input) => {
    const id = `TASK-${get().taskCounter}`
    const newTask: Task = {
      id,
      projectId: input.projectId,
      title: input.title,
      status: input.status,
      priority: input.priority,
      storyPoints: input.storyPoints,
      assigneeId: input.assigneeId,
      labels: [],
    }
    set((state) => ({
      tasks: [...state.tasks, newTask],
      taskCounter: state.taskCounter + 1,
    }))
    return newTask
  },

  updateTaskStatus: (id, status) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    }))
  },

  addTeam: (name) => {
    const newTeam: Team = {
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `team-${Date.now()}`,
      name,
      memberIds: [],
      projectIds: [],
    }
    set((state) => ({ teams: [...state.teams, newTeam] }))
    return newTeam
  },

  deleteTeam: (teamId) => {
    set((state) => ({ teams: state.teams.filter((t) => t.id !== teamId) }))
  },

  addMemberToTeam: (teamId, memberId) => {
    set((state) => ({
      teams: state.teams.map((t) =>
        t.id === teamId && !t.memberIds.includes(memberId)
          ? { ...t, memberIds: [...t.memberIds, memberId] }
          : t,
      ),
    }))
  },

  removeMemberFromTeam: (teamId, memberId) => {
    set((state) => ({
      teams: state.teams.map((t) =>
        t.id === teamId ? { ...t, memberIds: t.memberIds.filter((id) => id !== memberId) } : t,
      ),
    }))
  },

  assignProjectToTeam: (teamId, projectId) => {
    set((state) => ({
      teams: state.teams.map((t) =>
        t.id === teamId && !t.projectIds.includes(projectId)
          ? { ...t, projectIds: [...t.projectIds, projectId] }
          : t,
      ),
    }))
  },

  unassignProjectFromTeam: (teamId, projectId) => {
    set((state) => ({
      teams: state.teams.map((t) =>
        t.id === teamId ? { ...t, projectIds: t.projectIds.filter((id) => id !== projectId) } : t,
      ),
    }))
  },

  markNotificationRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }))
  },

  archiveNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, archived: true } : n)),
    }))
  },
    }),
    { name: 'nexus-storage' },
  ),
)
