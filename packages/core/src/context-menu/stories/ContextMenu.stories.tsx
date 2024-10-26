import CCheckboxItems from './CheckboxItems.vue'
import CModality from './Modality.vue'
import CMultiple from './Multiple.vue'
import CNested from './Nested.vue'
import CPreventClosing from './PreventClosing.vue'
import CRadioItems from './RadioItems.vue'
import CStyled from './Styled.vue'
import CSubmenus from './Submenus.vue'
import CWithLabels from './WithLabels.vue'

export default { title: 'Components/ContextMenu' }

export function Styled() {
  return CStyled
}

export function Modality() {
  return CModality
}

export function Submenus() {
  return CSubmenus
}

export function WithLabels() {
  return CWithLabels
}

export function CheckboxItems() {
  return CCheckboxItems
}

export function RadioItems() {
  return CRadioItems
}

export function PreventClosing() {
  return CPreventClosing
}

export function Multiple() {
  return CMultiple
}

export function Nested() {
  return CNested
}
