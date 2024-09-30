import type { MaybeRefOrGetter, Ref } from 'vue'
import { type Direction, useDirection } from '../direction/index.ts'
import { createContext, type MutableRefObject, useControllableStateV2, useRef } from '../hooks/index.ts'
import { type RovingFocusGroupRootProps, useRovingFocusGroupRoot } from '../roving-focus/index.ts'
import { type EmitsToHookProps, mergeHooksAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'

export interface RadioGroupRootProps {
  name?: string
  required?: boolean
  disabled?: boolean
  dir?: RovingFocusGroupRootProps['dir']
  orientation?: RovingFocusGroupRootProps['orientation']
  loop?: RovingFocusGroupRootProps['loop']
  value?: string
  defaultValue?: string
}

export type RadioGroupRootEmits = {
  'update:value': [value: string]
}

export interface RadioGroupContext {
  name: () => string | undefined
  required: () => boolean
  disabled: () => boolean
  value: Ref<string | undefined>
  onValueChange: (value: string) => void
}

export const [provideRadioGroupContext, useRadioGroupContext] = createContext<RadioGroupContext>('RadioGroup')

export interface UseRadioGroupRootProps extends EmitsToHookProps<RadioGroupRootEmits> {
  elRef?: MutableRefObject<HTMLElement | undefined>

  value?: () => string | undefined
  defaultValue?: string

  name?: () => string | undefined
  required?: () => boolean
  disabled?: () => boolean

  orientation?: RovingFocusGroupRootProps['orientation']
  loop?: boolean

  dir?: MaybeRefOrGetter<Direction | undefined>
}

export function useRadioGroupRoot(props: UseRadioGroupRootProps): RadixPrimitiveReturns {
  const elRef = props.elRef || useRef<HTMLElement>()
  const setTemplateEl = props.elRef ? undefined : (value: HTMLElement | undefined) => elRef.value = value

  const direction = useDirection(props.dir)

  const value = useControllableStateV2(props.value, props.onUpdateValue, props.defaultValue)

  provideRadioGroupContext({
    name: props.name ?? (() => undefined),
    required: props.required ?? (() => false),
    disabled: props.disabled ?? (() => false),
    value,
    onValueChange(v) {
      value.value = v
    },
  })

  const rovingFocusGroupRoot = useRovingFocusGroupRoot({
    orientation: props.orientation,
    loop: props.loop ?? true,
    dir: direction,
  })

  return {
    attrs(extraAttrs = []) {
      const attrs = {
        'ref': setTemplateEl,
        'role': 'radiogroup',
        'aria-required': props.required?.(),
        'aria-orientation': props.orientation,
        'data-disabled': props.disabled?.() ? '' : undefined,
      }

      mergeHooksAttrs(attrs, [rovingFocusGroupRoot.attrs(), ...extraAttrs])

      return attrs
    },
  }
}
