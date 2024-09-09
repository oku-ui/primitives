import CChromatic from './Chromatic.vue'
import CControlled from './Controlled.vue'
import CStyled from './Styled.vue'

export default { title: 'Components/AlertDialog' }

export function Styled() {
  return CStyled
}

export function Controlled() {
  return CControlled
}

export function Chromatic() {
  return CChromatic
}

Chromatic.parameters = { chromatic: { disable: false } }
