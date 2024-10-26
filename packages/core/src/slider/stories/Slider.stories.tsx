import CChromatic from './Chromatic.vue'
import CHorizontal from './Horizontal.vue'
import CInversions from './Inversions.vue'
import COnValueCommit from './OnValueCommit.vue'
import CRightToLeft from './RightToLeft.vue'
import CSmallSteps from './SmallSteps.vue'
import CStyled from './Styled.vue'
import CVertical from './Vertical.vue'
import CWithinForm from './WithinForm.vue'
import CWithMinimumStepsBetweenThumbs from './WithMinimumStepsBetweenThumbs.vue'
import CWithMultipleRanges from './WithMultipleRanges.vue'

export default { title: 'Components/Slider' }

export function Styled() {
  return CStyled
}

export function OnValueCommit() {
  return COnValueCommit
}

export function RightToLeft() {
  return CRightToLeft
}

export function Horizontal() {
  return CHorizontal
}

export function Vertical() {
  return CVertical
}

export function Inversions() {
  return CInversions
}

export function WithMinimumStepsBetweenThumbs() {
  return CWithMinimumStepsBetweenThumbs
}

export function WithMultipleRanges() {
  return CWithMultipleRanges
}

export function SmallSteps() {
  return CSmallSteps
}

export function WithinForm() {
  return CWithinForm
}

export function Chromatic() {
  return CChromatic
}
Chromatic.parameters = { chromatic: { disable: false } }
