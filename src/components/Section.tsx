import type { ReactNode } from 'react'

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8 first:mt-0">
      <h2 className="text-xs font-semibold tracking-widest text-slate-500 uppercase border-b border-slate-200 pb-1">
        {title}
      </h2>
      <div className="mt-3 space-y-5">{children}</div>
    </section>
  )
}
