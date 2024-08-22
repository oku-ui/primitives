import CBasic from './Basic.vue'
import CWithMountAnimation from './WithMountAnimation.vue'
import CWithUnmountAnimation from './WithUnmountAnimation.vue'
import CWithMultipleMountAnimations from './WithMultipleMountAnimations.vue'
import CWithOpenAndCloseAnimation from './WithOpenAndCloseAnimation.vue'
import CWithMultipleOpenAndCloseAnimations from './WithMultipleOpenAndCloseAnimations.vue'
import CWithDeferredMountAnimation from './WithDeferredMountAnimation.vue'

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
