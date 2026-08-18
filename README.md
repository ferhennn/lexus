# NEXUS — Agile Project Management Platform

Full-stack scaffold: React/TypeScript/Tailwind frontend, Spring Boot 4 (Java 21) backend, PostgreSQL + Redis.

## Prerequisites

- Node.js 20+ (installed: v22)
- JDK 21 (installed via winget: Eclipse Temurin 21.0.12)
- Docker (for Postgres/Redis) — not installed on this machine yet

## Frontend

```
cd frontend
npm install
npm run dev        # http://localhost:5173
```

## Backend

```
cd backend
./mvnw spring-boot:run   # http://localhost:8080
```

Requires Postgres + Redis running (see `docker-compose.yml` at repo root):

```
docker compose up -d
```

Without Docker, point `spring.datasource.url` / `spring.data.redis.host` in
`backend/src/main/resources/application.properties` at any reachable
Postgres 16 / Redis 7 instance.

## Structure

```
frontend/   React + TS + Tailwind v4, React Router, TanStack Query, Zustand
backend/    Spring Boot 4, Spring Data JPA, Spring Security, WebSocket, Redis
docker-compose.yml   Postgres + Redis for local dev
```

### Backend packages

```
domain/         JPA entities (user, organization, workspace, project, sprint, task)
repository/     Spring Data repositories
web/            REST controllers (/api/projects, /api/sprints, /api/tasks, /api/health)
config/         SecurityConfig (CORS + permitAll placeholder — JWT auth not yet wired)
```

### Frontend structure

```
src/components/layout/   Sidebar, AppShell
src/components/ui/       shared components
src/pages/                one file per primary nav route (placeholders)
src/lib/nav.ts            sidebar navigation config
```

## Status

This is the P0 infra scaffold only: project builds and runs end to end, IA/routes
match the product spec, core entities and CRUD endpoints exist for
Project/Sprint/Task. Auth, AI features, board/backlog UI, wiki, whiteboard,
chat, analytics and the marketing site are not built yet — see the product
spec for full scope and MVP priority order (P0 → P3).
