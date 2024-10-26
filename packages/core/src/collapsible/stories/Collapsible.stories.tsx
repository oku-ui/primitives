import CAnimated from './Animated.vue'
import CAnimatedHorizontal from './AnimatedHorizontal.vue'
import CChromatic from './Chromatic.vue'
import CControlled from './Controlled.vue'
import CStyled from './Styled.vue'

export default { title: 'Components/Collapsible' }

export function Styled() {
  return CStyled
}

export function Controlled() {
  return CControlled
}

export function Animated() {
  return CAnimated
}

export function AnimatedHorizontal() {
  return CAnimatedHorizontal
};

export function Chromatic() {
  return CChromatic
}
Chromatic.parameters = { chromatic: { disable: false } }
