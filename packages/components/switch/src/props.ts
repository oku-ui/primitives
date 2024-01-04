import type { PropType, Ref } from 'vue'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { Scope } from '@oku-ui/provide'
import { primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'

export type ScopeSwitch<T> = T & { scopeOkuSwitch?: Scope }

export const scopeSwitchProps = {
  scopeOkuSwitch: {
    ...ScopePropObject,
  },
}

export const SWITCH_NAME = 'OkuSwitch'
export const SWITCH_THUMB_NAME = 'OkuSwitchThumb'
export const SWITCH_BUBBLE_INPUT_NAME = 'OkuBubbleInput'

/* -------------------------------------------------------------------------------------------------
 * Switch - switch.ts
 * ----------------------------------------------------------------------------------------------- */

export type SwitchNativeElement = OkuElement<'button'>
export type SwitchElement = HTMLButtonElement

export const [createSwitchProvider, createSwitchScope] = createProvideScope(SWITCH_NAME)

export type SwitchContextValue = { checked: Ref<boolean>, disabled?: Ref<boolean | undefined> }
export const [switchProvider, useSwitchInject] = createSwitchProvider<SwitchContextValue>(SWITCH_NAME)

export interface SwitchProps extends PrimitiveProps {
  checked?: boolean
  defaultChecked?: boolean
  required?: boolean
  name?: string
  disabled?: boolean
  value?: string
  modelValue?: boolean
}

export interface SwitchEmits {
  'update:modelValue': [checked: boolean]
  checkedChange: [checked: boolean]
  click: [event: MouseEvent]
}

export const switchProps = {
  props: {
    modelValue: {
      type: Boolean as PropType<SwitchProps['modelValue']>,
      default: undefined,
    },
    checked: {
      type: Boolean as PropType<SwitchProps['checked']>,
      default: undefined,
    },
    defaultChecked: {
      type: Boolean as PropType<SwitchProps['defaultChecked']>,
      default: undefined,
    },
    required: {
      type: Boolean as PropType<SwitchProps['required']>,
    },
    name: {
      type: String as PropType<SwitchProps['name']>,
    },
    disabled: {
      type: Boolean as PropType<SwitchProps['disabled']>,
    },
    value: {
      type: String as PropType<SwitchProps['value']>,
      default: 'on',
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (checked: SwitchEmits['update:modelValue'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'checkedChange': (checked: SwitchEmits['checkedChange'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'click': (event: SwitchEmits['click'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SwitchThumb - switch-thumb.ts
 * ----------------------------------------------------------------------------------------------- */

export type SwitchThumbNativeElement = OkuElement<'span'>
export type SwitchThumbElement = HTMLSpanElement

export interface SwitchThumbProps extends PrimitiveProps { }

export const switchThumbProps = {
  props: {
    ...primitiveProps,
  },
  emits: { },
}

/* -------------------------------------------------------------------------------------------------
 * BubbleInput - bubble-input.ts
 * ----------------------------------------------------------------------------------------------- */

export type BubbleInputNativeElement = OkuElement<'input'>
export type BubbleInputElement = HTMLInputElement

export interface BubbleInputProps {
  checked: boolean
  control: HTMLElement | null
  bubbles: boolean
}

export const bubbleInputProps = {
  props: {
    checked: {
      type: Boolean as PropType<BubbleInputProps['checked']>,
      required: true,
    },
    control: {
      type: Object as PropType<BubbleInputProps['control']>,
      default: null,
      required: true,
    },
    bubbles: {
      type: Boolean as PropType<BubbleInputProps['bubbles']>,
      default: true,
      required: true,
    },
  },
  emits: { },
}
