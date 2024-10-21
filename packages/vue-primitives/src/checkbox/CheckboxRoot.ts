import type { PrimitiveProps } from '../primitive/index.ts'
import type { EmitsToHookProps, PrimitiveDefaultProps, PrimitiveElAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import { onWatcherCleanup, type Ref, shallowRef, watchEffect } from 'vue'
import { createContext, type MutableRefObject, useControllableStateV2, useRef } from '../hooks/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { getState, isIndeterminate } from './utils.ts'

export interface CheckboxRootProps {
  as?: PrimitiveProps['as']
  checked?: CheckedState
  defaultChecked?: CheckedState
  disabled?: boolean
  required?: boolean
  value?: string
  name?: string
}

export const DEFAULT_CHECKBOX_ROOT_PROPS = {
  as: 'button',
  value: 'on',
  checked: undefined,
  defaultChecked: undefined,
  disabled: undefined,
  required: undefined,
} satisfies PrimitiveDefaultProps<CheckboxRootProps>

export type CheckboxRootEmits = {
  'update:checked': [value: CheckedState]
}

export type CheckedState = boolean | 'indeterminate'

export interface CheckboxContext {
  checked: Ref<CheckedState>
  disabled: () => boolean | undefined
  bubbleInput: {
    control: Ref<HTMLButtonElement | undefined>
    bubbles: MutableRefObject<boolean>
    isFormControl: MutableRefObject<boolean>
    name?: () => string | undefined
    value: () => string
    checked: Ref<CheckedState>
    defaultChecked: boolean | undefined
    required: () => boolean | undefined
    disabled: () => boolean | undefined
  }
}

export const [provideCheckboxContext, useCheckboxContext] = createContext<CheckboxContext>('Checkbox')

export interface UseCheckboxRootProps extends EmitsToHookProps<CheckboxRootEmits> {
  control?: Ref<HTMLButtonElement | undefined>
  checked?: () => CheckedState | undefined
  defaultChecked?: CheckedState
  disabled?: () => boolean | undefined
  required?: () => boolean | undefined
  value?: () => string
  name?: () => string | undefined
}

export function useCheckboxRoot(props: UseCheckboxRootProps): RadixPrimitiveReturns {
  const {
    disabled = () => false,
    required = () => false,
    value = () => 'on',
  } = props

  const control = props.control || shallowRef<HTMLButtonElement>()
  const setTemplateEl = props.control ? undefined : (value: HTMLElement | undefined) => control.value = value as HTMLButtonElement

  const bubbles = useRef(true)
  // We set this to true by default so that events bubble to forms without JS (SSR)
  const isFormControl = useRef(false)
  const checked = useControllableStateV2(props.checked, props.onUpdateChecked, props.defaultChecked ?? false)

  const initialCheckedStateRef = checked.value

  watchEffect(() => {
    const form = control.value?.form
    if (!form)
      return

    const reset = () => {
      checked.value = initialCheckedStateRef
    }

    form.addEventListener('reset', reset)

    onWatcherCleanup(() => {
      form.removeEventListener('reset', reset)
    })
  })

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented)
      return
    // According to WAI ARIA, Checkboxes don't activate on enter keypress
    if (event.key === 'Enter')
      event.preventDefault()
  }

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented)
      return
    checked.value = isIndeterminate(checked.value) ? true : !checked.value

    if (!isFormControl.value)
      return

    bubbles.value = !event.cancelBubble
    // if checkbox is in a form, stop propagation from the button so that we only propagate
    // one click event (from the input). We propagate changes from an input so that native
    // form validation works and form events reflect checkbox updates.
    if (bubbles.value)
      event.stopPropagation()
  }

  provideCheckboxContext({
    disabled,
    checked,
    bubbleInput: {
      control,
      bubbles,
      isFormControl,
      name: props.name,
      value,
      checked,
      defaultChecked: isIndeterminate(props.defaultChecked) ? false : props.defaultChecked,
      required,
      disabled,
    },
  })

  return {
    attrs(extraAttrs) {
      const _disabled = disabled()
      const attrs: PrimitiveElAttrs = {
        'elRef': setTemplateEl,
        'type': 'button',
        'role': 'checkbox',
        'aria-checked': isIndeterminate(checked.value) ? 'mixed' : checked.value,
        'aria-required': required(),
        'data-state': getState(checked.value),
        'data-disabled': _disabled ? '' : undefined,
        'disabled': _disabled,
        'value': value(),
        onKeydown,
        onClick,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
