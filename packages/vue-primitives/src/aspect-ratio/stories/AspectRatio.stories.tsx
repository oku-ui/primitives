import CStyled from './Styled.vue'
import CCustomRatios from './CustomRatios.vue'
import CChromatic from './Chromatic.vue'

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
