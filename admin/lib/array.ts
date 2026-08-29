// Small immutable-update helpers for editing arrays of form data.

export function updateAt<T>(items: T[], index: number, updater: (item: T) => T): T[] {
  return items.map((item, i) => (i === index ? updater(item) : item))
}

export function removeAt<T>(items: T[], index: number): T[] {
  return items.filter((_, i) => i !== index)
}

export function moveUp<T>(items: T[], index: number): T[] {
  if (index <= 0) return items
  const copy = [...items]
  ;[copy[index - 1], copy[index]] = [copy[index], copy[index - 1]]
  return copy
}

export function moveDown<T>(items: T[], index: number): T[] {
  return moveUp(items, index + 1)
}
