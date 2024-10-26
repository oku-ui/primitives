import CChromatic from './Chromatic.vue'
import CCustomRatios from './CustomRatios.vue'
import CStyled from './Styled.vue'

export default { title: 'Components/AspectRatio' }

export function Styled() {
  return CStyled
}

export function CustomRatios() {
  return CCustomRatios
}

export function Chromatic() {
  return CChromatic
}
Chromatic.parameters = { chromatic: { disable: false } }
