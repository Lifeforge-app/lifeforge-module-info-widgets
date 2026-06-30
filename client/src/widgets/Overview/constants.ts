export const BROWSER_MAP = [
  { key: 'Firefox', name: 'Firefox', icon: 'tabler:brand-firefox' },
  { key: 'Edg', name: 'Edge', icon: 'tabler:brand-edge' },
  { key: 'Chrome', name: 'Chrome', icon: 'tabler:brand-chrome' },
  { key: 'Safari', name: 'Safari', icon: 'tabler:brand-safari' }
] as const

export const OS_MAP = [
  { key: 'Windows', label: 'Windows' },
  { key: 'iPhone', label: 'iOS' },
  { key: 'iPad', label: 'iOS' },
  { key: 'Mac', label: 'macOS' },
  { key: 'Linux', label: 'Linux' },
  { key: 'Android', label: 'Android' }
] as const

export function resolve<T extends { key: string }>(
  value: string,
  map: ReadonlyArray<T>
) {
  return map.find(m => value.includes(m.key))
}