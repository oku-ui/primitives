import CStyled from './Styled.vue'
import CWithCustomArrow from './WithCustomArrow.vue'
import CAnimated from './Animated.vue'
import CWithPortal from './WithPortal.vue'
import CWithUpdatePositionStrategyAlways from './WithUpdatePositionStrategyAlways.vue'
import CChromatic from './Chromatic.vue'

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
