import CAnimated from './Animated.vue'
import CChromatic from './Chromatic.vue'
import CStyled from './Styled.vue'
import CWithCustomArrow from './WithCustomArrow.vue'
import CWithPortal from './WithPortal.vue'
import CWithUpdatePositionStrategyAlways from './WithUpdatePositionStrategyAlways.vue'

export default { title: 'Utilities/Popper' }

export function Styled() {
  return CStyled
}

export function WithCustomArrow() {
  return CWithCustomArrow
}

export function Animated() {
  return CAnimated
}

export function WithPortal() {
  return CWithPortal
}

export function WithUpdatePositionStrategyAlways() {
  return CWithUpdatePositionStrategyAlways
}

export function Chromatic() {
  return CChromatic
}

Chromatic.parameters = { chromatic: { disable: false } }
