import type { PrimitiveProps } from '../primitive/index.ts'
import type { ElAttrs, EmitsToHookProps, RadixPrimitiveReturns } from '../shared/typeUtils.ts'
import { onWatcherCleanup, type Ref, shallowRef, watchEffect } from 'vue'
import { createContext, type MutableRefObject, useControllableStateV2, useRef } from '../hooks/index.ts'
import { mergeHooksAttrs } from '../shared/mergeProps.ts'
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

export type CheckboxRootEmits = {
  'update:checked': [value: CheckedState]
}

export type CheckedState = boolean | 'indeterminate'

export interface CheckboxContext {
  state: Ref<CheckedState>
  disabled: () => boolean
  bubbleInput: {
    name?: () => string | undefined
    control: Ref<HTMLButtonElement | undefined>
    bubbles: MutableRefObject<boolean>
    value: () => string
    checked: Ref<CheckedState>
    required: () => boolean | undefined
    disabled: () => boolean | undefined
    defaultChecked: boolean | undefined
    isFormControl: MutableRefObject<boolean>
  }
}

export const [provideCheckboxContext, useCheckboxContext] = createContext<CheckboxContext>('Checkbox')

export interface UseCheckboxRootProps extends EmitsToHookProps<CheckboxRootEmits> {
  control?: Ref<HTMLButtonElement | undefined>
  checked?: () => CheckedState | undefined
  defaultChecked?: CheckedState
  disabled?: () => boolean
  required?: () => boolean
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
  // According to WAI ARIA, Checkboxes don't activate on enter keypress
    if (event.key === 'Enter')
      event.preventDefault()
  }

  function onClick(event: MouseEvent) {
    checked.value = isIndeterminate(checked.value) ? true : !checked.value
    if (isFormControl.current) {
      bubbles.current = !event.cancelBubble
      // if checkbox is in a form, stop propagation from the button so that we only propagate
      // one click event (from the input). We propagate changes from an input so that native
      // form validation works and form events reflect checkbox updates.
      if (bubbles.current)
        event.stopPropagation()
    }
  }

  provideCheckboxContext({
    disabled,
    state: checked,
    bubbleInput: {
      name: props.name,
      control,
      bubbles,
      value,
      checked,
      required,
      disabled,
      isFormControl,
      defaultChecked: isIndeterminate(props.defaultChecked) ? false : props.defaultChecked,
    },
  })

  return {
    attrs(extraAttrs) {
      const _disabled = disabled()
      const attrs: ElAttrs = {
        'ref': setTemplateEl,
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

      if (extraAttrs) {
        mergeHooksAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
