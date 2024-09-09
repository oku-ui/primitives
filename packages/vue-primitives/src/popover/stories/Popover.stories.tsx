import CAnimated from './Animated.vue'
import CBoundary from './Boundary.vue'
import CChromatic from './Chromatic.vue'
import CControlled from './Controlled.vue'
import CCustomAnchor from './CustomAnchor.vue'
import CForcedMount from './ForcedMount.vue'
import CModality from './Modality.vue'
import CNested from './Nested.vue'
import CStyled from './Styled.vue'
import CWithSlottedTrigger from './WithSlottedTrigger.vue'

export default { title: 'Components/Popover' }

export function Styled() {
  return CStyled
}

export function Boundary() {
  return CBoundary
}

export function Modality() {
  return CModality
}

export function Controlled() {
  return CControlled
}

export function Animated() {
  return CAnimated
}

export function ForcedMount() {
  return CForcedMount
}

export function Nested() {
  return CNested
}

export function CustomAnchor() {
  return CCustomAnchor
}

export function WithSlottedTrigger() {
  return CWithSlottedTrigger
}

export function Chromatic() {
  return CChromatic
}
Chromatic.parameters = { chromatic: { disable: false } }
