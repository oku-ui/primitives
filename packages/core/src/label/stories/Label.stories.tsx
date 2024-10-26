import CStyled from './Styled.vue'
import CWithControl from './WithControl.vue'
import CWithInputNumber from './WithInputNumber.vue'

export default { title: 'Components/Label', excludeStories: ['RECOMMENDED_CSS__LABEL__ROOT'] }

export function Styled() {
  return CStyled
}

export function WithControl() {
  return CWithControl
}

export function WithInputNumber() {
  return CWithInputNumber
}
