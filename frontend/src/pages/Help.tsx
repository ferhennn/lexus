import { useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: 'How do I create a new task?',
    answer:
      'Open Board or Backlog and click "+ New Task". Set the project, sprint, assignee, priority, and story points, then save.',
  },
  {
    question: 'How do sprints work?',
    answer:
      'Sprints belong to a project and move through Planned, Active, and Completed. Only one sprint per project should be Active at a time.',
  },
  {
    question: 'Can I edit or delete a Wiki page?',
    answer: 'Yes. Select a page from the Wiki sidebar, then use Edit or Delete above the content.',
  },
  {
    question: 'How is team utilization calculated?',
    answer:
      'Utilization is an estimate of how much of a member\'s capacity is committed across active sprint work. It updates as tasks are assigned.',
  },
  {
    question: 'Where do I change my display name or role?',
    answer: 'Go to Settings to update your profile, default assignee, and notification preferences.',
  },
]

const contactChannels = [
  { label: 'Support Email', value: 'support@nexus.dev' },
  { label: 'Team Chat', value: '#nexus-help' },
  { label: 'Docs', value: 'docs.nexus.dev' },
]

export function Help() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="px-4 py-6 sm:px-8 sm:py-8 lg:px-16 lg:py-12">
      <div className="mb-2 text-xs font-medium uppercase tracking-widest text-mute">Support</div>
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">Help</h1>

      <div className="mt-10 flex flex-col gap-6 lg:flex-row">
        <div className="min-w-0 flex-1 border border-line bg-white p-6 sm:p-8">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-mute">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col divide-y divide-line">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <div key={faq.question} className="py-3 first:pt-0 last:pb-0">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-sm font-medium text-ink">{faq.question}</span>
                    <span className="shrink-0 text-mute">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && <p className="mt-2 text-sm leading-relaxed text-mute">{faq.answer}</p>}
                </div>
              )
            })}
          </div>
        </div>

        <div className="w-full shrink-0 border border-line bg-white p-6 lg:w-72">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-mute">
            Contact
          </h2>
          <div className="flex flex-col gap-4">
            {contactChannels.map((c) => (
              <div key={c.label}>
                <div className="text-xs text-mute">{c.label}</div>
                <div className="text-sm font-medium text-ink">{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
