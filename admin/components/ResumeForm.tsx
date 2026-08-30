import type { ReactNode } from 'react'
import type { Resume } from '../../src/types/resume'
import { BasicsForm } from './BasicsForm'
import { EducationForm } from './EducationForm'
import { LanguagesForm } from './LanguagesForm'
import { ProjectsForm } from './ProjectsForm'
import { SkillsForm } from './SkillsForm'
import { WorkForm } from './WorkForm'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-sm font-semibold tracking-wide text-slate-500 uppercase">{title}</h2>
      {children}
    </section>
  )
}

export function ResumeForm({ resume, onChange }: { resume: Resume; onChange: (resume: Resume) => void }) {
  return (
    <div className="space-y-6">
      <Section title="Basics">
        <BasicsForm basics={resume.basics} onChange={(basics) => onChange({ ...resume, basics })} />
      </Section>
      <Section title="Experience">
        <WorkForm work={resume.work} onChange={(work) => onChange({ ...resume, work })} />
      </Section>
      <Section title="Education">
        <EducationForm education={resume.education} onChange={(education) => onChange({ ...resume, education })} />
      </Section>
      <Section title="Skills">
        <SkillsForm skills={resume.skills} onChange={(skills) => onChange({ ...resume, skills })} />
      </Section>
      <Section title="Languages">
        <LanguagesForm languages={resume.languages} onChange={(languages) => onChange({ ...resume, languages })} />
      </Section>
      <Section title="Projects">
        <ProjectsForm projects={resume.projects} onChange={(projects) => onChange({ ...resume, projects })} />
      </Section>
    </div>
  )
}
