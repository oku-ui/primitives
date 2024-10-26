import CAnimated from './Animated.vue'
import CCheckboxItems from './CheckboxItems.vue'
import CRadioItems from './RadioItems.vue'
import CStyled from './Styled.vue'
import CSubmenus from './Submenus.vue'
import CTypeahead from './Typeahead.vue'
import CWithLabels from './WithLabels.vue'

export default {
  title: 'Utilities/Menu',
  excludeStories: ['TickIcon', 'classes'],
}

export function Styled() {
  return CStyled
}

export function Submenus() {
  return CSubmenus
}

export function WithLabels() {
  return CWithLabels
}

export function Typeahead() {
  return CTypeahead
}

export function CheckboxItems() {
  return CCheckboxItems
}

export function RadioItems() {
  return CRadioItems
}

export function Animated() {
  return CAnimated
}
