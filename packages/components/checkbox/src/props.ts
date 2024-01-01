import type { PropType, Ref } from 'vue'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { Scope } from '@oku-ui/provide'
import { primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'

export type ScopeCheckbox<T> = T & { scopeOkuCheckbox?: Scope }

export const scopeCheckboxProps = {
  scopeOkuCheckbox: {
    ...ScopePropObject,
  },
}

export const CHECKBOX_NAME = 'OkuCheckbox'
export const CHECKBOX_INDICATOR_NAME = 'OkuCheckboxIndicator'
export const CHECKBOX_BUBBLE_INPUT_NAME = 'OkuBubbleInput'

/* -------------------------------------------------------------------------------------------------
 * Checkbox - checkbox.ts
 * ----------------------------------------------------------------------------------------------- */

export type CheckboxNativeElement = Omit<OkuElement<'button', true>, 'checked' | 'defaultChecked'>
export type CheckboxElement = HTMLButtonElement

export const [createCheckboxProvider, createCheckboxScope] = createProvideScope(CHECKBOX_NAME)

export const [checkboxProvider, useCheckboxInject]
  = createCheckboxProvider<CheckboxInjectValue>(CHECKBOX_NAME)

export type CheckedState = boolean | 'indeterminate'

export type CheckboxInjectValue = {
  state: Ref<CheckedState>
  disabled?: Ref<boolean | undefined>
}

export interface CheckboxProps extends PrimitiveProps {
  checked?: CheckedState
  defaultChecked?: CheckedState
  required?: boolean
  name?: string
  disabled?: boolean
  value?: string
  modelValue?: CheckedState
}

export type CheckboxEmits = {
  'update:modelValue': [checked: CheckedState]
  'checkedChange': [checked: CheckedState]
  'keydown': [event: KeyboardEvent]
  'click': [event: MouseEvent]
}

export const checkboxProps = {
  props: {
    modelValue: {
      type: [Boolean, String] as PropType<CheckboxProps['modelValue']>,
      default: undefined,
    },
    checked: {
      type: [Boolean, String] as PropType<CheckboxProps['checked']>,
      default: undefined,
    },
    defaultChecked: {
      type: [Boolean, String] as PropType<CheckboxProps['defaultChecked']>,
      default: undefined,
    },
    required: {
      type: Boolean as PropType<CheckboxProps['required']>,
    },
    name: {
      type: String as PropType<CheckboxProps['name']>,
    },
    disabled: {
      type: [Boolean, String] as PropType<CheckboxProps['disabled']>,
    },
    value: {
      type: String as PropType<CheckboxProps['value']>,
      default: 'on',
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (checked: CheckboxEmits['update:modelValue'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'checkedChange': (checked: CheckboxEmits['checkedChange'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'keydown': (event: CheckboxEmits['keydown'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'click': (event: CheckboxEmits['click'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * CheckboxIndicator - checkbox-indicator.ts
 * ----------------------------------------------------------------------------------------------- */

export type CheckboxIndicatorNativeElement = OkuElement<'span'>
export type CheckboxIndicatorElement = HTMLSpanElement

export interface CheckboxIndicatorProps extends PrimitiveProps {
  forceMount?: true
}

export const checkboxIndicatorProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
    ...primitiveProps,
  },
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 * BubbleInput - bubble-input.ts
 * ----------------------------------------------------------------------------------------------- */

export type BubbleInputNativeElement = Omit<OkuElement<'input', true>, 'checked'>
export type BubbleInputElement = HTMLInputElement

export interface BubbleInputProps {
  checked: CheckedState
  control: HTMLElement | null
  bubbles: boolean
}

export const bubbleInputProps = {
  props: {
    checked: {
      type: [Boolean, String] as PropType<BubbleInputProps['checked']>,
      required: true,
    },
    control: {
      type: [HTMLElement, null] as PropType<BubbleInputProps['control']>,
      default: null,
      required: true,
    },
    bubbles: {
      type: Boolean as PropType<BubbleInputProps['bubbles']>,
      default: true,
      required: true,
    },
  },
  emits: {},
}
