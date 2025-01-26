import type { MaybeRefOrGetter, Ref } from 'vue'
import type { Direction } from '../direction/index.ts'
import type { MutableRefObject } from '../hooks/index.ts'
import type { RovingFocusGroupRootProps } from '../roving-focus/index.ts'
import type { EmitsToHookProps, PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { useDirection } from '../direction/index.ts'
import { createContext, useControllableStateV2, useRef } from '../hooks/index.ts'
import { useRovingFocusGroupRoot } from '../roving-focus/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'

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

export const DEFAULT_RADIO_GROUP_ROOT_PROPS = {
  disabled: undefined,
  required: undefined,
  loop: undefined,
} satisfies PrimitiveDefaultProps<RadioGroupRootProps>

export type RadioGroupRootEmits = {
  'update:value': [value: string]
}

export interface RadioGroupContext {
  name: () => string | undefined
  required: () => boolean | undefined
  disabled: () => boolean | undefined
  value: Ref<string | undefined>
  onValueChange: (value: string) => void
}

export const [provideRadioGroupContext, useRadioGroupContext] = createContext<RadioGroupContext>('RadioGroup')

export interface UseRadioGroupRootProps extends EmitsToHookProps<RadioGroupRootEmits> {
  elRef?: MutableRefObject<HTMLElement | undefined>

  value?: () => string | undefined
  defaultValue?: string

  name?: () => string | undefined
  required?: () => boolean | undefined
  disabled?: () => boolean | undefined

  orientation?: RovingFocusGroupRootProps['orientation']
  loop?: boolean

  dir?: MaybeRefOrGetter<Direction | undefined>
}

export function useRadioGroupRoot(props: UseRadioGroupRootProps): RadixPrimitiveReturns {
  const {
    loop = true,
    name = () => undefined,
    disabled = () => undefined,
    required = () => undefined,
  } = props

  const elRef = props.elRef || useRef<HTMLElement>()
  const setElRef = props.elRef ? undefined : (value: HTMLElement | undefined) => elRef.value = value

  const direction = useDirection(props.dir)

  const value = useControllableStateV2(props.value, props.onUpdateValue, props.defaultValue)

  provideRadioGroupContext({
    name,
    required,
    disabled,
    value,
    onValueChange(v) {
      value.value = v
    },
  })

  const rovingFocusGroupRoot = useRovingFocusGroupRoot({
    orientation: props.orientation,
    loop,
    dir: direction,
  })

  return {
    attrs(extraAttrs = []) {
      const attrs = {
        'elRef': setElRef,
        'role': 'radiogroup',
        'aria-required': props.required?.(),
        'aria-orientation': props.orientation,
        'data-disabled': disabled() ? '' : undefined,
      }

      mergePrimitiveAttrs(attrs, [rovingFocusGroupRoot.attrs(), ...extraAttrs])

      return attrs
    },
  }
}
