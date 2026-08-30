import type { ReactNode } from 'react'

export function Field({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={`block text-sm ${className ?? ''}`}>
      <span className="font-medium text-slate-700">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}

const inputClass =
  'w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-900 focus:border-slate-500 focus:outline-none'

export function TextInput({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      className={inputClass}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export function DateInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <input type="date" className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} />
}

export function TextAreaInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <textarea
      className={`${inputClass} min-h-20`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export function IconButton({ onClick, title, children }: { onClick: () => void; title: string; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
    >
      {children}
    </button>
  )
}

export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-2 rounded-md border border-dashed border-slate-300 px-3 py-1.5 text-sm text-slate-500 hover:border-slate-400 hover:text-slate-700"
    >
      + {label}
    </button>
  )
}

export function ItemCard({
  onRemove,
  onMoveUp,
  onMoveDown,
  children,
}: {
  onRemove: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  children: ReactNode
}) {
  return (
    <div className="relative rounded-lg border border-slate-200 p-4">
      <div className="absolute top-2 right-2 flex gap-0.5">
        {onMoveUp && (
          <IconButton onClick={onMoveUp} title="Move up">
            ↑
          </IconButton>
        )}
        {onMoveDown && (
          <IconButton onClick={onMoveDown} title="Move down">
            ↓
          </IconButton>
        )}
        <IconButton onClick={onRemove} title="Remove">
          ✕
        </IconButton>
      </div>
      <div className="grid gap-3 pr-16">{children}</div>
    </div>
  )
}

export function StringListEditor({
  items,
  onChange,
  itemLabel,
  multiline,
}: {
  items: string[]
  onChange: (items: string[]) => void
  itemLabel: string
  multiline?: boolean
}) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          {multiline ? (
            <TextAreaInput value={item} onChange={(value) => onChange(items.map((it, i) => (i === index ? value : it)))} />
          ) : (
            <TextInput value={item} onChange={(value) => onChange(items.map((it, i) => (i === index ? value : it)))} />
          )}
          <IconButton onClick={() => onChange(items.filter((_, i) => i !== index))} title="Remove">
            ✕
          </IconButton>
        </div>
      ))}
      <AddButton onClick={() => onChange([...items, ''])} label={itemLabel} />
    </div>
  )
}
