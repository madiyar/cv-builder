import type { Education } from '../../src/types/resume'
import { moveDown, moveUp, removeAt, updateAt } from '../lib/array'
import { AddButton, DateInput, Field, ItemCard, TextInput } from './shared'

export function EducationForm({ education, onChange }: { education: Education[]; onChange: (education: Education[]) => void }) {
  return (
    <div className="space-y-4">
      {education.map((school, index) => (
        <ItemCard
          key={index}
          onRemove={() => onChange(removeAt(education, index))}
          onMoveUp={index > 0 ? () => onChange(moveUp(education, index)) : undefined}
          onMoveDown={index < education.length - 1 ? () => onChange(moveDown(education, index)) : undefined}
        >
          <div className="grid grid-cols-2 gap-3">
            <Field label="Institution">
              <TextInput
                value={school.institution}
                onChange={(institution) => onChange(updateAt(education, index, (e) => ({ ...e, institution })))}
              />
            </Field>
            <Field label="Area of study">
              <TextInput value={school.area} onChange={(area) => onChange(updateAt(education, index, (e) => ({ ...e, area })))} />
            </Field>
            <Field label="Study Type">
              <TextInput
                value={school.studyType}
                onChange={(studyType) => onChange(updateAt(education, index, (e) => ({ ...e, studyType })))}
              />
            </Field>
            <Field label="Score / GPA">
              <TextInput value={school.score ?? ''} onChange={(score) => onChange(updateAt(education, index, (e) => ({ ...e, score })))} />
            </Field>
            <Field label="City">
              <TextInput
                value={school.location.city}
                onChange={(city) => onChange(updateAt(education, index, (e) => ({ ...e, location: { ...e.location, city } })))}
              />
            </Field>
            <Field label="Country Code">
              <TextInput
                value={school.location.countryCode}
                onChange={(countryCode) =>
                  onChange(updateAt(education, index, (e) => ({ ...e, location: { ...e.location, countryCode } })))
                }
              />
            </Field>
            <Field label="Start Date">
              <DateInput
                value={school.startDate}
                onChange={(startDate) => onChange(updateAt(education, index, (e) => ({ ...e, startDate })))}
              />
            </Field>
            <Field label="End Date">
              <DateInput value={school.endDate} onChange={(endDate) => onChange(updateAt(education, index, (e) => ({ ...e, endDate })))} />
            </Field>
          </div>
        </ItemCard>
      ))}
      <AddButton
        label="Add education"
        onClick={() =>
          onChange([
            ...education,
            { institution: '', area: '', studyType: '', startDate: '', endDate: '', location: { city: '', countryCode: '' } },
          ])
        }
      />
    </div>
  )
}
