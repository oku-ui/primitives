import CAnimated from './Animated.vue'
import CChromatic from './Chromatic.vue'
import CControlled from './Controlled.vue'
import CStyled from './Styled.vue'
import CUnset from './Unset.vue'
import CWithinForm from './WithinForm.vue'

export default { title: 'Components/RadioGroup' }

export function Styled() {
  return CStyled
}

export function Controlled() {
  return CControlled
}

export function Unset() {
  return CUnset
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
