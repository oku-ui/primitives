import CChromatic from './Chromatic.vue'
import CControlled from './Controlled.vue'
import CStyled from './Styled.vue'
import CWithinForm from './WithinForm.vue'

export default { title: 'Components/Switch' }

export function Styled() {
  return CStyled
}

export function Controlled() {
  return CControlled
}

export function WithinForm() {
  return CWithinForm
}

export function Chromatic() {
  return CChromatic
}
Chromatic.parameters = { chromatic: { disable: false } }
