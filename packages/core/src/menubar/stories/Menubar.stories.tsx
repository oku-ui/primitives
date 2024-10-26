import CChromatic from './Chromatic.vue'
import CCypress from './Cypress.vue'
import CStyled from './Styled.vue'

export default { title: 'Components/Menubar' }

export function Styled() {
  return CStyled
}

export function Cypress() {
  return CCypress
}

export function Chromatic() {
  return CChromatic
}

Chromatic.parameters = { chromatic: { disable: false } }
