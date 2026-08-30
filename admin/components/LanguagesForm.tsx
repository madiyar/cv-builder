import type { Language } from '../../src/types/resume'
import { moveDown, moveUp, removeAt, updateAt } from '../lib/array'
import { AddButton, Field, ItemCard, TextInput } from './shared'

export function LanguagesForm({ languages, onChange }: { languages: Language[]; onChange: (languages: Language[]) => void }) {
  return (
    <div className="space-y-4">
      {languages.map((lang, index) => (
        <ItemCard
          key={index}
          onRemove={() => onChange(removeAt(languages, index))}
          onMoveUp={index > 0 ? () => onChange(moveUp(languages, index)) : undefined}
          onMoveDown={index < languages.length - 1 ? () => onChange(moveDown(languages, index)) : undefined}
        >
          <div className="grid grid-cols-2 gap-3">
            <Field label="Language">
              <TextInput
                value={lang.language}
                onChange={(language) => onChange(updateAt(languages, index, (l) => ({ ...l, language })))}
              />
            </Field>
            <Field label="Fluency">
              <TextInput value={lang.fluency} onChange={(fluency) => onChange(updateAt(languages, index, (l) => ({ ...l, fluency })))} />
            </Field>
          </div>
        </ItemCard>
      ))}
      <AddButton label="Add language" onClick={() => onChange([...languages, { language: '', fluency: '' }])} />
    </div>
  )
}
