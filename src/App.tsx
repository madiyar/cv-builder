import resume from './data/resume.json'
import { Section } from './components/Section'
import { formatRange } from './lib/date'
import type { Resume } from './types/resume'

const data = resume as Resume

function LocationLabel({ city, countryCode }: { city: string; countryCode: string }) {
  return (
    <span>
      {city}
      {countryCode ? `, ${countryCode}` : ''}
    </span>
  )
}

function Header({ basics }: { basics: Resume['basics'] }) {
  return (
    <header className="flex flex-col gap-2 border-b border-slate-200 pb-6 sm:flex-row sm:items-baseline sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{basics.name}</h1>
        <p className="text-lg text-slate-600">{basics.label}</p>
      </div>
      <div className="flex flex-col gap-1 text-sm text-slate-600 sm:items-end">
        <a href={`mailto:${basics.email}`} className="hover:text-slate-900">
          {basics.email}
        </a>
        <a href={basics.url} className="hover:text-slate-900">
          {basics.url}
        </a>
        <LocationLabel {...basics.location} />
        <div className="flex gap-3">
          {basics.profiles.map((profile) => (
            <a key={profile.network} href={profile.url} className="hover:text-slate-900">
              {profile.network}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}

function WorkSection({ work }: { work: Resume['work'] }) {
  return (
    <Section title="Experience">
      {work.map((job) => (
        <div key={`${job.name}-${job.startDate}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <h3 className="font-semibold text-slate-900">
              {job.position} · {job.url ? <a href={job.url}>{job.name}</a> : job.name}
            </h3>
            <span className="text-sm text-slate-500">{formatRange(job.startDate, job.endDate)}</span>
          </div>
          <p className="text-sm text-slate-500">
            <LocationLabel {...job.location} />
          </p>
          {job.projects.map((project) => (
            <div key={project.name} className="mt-2">
              <p className="text-sm font-medium text-slate-800">{project.name}</p>
              {project.stack && <p className="text-sm text-slate-500 italic">{project.stack}</p>}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ))}
    </Section>
  )
}

function EducationSection({ education }: { education: Resume['education'] }) {
  return (
    <Section title="Education">
      {education.map((school) => (
        <div key={school.institution} className="flex flex-wrap items-baseline justify-between gap-x-3">
          <div>
            <h3 className="font-semibold text-slate-900">
              {school.url ? <a href={school.url}>{school.institution}</a> : school.institution}
            </h3>
            <p className="text-sm text-slate-600">
              {school.studyType} of {school.area}
              {school.score ? ` · GPA ${school.score}` : ''}
            </p>
          </div>
          <span className="text-sm text-slate-500">{formatRange(school.startDate, school.endDate)}</span>
        </div>
      ))}
    </Section>
  )
}

function SkillsSection({ skills }: { skills: Resume['skills'] }) {
  return (
    <Section title="Skills">
      {skills.map((skill) => (
        <p key={skill.name} className="text-sm text-slate-700">
          <span className="font-semibold text-slate-900">{skill.name}: </span>
          {skill.keywords.join(', ')}
        </p>
      ))}
    </Section>
  )
}

function LanguagesSection({ languages }: { languages: Resume['languages'] }) {
  return (
    <Section title="Languages">
      <p className="text-sm text-slate-700">
        {languages.map((lang) => `${lang.language} (${lang.fluency})`).join(' · ')}
      </p>
    </Section>
  )
}

function ProjectsSection({ projects }: { projects: Resume['projects'] }) {
  if (projects.length === 0) return null
  return (
    <Section title="Projects">
      {projects.map((project) => (
        <div key={project.name}>
          <p className="text-sm font-medium text-slate-900">
            {project.url ? <a href={project.url}>{project.name}</a> : project.name}
          </p>
          {(project.summary || project.description) && (
            <p className="text-sm text-slate-700">{project.summary ?? project.description}</p>
          )}
          {project.keywords && project.keywords.length > 0 && (
            <p className="text-sm text-slate-500 italic">{project.keywords.join(', ')}</p>
          )}
        </div>
      ))}
    </Section>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-100 py-10 print:bg-white print:py-0">
      <div className="mx-auto max-w-3xl px-6 print:px-0">
        <div className="mb-4 flex justify-end print:hidden">
          <a
            href="/cv.pdf"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Download PDF
          </a>
        </div>
        <main className="rounded-lg bg-white p-8 shadow-sm print:rounded-none print:p-0 print:shadow-none">
          <Header basics={data.basics} />
          <p className="mt-4 text-sm text-slate-700">{data.basics.summary}</p>
          <WorkSection work={data.work} />
          <EducationSection education={data.education} />
          <SkillsSection skills={data.skills} />
          <LanguagesSection languages={data.languages} />
          <ProjectsSection projects={data.projects} />
        </main>
      </div>
    </div>
  )
}

export default App
