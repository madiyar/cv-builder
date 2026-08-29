import type { Project, Work } from '../../src/types/resume'
import { moveDown, moveUp, removeAt, updateAt } from '../lib/array'
import { AddButton, DateInput, Field, ItemCard, StringListEditor, TextInput } from './shared'

const newProject = (): Project => ({ name: '', stack: '', highlights: [] })

function ProjectFields({ project, onChange }: { project: Project; onChange: (project: Project) => void }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Project name">
          <TextInput value={project.name} onChange={(name) => onChange({ ...project, name })} />
        </Field>
        <Field label="Stack">
          <TextInput value={project.stack ?? ''} onChange={(stack) => onChange({ ...project, stack })} />
        </Field>
      </div>
      <Field label="Highlights">
        <StringListEditor
          items={project.highlights ?? []}
          onChange={(highlights) => onChange({ ...project, highlights })}
          itemLabel="Add highlight"
          multiline
        />
      </Field>
    </>
  )
}

export function WorkForm({ work, onChange }: { work: Work[]; onChange: (work: Work[]) => void }) {
  return (
    <div className="space-y-4">
      {work.map((job, index) => (
        <ItemCard
          key={index}
          onRemove={() => onChange(removeAt(work, index))}
          onMoveUp={index > 0 ? () => onChange(moveUp(work, index)) : undefined}
          onMoveDown={index < work.length - 1 ? () => onChange(moveDown(work, index)) : undefined}
        >
          <div className="grid grid-cols-2 gap-3">
            <Field label="Company">
              <TextInput value={job.name} onChange={(name) => onChange(updateAt(work, index, (j) => ({ ...j, name })))} />
            </Field>
            <Field label="Position">
              <TextInput
                value={job.position}
                onChange={(position) => onChange(updateAt(work, index, (j) => ({ ...j, position })))}
              />
            </Field>
            <Field label="City">
              <TextInput
                value={job.location.city}
                onChange={(city) => onChange(updateAt(work, index, (j) => ({ ...j, location: { ...j.location, city } })))}
              />
            </Field>
            <Field label="Country Code">
              <TextInput
                value={job.location.countryCode}
                onChange={(countryCode) =>
                  onChange(updateAt(work, index, (j) => ({ ...j, location: { ...j.location, countryCode } })))
                }
              />
            </Field>
            <Field label="Start Date">
              <DateInput
                value={job.startDate}
                onChange={(startDate) => onChange(updateAt(work, index, (j) => ({ ...j, startDate })))}
              />
            </Field>
            <Field label="End Date (empty = present)">
              <DateInput
                value={job.endDate ?? ''}
                onChange={(endDate) => onChange(updateAt(work, index, (j) => ({ ...j, endDate })))}
              />
            </Field>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700">Projects</p>
            <div className="mt-2 space-y-3">
              {job.projects.map((project, projectIndex) => (
                <ItemCard
                  key={projectIndex}
                  onRemove={() =>
                    onChange(updateAt(work, index, (j) => ({ ...j, projects: removeAt(j.projects, projectIndex) })))
                  }
                >
                  <ProjectFields
                    project={project}
                    onChange={(updated) =>
                      onChange(
                        updateAt(work, index, (j) => ({ ...j, projects: updateAt(j.projects, projectIndex, () => updated) })),
                      )
                    }
                  />
                </ItemCard>
              ))}
            </div>
            <AddButton
              label="Add project"
              onClick={() => onChange(updateAt(work, index, (j) => ({ ...j, projects: [...j.projects, newProject()] })))}
            />
          </div>
        </ItemCard>
      ))}
      <AddButton
        label="Add job"
        onClick={() =>
          onChange([
            ...work,
            { name: '', position: '', location: { city: '', countryCode: '' }, startDate: '', endDate: '', projects: [] },
          ])
        }
      />
    </div>
  )
}
