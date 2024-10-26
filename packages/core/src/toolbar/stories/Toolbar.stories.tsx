import CChromatic from './Chromatic.vue'
import CStyled from './Styled.vue'

export default { title: 'Components/Toolbar' }

export function Styled() {
  return CStyled
}

export function Chromatic() {
  return CChromatic
}
Chromatic.parameters = { chromatic: { disable: false } }
