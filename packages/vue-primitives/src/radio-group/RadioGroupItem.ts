import type { PrimitiveProps } from '../primitive/index.ts'
import { computed, onBeforeUnmount, onMounted, type Ref, shallowRef } from 'vue'
import { createContext, type MutableRefObject, useRef } from '../hooks/index.ts'
import { useRovingFocusGroupItem } from '../roving-focus/index.ts'
import { mergePrimitiveAttrs, type PrimitiveDefaultProps, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useRadioGroupContext } from './RadioGroupRoot.ts'

export interface RadioGroupItemProps {
  as?: PrimitiveProps['as']
  value: string
  name?: string
  disabled?: boolean
}

export const DEFAULT_RADIO_GROUP_ITEM_PROPS = {
  as: 'button',
  disabled: undefined,
} satisfies PrimitiveDefaultProps<RadioGroupItemProps>

export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

export interface RadioContext {
  checked: Ref<boolean>
  disabled: Ref<boolean | undefined>
  bubbleInput: {
    control: Ref<HTMLButtonElement | undefined>
    bubbles: MutableRefObject<boolean>
    isFormControl: MutableRefObject<boolean>

    name: () => string | undefined
    value: () => string
    checked: Ref<boolean>
    required: () => boolean | undefined
    disabled: Ref<boolean | undefined>
  }
}

export const [provideRadioContext, useRadioContext] = createContext<RadioContext>('Radio')

export interface UseRadioGroupItem {
  control?: Ref<HTMLButtonElement | undefined>
  value: () => string
  name?: () => string | undefined
  disabled?: () => boolean | undefined
}

export function useRadioGroupItem(props: UseRadioGroupItem): RadixPrimitiveReturns {
  const control = props.control || shallowRef<HTMLButtonElement>()
  const setTemplateEl = props.control ? undefined : (value: HTMLElement | undefined) => control.value = value as HTMLButtonElement

  const context = useRadioGroupContext('RadioGroupItem')

  const disabled = computed(() => context.disabled() || props.disabled?.())
  const checked = computed(() => context.value.value === props.value())

  let isArrowKeyPressed: boolean = false

  function onDocumentKeydown(event: KeyboardEvent) {
    if (ARROW_KEYS.includes(event.key)) {
      isArrowKeyPressed = true
    }
  }

  function onDocumentKeyup() {
    isArrowKeyPressed = false
  }

  onMounted(() => {
    document.addEventListener('keydown', onDocumentKeydown)
    document.addEventListener('keyup', onDocumentKeyup)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onDocumentKeydown)
    document.removeEventListener('keyup', onDocumentKeyup)
  })

  function onCheck() {
    context.onValueChange(props.value())
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented)
      return
    // According to WAI ARIA, radio groups don't activate items on enter keypress
    if (event.key === 'Enter')
      event.preventDefault()
  }

  function onFocus(event: FocusEvent) {
    if (event.defaultPrevented)
      return
    /**
     * Our `RovingFocusGroup` will focus the radio when navigating with arrow keys
     * and we need to "check" it in that case. We click it to "check" it (instead
     * of updating `context.value`) so that the radio change event fires.
     */
    if (isArrowKeyPressed)
      control.value?.click()
  }

  // COMP::Radio
  const bubbles = useRef(true)
  // We set this to true by default so that events bubble to forms without JS (SSR)
  const isFormControl = useRef(false)

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented)
      return
    // radios cannot be unchecked so we only communicate a checked state
    if (!checked.value)
      onCheck()

    if (!isFormControl.value)
      return

    bubbles.value = !event.cancelBubble
  }

  provideRadioContext({
    checked,
    disabled,
    bubbleInput: {
      control,
      bubbles,
      isFormControl,

      name: context.name,
      value: props.value,
      checked,
      required: context.required,
      disabled,
    },
  })

  const rovingFocusGroupItem = useRovingFocusGroupItem({
    focusable() {
      return !disabled.value
    },
    active() {
      return checked.value
    },
  })

  return {
    attrs(extraAttrs = []) {
      const _disabled = disabled.value

      const attrs = {
        'elRef': setTemplateEl,
        'type': 'button',
        'role': 'radio',
        'aria-checked': checked.value,
        'data-state': checked.value ? 'checked' : 'unchecked',
        'data-disabled': _disabled ? '' : undefined,
        'disabled': _disabled,
        'value': props.value(),
        onKeydown,
        onFocus,
        onClick,
      }

      mergePrimitiveAttrs(attrs, [rovingFocusGroupItem.attrs(), ...extraAttrs])

      return attrs
    },
  }
}
