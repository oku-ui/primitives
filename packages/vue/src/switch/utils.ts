import type { Ref } from 'vue'
import { createScope } from '@oku-ui/provide'

export function getState(checked: boolean | undefined) {
  return checked ? 'checked' : 'unchecked'
}

export type SwitchContext = {
  checked: Ref<boolean>
  disabled?: Ref<boolean | undefined>
}

export const [createSwitchProvide, createSwitchScope]
  = createScope<'OkuSwitch'>('OkuSwitch')

export const [useSwitchProvide, useSwitchInject]
  = createSwitchProvide<SwitchContext>('OkuSwitch')
