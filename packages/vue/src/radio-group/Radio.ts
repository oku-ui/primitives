import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Ref } from 'vue'
import { createScope, type Scope } from '@oku-ui/provide'
import { RADIO_NAME } from './constants'

// Props

export interface RadioProps extends PrimitiveProps {
  /** The value given as data when submitted with a `name`. */
  value?: string
  /** When `true`, prevents the user from interacting with the radio item. */
  disabled?: boolean
  /** When `true`, indicates that the user must check the radio item before the owning form can be submitted. */
  required?: boolean
  checked?: boolean
  name?: string

  scopeOkuRadio?: Scope
}

// Emits

export type RadioEmits = {
  click: [event: MouseEvent]
  check: []
}

// Context

export const [createRadioProvide, createRadioScope] = createScope(RADIO_NAME)

type RadioContextValue = {
  checked: Ref<boolean>
  disabled?: Ref<boolean | undefined>
}

export const useRadioScope = createRadioScope()

export const [provideRadioContext, useRadioContext] = createRadioProvide<RadioContextValue>(RADIO_NAME)
