import type { Skill } from '../../src/types/resume'
import { moveDown, moveUp, removeAt, updateAt } from '../lib/array'
import { AddButton, Field, ItemCard, StringListEditor, TextInput } from './shared'

export function SkillsForm({ skills, onChange }: { skills: Skill[]; onChange: (skills: Skill[]) => void }) {
  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <ItemCard
          key={index}
          onRemove={() => onChange(removeAt(skills, index))}
          onMoveUp={index > 0 ? () => onChange(moveUp(skills, index)) : undefined}
          onMoveDown={index < skills.length - 1 ? () => onChange(moveDown(skills, index)) : undefined}
        >
          <Field label="Category">
            <TextInput value={skill.name} onChange={(name) => onChange(updateAt(skills, index, (s) => ({ ...s, name })))} />
          </Field>
          <Field label="Keywords">
            <StringListEditor
              items={skill.keywords}
              onChange={(keywords) => onChange(updateAt(skills, index, (s) => ({ ...s, keywords })))}
              itemLabel="Add keyword"
            />
          </Field>
        </ItemCard>
      ))}
      <AddButton label="Add skill category" onClick={() => onChange([...skills, { name: '', keywords: [] }])} />
    </div>
  )
}
