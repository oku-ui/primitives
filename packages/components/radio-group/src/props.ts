import type { PropType, Ref, UnwrapRef } from 'vue'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { Scope } from '@oku-ui/provide'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import type { RovingFocusGroupProps } from '@oku-ui/roving-focus'

export type ScopeRadio<T> = T & { scopeOkuRadio?: Scope }

export const scopeRadioProps = {
  scopeOkuRadio: {
    ...ScopePropObject,
  },
}

export const RADIO_NAME = 'OkuRadio'
export const RADIO_INDICATOR_NAME = 'OkuRadioIndicator'
export const RADIO_BUBBLE_INPUT_NAME = 'OkuBubbleInput'

/* -------------------------------------------------------------------------------------------------
 * Radio - radio.ts
 * ----------------------------------------------------------------------------------------------- */

export type RadioNativeElement = OkuElement<'button'>
export type RadioElement = HTMLButtonElement

export const [createRadioProvide, createRadioScope] = createProvideScope(RADIO_NAME)

type RadioInjectValue = {
  checked: Ref<boolean>
  disabled?: Ref<boolean | undefined>
}

export const [radioProvider, useRadioInject] = createRadioProvide<RadioInjectValue>(RADIO_NAME)

export interface RadioProps extends PrimitiveProps {
  checked: boolean
  required?: boolean
  name?: string
  disabled?: boolean
  value: string
}

export type RadioEmits = {
  check: []
  click: [event: MouseEvent]
}

export const radioProps = {
  props: {
    checked: {
      type: Boolean as PropType<RadioProps['checked']>,
      // default: false,
      default: undefined,
    },
    required: {
      type: Boolean as PropType<RadioProps['required']>,
    },
    name: {
      type: String as PropType<RadioProps['name']>,
    },
    disabled: {
      type: Boolean as PropType<RadioProps['disabled']>,
    },
    value: {
      type: String as PropType<RadioProps['value']>,
      default: 'on',
    },
    ...primitiveProps,
  },
  emits: {
    check: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: RadioEmits['click'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * RadioIndicator - radio-indicator.ts
 * ----------------------------------------------------------------------------------------------- */

export type RadioIndicatorNativeElement = OkuElement<'span'>
export type RadioIndicatorElement = HTMLSpanElement

export interface RadioIndicatorProps extends PrimitiveProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export const radioIndicatorProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<RadioIndicatorProps['forceMount']>,
      default: undefined,
    },
    ...primitiveProps,
  },
  emits: { },
}

/* -------------------------------------------------------------------------------------------------
 * BubbleInput - bubble-input.ts
 * ----------------------------------------------------------------------------------------------- */

export type BubbleInputNativeElement = Omit<OkuElement<'input', true>, 'checked'>
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
  emits: { },
}

/* ---------------------------------------------------------------------------------------------- */

export type ScopeRadioGroup<T> = T & { scopeOkuRadioGroup?: Scope }

export const scopeRadioGroupProps = {
  scopeOkuRadioGroup: {
    ...ScopePropObject,
  },
}

export const RADIO_GROUP_NAME = 'OkuRadioGroup'
export const RADIO_GROUP_ITEM_NAME = 'OkuRadioGroupItem'
export const RADIO_GROUP_INDICATOR_NAME = 'OkuRadioGroupIndicator'

/* -------------------------------------------------------------------------------------------------
 * RadioGroup - radio-group.ts
 * ----------------------------------------------------------------------------------------------- */

export type RadioGroupNativeElement = OkuElement<'div'>
export type RadioGroupElement = HTMLDivElement

export const [createRadioGroupProvider, createRadioGroupScope] = createProvideScope(RADIO_GROUP_NAME, [
  createRovingFocusGroupScope,
  createRadioScope,
])

export const useRovingFocusGroupScope = createRovingFocusGroupScope()
export const useRadioScope = createRadioScope()

interface RadioGroupInjectValue {
  name?: Ref<string | undefined>
  required: Ref<boolean | undefined>
  disabled: Ref<boolean | undefined>
  value?: Ref<string>
  onValueChange(value: string): void
}

export const [radioGroupProvider, useRadioGroupInject]
  = createRadioGroupProvider<RadioGroupInjectValue>(RADIO_GROUP_NAME)

export interface RadioGroupProps extends PrimitiveProps {
  // name?: string
  name?: UnwrapRef<RadioGroupInjectValue['name']>
  required?: RadioProps['required']
  disabled?: RadioProps['disabled']
  dir?: RovingFocusGroupProps['dir']
  orientation?: RovingFocusGroupProps['orientation']
  loop?: RovingFocusGroupProps['loop']
  defaultValue?: string
  value?: UnwrapRef<RadioGroupInjectValue['value']>
  modelValue?: string
}

export type RadioGroupEmits = {
  valueChange: [value: string]
  'update:modelValue': [value: string]
}

export const radioGroupProps = {
  props: {
    name: {
      type: String as PropType<RadioGroupProps['name']>,
    },
    required: {
      type: Boolean as PropType<RadioGroupProps['required']>,
      default: false,
    },
    disabled: {
      type: Boolean as PropType<RadioGroupProps['disabled']>,
      default: false,
    },
    dir: {
      type: String as PropType<RadioGroupProps['dir']>,
    },
    orientation: {
      type: String as PropType<RadioGroupProps['orientation']>,
    },
    loop: {
      type: Boolean as PropType<RadioGroupProps['loop']>,
      default: true,
    },
    defaultValue: {
      type: String as PropType<RadioGroupProps['defaultValue']>,
      default: undefined,
    },
    value: {
      type: String as PropType<RadioGroupProps['value']>,
      default: undefined,
    },
    modelValue: {
      type: String as PropType<RadioGroupProps['modelValue']>,
      default: undefined,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'valueChange': (value: RadioGroupEmits['valueChange'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: RadioGroupEmits['update:modelValue'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * RadioGroupItem - radio-group-item.ts
 * ----------------------------------------------------------------------------------------------- */

export type RadioGroupItemNativeElement = RadioNativeElement
export type RadioGroupItemElement = RadioElement

export interface RadioGroupItemProps extends Omit<RadioProps, 'name'> {
  value: string
}

export type RadioGroupItemEmits = Omit<RadioEmits, 'check'> & {
  focus: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}

export const radioGroupItemProps = {
  props: {
    ...propsOmit(radioProps.props, ['name']),
  },
  emits: {
    ...propsOmit(radioProps.emits, ['check']),
    // eslint-disable-next-line unused-imports/no-unused-vars
    focus: (event: RadioGroupItemEmits['focus'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (event: RadioGroupItemEmits['keydown'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * RadioGroupIndicator - radio-group-indicator.ts
 * ----------------------------------------------------------------------------------------------- */

export type RadioGroupIndicatorNativeElement = RadioIndicatorNativeElement
export type RadioGroupIndicatorElement = RadioIndicatorElement

export interface RadioGroupIndicatorProps extends RadioIndicatorProps { }

export const radioGroupIndicatorProps = {
  props: {
    ...radioIndicatorProps.props,
  },
  emits: { },
}
