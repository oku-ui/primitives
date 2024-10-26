import CChromatic from './Chromatic.vue'
import CMultiple from './Multiple.vue'
import CSingle from './Single.vue'
import CVertical from './Vertical.vue'

export default { title: 'Components/ToggleGroup' }

export function Single() {
  return CSingle
}

export function Vertical() {
  return CVertical
}

export function Multiple() {
  return CMultiple
}

export function Chromatic() {
  return CChromatic
}
Chromatic.parameters = { chromatic: { disable: false } }
