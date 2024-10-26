import CAnimated from './Animated.vue'
import CChromatic from './Chromatic.vue'
import CControlled from './Controlled.vue'
import CCypress from './Cypress.vue'
import CFromDialog from './FromDialog.vue'
import CKeyChange from './KeyChange.vue'
import CPauseResumeProps from './PauseResumeProps.vue'
import CPromise from './Promise.vue'
import CStyled from './Styled.vue'

export default { title: 'Components/Toast' }

export function Styled() {
  return CStyled
}

export function Controlled() {
  return CControlled
}

export function FromDialog() {
  return CFromDialog
}

export function Promise() {
  return CPromise
}

export function KeyChange() {
  return CKeyChange
}

export function PauseResumeProps() {
  return CPauseResumeProps
}

export function Animated() {
  return CAnimated
}

export function Cypress() {
  return CCypress
}

export function Chromatic() {
  return CChromatic
}
Chromatic.parameters = { chromatic: { disable: false, delay: 300 } }
