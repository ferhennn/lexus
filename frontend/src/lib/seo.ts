import { useEffect } from 'react'

const SITE_NAME = 'Nexus'
const DEFAULT_DESCRIPTION =
  'One intelligent workspace for planning, building, documenting and shipping software.'

interface SeoOptions {
  /** Page-specific title. Rendered as "Title — Nexus"; omit on the landing page. */
  title?: string
  /** Overrides the document meta description for this route. */
  description?: string
}

function setMeta(name: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.name = name
    document.head.appendChild(tag)
  }
  tag.content = content
}

/**
 * Keeps <title> and the meta description in sync with the current route.
 * This is a client-rendered SPA, so crawlers that execute JS pick these up;
 * the static fallbacks live in index.html.
 */
export function useSeo({ title, description }: SeoOptions = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Plan, build and ship software in one workspace`
    document.title = fullTitle
    setMeta('description', description ?? DEFAULT_DESCRIPTION)
  }, [title, description])
}
