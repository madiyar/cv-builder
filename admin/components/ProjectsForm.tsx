import type { Project } from '../../src/types/resume'
import { moveDown, moveUp, removeAt, updateAt } from '../lib/array'
import { AddButton, Field, ItemCard, StringListEditor, TextAreaInput, TextInput } from './shared'

export function ProjectsForm({ projects, onChange }: { projects: Project[]; onChange: (projects: Project[]) => void }) {
  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <ItemCard
          key={index}
          onRemove={() => onChange(removeAt(projects, index))}
          onMoveUp={index > 0 ? () => onChange(moveUp(projects, index)) : undefined}
          onMoveDown={index < projects.length - 1 ? () => onChange(moveDown(projects, index)) : undefined}
        >
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name">
              <TextInput value={project.name} onChange={(name) => onChange(updateAt(projects, index, (p) => ({ ...p, name })))} />
            </Field>
            <Field label="URL">
              <TextInput value={project.url ?? ''} onChange={(url) => onChange(updateAt(projects, index, (p) => ({ ...p, url })))} />
            </Field>
          </div>
          <Field label="Summary">
            <TextAreaInput
              value={project.summary ?? ''}
              onChange={(summary) => onChange(updateAt(projects, index, (p) => ({ ...p, summary })))}
            />
          </Field>
          <Field label="Keywords">
            <StringListEditor
              items={project.keywords ?? []}
              onChange={(keywords) => onChange(updateAt(projects, index, (p) => ({ ...p, keywords })))}
              itemLabel="Add keyword"
            />
          </Field>
        </ItemCard>
      ))}
      <AddButton label="Add project" onClick={() => onChange([...projects, { name: '' }])} />
    </div>
  )
}
