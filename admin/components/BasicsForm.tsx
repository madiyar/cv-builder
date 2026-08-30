import type { Basics } from '../../src/types/resume'
import { removeAt, updateAt } from '../lib/array'
import { AddButton, Field, ItemCard, TextAreaInput, TextInput } from './shared'

export function BasicsForm({ basics, onChange }: { basics: Basics; onChange: (basics: Basics) => void }) {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Name">
          <TextInput value={basics.name} onChange={(name) => onChange({ ...basics, name })} />
        </Field>
        <Field label="Label / Title">
          <TextInput value={basics.label} onChange={(label) => onChange({ ...basics, label })} />
        </Field>
        <Field label="Email">
          <TextInput value={basics.email} onChange={(email) => onChange({ ...basics, email })} />
        </Field>
        <Field label="Website URL">
          <TextInput value={basics.url} onChange={(url) => onChange({ ...basics, url })} />
        </Field>
        <Field label="City">
          <TextInput
            value={basics.location.city}
            onChange={(city) => onChange({ ...basics, location: { ...basics.location, city } })}
          />
        </Field>
        <Field label="Country Code">
          <TextInput
            value={basics.location.countryCode}
            onChange={(countryCode) => onChange({ ...basics, location: { ...basics.location, countryCode } })}
          />
        </Field>
      </div>
      <Field label="Summary">
        <TextAreaInput value={basics.summary} onChange={(summary) => onChange({ ...basics, summary })} />
      </Field>

      <div>
        <p className="text-sm font-medium text-slate-700">Profiles</p>
        <div className="mt-2 space-y-3">
          {basics.profiles.map((profile, index) => (
            <ItemCard
              key={index}
              onRemove={() => onChange({ ...basics, profiles: removeAt(basics.profiles, index) })}
            >
              <div className="grid grid-cols-3 gap-3">
                <Field label="Network">
                  <TextInput
                    value={profile.network}
                    onChange={(network) => onChange({ ...basics, profiles: updateAt(basics.profiles, index, (p) => ({ ...p, network })) })}
                  />
                </Field>
                <Field label="Username">
                  <TextInput
                    value={profile.username}
                    onChange={(username) => onChange({ ...basics, profiles: updateAt(basics.profiles, index, (p) => ({ ...p, username })) })}
                  />
                </Field>
                <Field label="URL">
                  <TextInput
                    value={profile.url}
                    onChange={(url) => onChange({ ...basics, profiles: updateAt(basics.profiles, index, (p) => ({ ...p, url })) })}
                  />
                </Field>
              </div>
            </ItemCard>
          ))}
        </div>
        <AddButton
          label="Add profile"
          onClick={() =>
            onChange({ ...basics, profiles: [...basics.profiles, { network: '', username: '', url: '' }] })
          }
        />
      </div>
    </div>
  )
}
