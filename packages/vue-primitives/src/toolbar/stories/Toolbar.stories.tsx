import CStyled from './Styled.vue'
import CChromatic from './Chromatic.vue'

export default { title: 'Components/Toolbar' }

export function Styled() {
  return CStyled
}

export function Chromatic() {
  return CChromatic
}
Chromatic.parameters = { chromatic: { disable: false } }
