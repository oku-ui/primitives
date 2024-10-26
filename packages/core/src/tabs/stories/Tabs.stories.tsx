import CAnimated from './Animated.vue'
import CChromatic from './Chromatic.vue'
import CStyled from './Styled.vue'
import './styles.css'

export default { title: 'Components/Tabs' }

export function Styled() {
  return CStyled
}

export function Animated() {
  return CAnimated
}

export function Chromatic() {
  return CChromatic
}
Chromatic.parameters = { chromatic: { disable: false } }
