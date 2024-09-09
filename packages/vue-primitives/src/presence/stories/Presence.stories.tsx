import CBasic from './Basic.vue'
import CWithDeferredMountAnimation from './WithDeferredMountAnimation.vue'
import CWithMountAnimation from './WithMountAnimation.vue'
import CWithMultipleMountAnimations from './WithMultipleMountAnimations.vue'
import CWithMultipleOpenAndCloseAnimations from './WithMultipleOpenAndCloseAnimations.vue'
import CWithOpenAndCloseAnimation from './WithOpenAndCloseAnimation.vue'
import CWithUnmountAnimation from './WithUnmountAnimation.vue'

export default { title: 'Utilities/Presence' }

export function Basic() {
  return CBasic
}

export function WithMountAnimation() {
  return <CWithMountAnimation />
}

export function WithUnmountAnimation() {
  return <CWithUnmountAnimation />
}

export function WithMultipleMountAnimations() {
  return <CWithMultipleMountAnimations />
}

export function WithOpenAndCloseAnimation() {
  return <CWithOpenAndCloseAnimation />
}

export function WithMultipleOpenAndCloseAnimations() {
  return <CWithMultipleOpenAndCloseAnimations />
}

export function WithDeferredMountAnimation() {
  return CWithDeferredMountAnimation
}
