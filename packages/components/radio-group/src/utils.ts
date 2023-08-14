export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

export function getState(checked: boolean) {
  return checked ? 'checked' : 'unchecked'
}
