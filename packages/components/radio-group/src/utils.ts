import { computed } from 'vue'

export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

export function getState(checked: boolean) {
  return computed(() => checked ? 'checked' : 'unchecked')
}
