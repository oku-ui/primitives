import CStyled from './Styled.vue'
import CControlled from './Controlled.vue'
import CIndeterminate from './Indeterminate.vue'
import CWithinForm from './WithinForm.vue'
import CAnimated from './Animated.vue'
import CChromatic from './Chromatic.vue'

export default { title: 'Components/Checkbox' }

export function Styled() {
  return CStyled
}

export function Controlled() {
  return CControlled
}

export function Indeterminate() {
  return CIndeterminate
}

export function WithinForm() {
  return CWithinForm
}

export function Animated() {
  return CAnimated
}

export function Chromatic() {
  return CChromatic
}
Chromatic.parameters = { chromatic: { disable: false } }
