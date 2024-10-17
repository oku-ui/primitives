import type { Ref } from 'vue'
import type { CheckedState } from './Checkbox.vue'
import { createScope } from '@oku-ui/provide'

export function isIndeterminate(checked?: CheckedState): checked is 'indeterminate' {
  return checked === 'indeterminate'
}

export function getState(checked: CheckedState) {
  return isIndeterminate(checked) ? 'indeterminate' : checked ? 'checked' : 'unchecked'
}

export type CheckboxContext = {
  state: Ref<CheckedState>
  disabled?: Ref<boolean | undefined>
}

export const
  [createCheckboxProvide, createCheckboxScope]
= createScope<'OkuCheckbox'>('OkuCheckbox')

export const [useCheckboxProvide, useCheckboxInject]
  = createCheckboxProvide<CheckboxContext>('OkuCheckbox')
