const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

function getState(checked: boolean) {
  return checked ? 'checked' : 'unchecked'
}

export { ARROW_KEYS, getState }
