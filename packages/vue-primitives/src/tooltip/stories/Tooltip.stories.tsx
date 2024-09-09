import CAnimated from './Animated.vue'
import CAriaLabel from './AriaLabel.vue'
import CChromatic from './Chromatic.vue'
import CControlled from './Controlled.vue'
import CCustomContent from './CustomContent.vue'
import CCustomDurations from './CustomDurations.vue'
import CDisableHoverableContent from './DisableHoverableContent.vue'
import CKeepOpenOnActivation from './KeepOpenOnActivation.vue'
import CPositions from './Positions.vue'
import CSlottableContent from './SlottableContent.vue'
import CStyled from './Styled.vue'
import CUnmount from './Unmount.vue'
import CWithExternalRef from './WithExternalRef.vue'
import CWithinDialog from './WithinDialog.vue'
import CWithinScrollable from './WithinScrollable.vue'
import CWithText from './WithText.vue'

export default { title: 'Components/Tooltip' }

export function Styled() {
  return CStyled
}

export function Controlled() {
  return CControlled
}

export function CustomDurations() {
  return CCustomDurations
}

export function CustomContent() {
  return CCustomContent
}

export function Positions() {
  return CPositions
}

export function AriaLabel() {
  return CAriaLabel
}

export function WithText() {
  return CWithText
}

export function WithExternalRef() {
  return CWithExternalRef
}

export function Unmount() {
  return CUnmount
}

export function Animated() {
  return CAnimated
}

export function SlottableContent() {
  return CSlottableContent
}

export function WithinDialog() {
  return CWithinDialog
}

export function KeepOpenOnActivation() {
  return CKeepOpenOnActivation
}

export function WithinScrollable() {
  return CWithinScrollable
}

export function DisableHoverableContent() {
  return CDisableHoverableContent
}

export function Chromatic() {
  return CChromatic
}

Chromatic.parameters = { chromatic: { disable: false } }
