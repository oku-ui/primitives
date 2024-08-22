import CBasic from './Basic.vue'
import CWithElementInBetween from './WithElementInBetween.vue'
import CWithWrappedItem from './WithWrappedItem.vue'
import CWithFragment from './WithFragment.vue'
import CDynamicInsertion from './DynamicInsertion.vue'
import CWithChangingItem from './WithChangingItem.vue'
import CNested from './Nested.vue'

export default { title: 'Utilities/Collection' }

export function Basic() {
  return CBasic
}

export function WithElementInBetween() {
  return CWithElementInBetween
}

export function WithWrappedItem() {
  return CWithWrappedItem
}

export function WithFragment() {
  return CWithFragment
}

export function DynamicInsertion() {
  return CDynamicInsertion
}

export function WithChangingItem() {
  return CWithChangingItem
}

export function Nested() {
  return CNested
}
