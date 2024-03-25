import type { Scope } from '@oku-ui/provide'
import { createScope } from '@oku-ui/provide'
import type { Ref } from 'vue'
import type { RovingFocusGroupProps } from '@oku-ui/roving-focus'
import { createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import type { PrimitiveProps } from '@oku-ui/primitive'
import { RADIO_GROUP_NAME } from './constants'
import type { RadioProps } from './Radio'
import { createRadioScope } from './Radio'

export interface RadioGroupProps extends PrimitiveProps {
  name?: string | undefined
  required?: RadioProps['required']
  disabled?: RadioProps['disabled']
  dir?: RovingFocusGroupProps['dir']
  orientation?: RovingFocusGroupProps['orientation']
  loop?: RovingFocusGroupProps['loop']
  defaultValue?: string
  value?: string | undefined

  scopeOkuRadioGroup?: Scope
}

// Emits

export type RadioGroupEmits = {
  'update:value': [value: string | undefined]
}

// Context

export interface RadioGroupContextValue {
  name: Ref<RadioGroupProps['name']>
  required: Ref<boolean>
  disabled: Ref<boolean>
  value: Ref<RadioGroupProps['value']>
  onValueChange: (value: string) => void
}

export const [createRadioGroupProvider, createRadioGroupScope] = createScope(RADIO_GROUP_NAME, [
  createRovingFocusGroupScope,
  createRadioScope,
])

export const [provideRadioGroupContext, useRadioGroupContext] = createRadioGroupProvider<RadioGroupContextValue>(RADIO_GROUP_NAME)

export const useRovingFocusGroupScope = createRovingFocusGroupScope()
