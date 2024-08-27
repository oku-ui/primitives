import CStyled from './Styled.vue'
import CControlled from './Controlled.vue'
import CChromatic from './Chromatic.vue'

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
