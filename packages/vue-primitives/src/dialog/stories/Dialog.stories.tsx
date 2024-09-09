import CAnimated from './Animated.vue'
import CChromatic from './Chromatic.vue'
import CControlled from './Controlled.vue'
import CCustomFocus from './CustomFocus.vue'
import CCypress from './Cypress.vue'
import CFocusTrap from './FocusTrap.vue'
import CForcedMount from './ForcedMount.vue'
import CInnerScrollable from './InnerScrollable.vue'
import CNoEscapeDismiss from './NoEscapeDismiss.vue'
import CNonModal from './NonModal.vue'
import CNoPointerDownOutsideDismiss from './NoPointerDownOutsideDismiss.vue'
import COuterScrollable from './OuterScrollable.vue'
import CStyled from './Styled.vue'
import CWithPortalContainer from './WithPortalContainer.vue'

export default { title: 'Components/Dialog' }

export function Styled() {
  return CStyled
}

export function NonModal() {
  return CNonModal
}

export function Controlled() {
  return CControlled
}

export function FocusTrap() {
  return CFocusTrap
}

export function CustomFocus() {
  return CCustomFocus
}

export function NoEscapeDismiss() {
  return CNoEscapeDismiss
}

export function NoPointerDownOutsideDismiss() {
  return CNoPointerDownOutsideDismiss
}

export function WithPortalContainer() {
  return CWithPortalContainer
}

export function Animated() {
  return CAnimated
}

export function ForcedMount() {
  return CForcedMount
}

export function InnerScrollable() {
  return CInnerScrollable
}

export function OuterScrollable() {
  return COuterScrollable
}

export function Cypress() {
  return CCypress
}

export function Chromatic() {
  return CChromatic
}
Chromatic.parameters = { chromatic: { disable: false } }
