import { computed, type MaybeRefOrGetter, type Ref } from 'vue'
import { type Direction, useDirection } from '../direction/index.ts'
import { createContext, useControllableStateV2 } from '../hooks/index.ts'
import { type RovingFocusGroupRootProps, useRovingFocusGroupRoot } from '../roving-focus/index.ts'
import { type EmitsToHookProps, mergePrimitiveAttrs, type PrimitiveDefaultProps, type RadixPrimitiveReturns } from '../shared/index.ts'

export type ToggleGroupType = 'single' | 'multiple' | undefined

export interface ToggleGroupProps<T extends ToggleGroupType> extends ToggleGroupImplProps {
  type?: T

  value?: T extends 'multiple' ? ToggleGroupMultipleProps['value'] : ToggleGroupSingleProps['value']

  defaultValue?: T extends 'multiple' ? ToggleGroupMultipleProps['defaultValue'] : ToggleGroupSingleProps['defaultValue']
}

export const DEFAULT_TOGGLE_GROUP_PROPS = {
  disabled: undefined,
  rovingFocus: undefined,
  loop: undefined,
} satisfies PrimitiveDefaultProps<ToggleGroupProps<ToggleGroupType>>

type SingleValue = ToggleGroupSingleProps['value']
type MultipleValue = ToggleGroupMultipleProps['value']
type Value<T extends ToggleGroupType> = T extends 'multiple' ? MultipleValue : SingleValue
type DefValue<T extends ToggleGroupType> = T extends 'multiple' ? Exclude<SingleValue, undefined> : MultipleValue
type EmitValue<T> = T extends 'multiple' ? Exclude<ToggleGroupMultipleProps['value'], undefined> : Exclude<ToggleGroupSingleProps['value'], undefined>

export type ToggleGroupEmits<T extends ToggleGroupType> = {
  /**
   * The callback that fires when the state of the toggle group changes.
   */
  'update:value': [value: EmitValue<T> ]
}

interface ToggleGroupSingleProps {
  /**
   * The controlled stateful value of the item that is pressed.
   */
  value?: string
  /**
   * The value of the item that is pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string
}

interface ToggleGroupMultipleProps {
  /**
   * The controlled stateful value of the items that are pressed.
   */
  value?: string[]
  /**
   * The value of the items that are pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string[]
}

interface ToggleGroupImplProps {
  /**
   * Whether the group is disabled from user interaction.
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * Whether the group should maintain roving focus of its buttons.
   * @defaultValue true
   */
  rovingFocus?: boolean
  loop?: RovingFocusGroupRootProps['loop']
  orientation?: RovingFocusGroupRootProps['orientation']
  dir?: RovingFocusGroupRootProps['dir']
}

export interface ToggleGroupContext {
  rovingFocus: boolean
  disabled: () => boolean | undefined

  type: ToggleGroupType
  value: Ref<string[]>
  onItemActivate: (value: string) => void
  onItemDeactivate: (value: string) => void
}

export const [provideToggleGroupContext, useToggleGroupContext] = createContext<ToggleGroupContext>('ToggleGroup')

export interface UseToggleGroupProps<T extends ToggleGroupType> extends EmitsToHookProps<ToggleGroupEmits<T>> {
  type?: T
  value?: () => T extends 'multiple' ? ToggleGroupMultipleProps['value'] : ToggleGroupSingleProps['value']
  defaultValue?: T extends 'multiple' ? ToggleGroupMultipleProps['defaultValue'] : ToggleGroupSingleProps['defaultValue']

  disabled?: () => boolean | undefined
  rovingFocus?: boolean
  loop?: RovingFocusGroupRootProps['loop']
  orientation?: RovingFocusGroupRootProps['orientation']
  dir?: MaybeRefOrGetter<Direction | undefined>
}

const TYPE_MULTIPLE = 'multiple' as const satisfies ToggleGroupType

export function useToggleGroup<T extends ToggleGroupType>(props: UseToggleGroupProps<T>): RadixPrimitiveReturns {
  const isMultiple = props.type === TYPE_MULTIPLE
  const {
    disabled = () => undefined,
    rovingFocus = true,
    loop = true,
    defaultValue = isMultiple ? [] : undefined,
  } = props

  const value = useControllableStateV2<Value<T>, EmitValue<T>, DefValue<T>>(
    props.value,
    props.onUpdateValue,
    defaultValue as DefValue<T>,
  )

  const direction = useDirection(props.dir)

  provideToggleGroupContext({
    type: props.type,
    value: isMultiple
      ? value as Ref<string[]>
      : computed<string[]>(() => value.value ? [value.value as string] : []),
    onItemActivate: isMultiple
      ? (itemValue) => {
          value.value = [...value.value || [], itemValue] as DefValue<T>
        }
      : (itemValue) => {
          value.value = itemValue as DefValue<T>
        },
    onItemDeactivate: isMultiple
      ? (itemValue) => {
          value.value = ((value.value || []) as string[]).filter(value => value !== itemValue) as DefValue<T>
        }
      : () => {
          value.value = '' as DefValue<T>
        },
    rovingFocus,
    disabled,
  })

  const rovingFocusGroupRoot = rovingFocus
    ? useRovingFocusGroupRoot({
      orientation: props.orientation,
      dir: direction,
      loop,
    })
    : undefined

  return {
    attrs(extraAttrs = []) {
      const primitiveAttrs = {
        role: 'group',
        dir: direction.value,
      }

      if (rovingFocusGroupRoot) {
        return rovingFocusGroupRoot.attrs([primitiveAttrs, ...extraAttrs])
      }

      if (extraAttrs.length > 0) {
        mergePrimitiveAttrs(primitiveAttrs, extraAttrs)
      }

      return primitiveAttrs
    },
  }
}
