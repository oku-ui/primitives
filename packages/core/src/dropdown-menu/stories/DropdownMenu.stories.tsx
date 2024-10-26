import CCheckboxItems from './CheckboxItems.vue'
import CChromatic from './Chromatic.vue'
import CModality from './Modality.vue'
import CMultipleItemsAsDialogTriggers from './MultipleItemsAsDialogTriggers.vue'
import CNestedComposition from './NestedComposition.vue'
import CPreventClosing from './PreventClosing.vue'
import CRadioItems from './RadioItems.vue'
import CSingleItemAsDialogTrigger from './SingleItemAsDialogTrigger.vue'
import CStyled from './Styled.vue'
import CSubmenus from './Submenus.vue'
import CWithLabels from './WithLabels.vue'
import CWithTooltip from './WithTooltip.vue'

export default { title: 'Components/DropdownMenu' }

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

export function NestedComposition() {
  return CNestedComposition
}

export function SingleItemAsDialogTrigger() {
  return CSingleItemAsDialogTrigger
}

export function MultipleItemsAsDialogTriggers() {
  return CMultipleItemsAsDialogTriggers
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

export function WithTooltip() {
  return CWithTooltip
}

export function Chromatic() {
  return CChromatic
}

Chromatic.parameters = { chromatic: { disable: false } }
