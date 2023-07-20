export type CheckedState = boolean | string | number | undefined | 'indeterminate'

function isIndeterminate(checked?: CheckedState): checked is 'indeterminate' {
  return checked === 'indeterminate'
}

function getState(checked: CheckedState) {
  return isIndeterminate(checked) ? 'indeterminate' : checked ? 'checked' : 'unchecked'
}

export {
  isIndeterminate,
  getState,
}
