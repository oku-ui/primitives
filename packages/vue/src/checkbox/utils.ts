import type { CheckedState } from './Checkbox.vue'

function isIndeterminate(checked?: CheckedState): checked is 'indeterminate' {
  return checked === 'indeterminate'
}

function getState(checked: CheckedState) {
  return isIndeterminate(checked) ? 'indeterminate' : checked ? 'checked' : 'unchecked'
}

export { isIndeterminate, getState }
