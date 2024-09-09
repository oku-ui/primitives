import CAnimated from './Animated.vue'
import CAnimated2D from './Animated2D.vue'
import CAnimatedControlled from './AnimatedControlled.vue'
import CChromatic from './Chromatic.vue'
import CHorizontal from './Horizontal.vue'
import CMultiple from './Multiple.vue'
import COutsideViewport from './OutsideViewport.vue'
import CSingle from './Single.vue'

export default { title: 'Components/Accordion' }

export function Single() {
  return CSingle
}

export function Multiple() {
  return CMultiple
}

export function Animated() {
  return CAnimated
}

export function Animated2D() {
  return CAnimated2D
}

export function AnimatedControlled() {
  return CAnimatedControlled
}

export function OutsideViewport() {
  return COutsideViewport
}

export function Horizontal() {
  return CHorizontal
}

export function Chromatic() {
  return CChromatic
}
Chromatic.parameters = { chromatic: { disable: false } }
