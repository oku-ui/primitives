import { computed, type MaybeRefOrGetter, type Ref } from 'vue'
import { type Direction, useDirection } from '../direction/index.ts'
import { createContext, useControllableStateV2 } from '../hooks/index.ts'
import { type RovingFocusGroupRootProps, useRovingFocusGroupRoot } from '../roving-focus/index.ts'
import { type EmitsToHookProps, mergePrimitiveAttrs, type PrimitiveElAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'

export type ToggleGroupType = 'single' | 'multiple' | undefined

export interface ToggleGroupProps<T extends ToggleGroupType> extends ToggleGroupImplProps {
  type?: T

  value?: T extends 'multiple' ? ToggleGroupMultipleProps['value'] : ToggleGroupSingleProps['value']

  defaultValue?: T extends 'multiple' ? ToggleGroupMultipleProps['defaultValue'] : ToggleGroupSingleProps['defaultValue']
}

export type ToggleGroupEmits<T extends ToggleGroupType> = {
  /**
   * The callback that fires when the state of the toggle group changes.
   */
  'update:value': [value: T extends 'multiple' ? NonNullable<ToggleGroupMultipleProps['value']> : NonNullable<ToggleGroupSingleProps['value']>]
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

type SingleValue = Exclude<ToggleGroupProps<'single'>['value'], undefined>
type MultipleValue = Exclude<ToggleGroupProps<'multiple'>['value'], undefined>
type Value<T extends ToggleGroupType> = T extends 'multiple' ? MultipleValue : SingleValue

const TYPE_MULTIPLE = 'multiple' as const satisfies ToggleGroupType

export function useToggleGroup<T extends ToggleGroupType>(props: UseToggleGroupProps<T>): RadixPrimitiveReturns {
  const {
    disabled = () => false,
    rovingFocus = true,
    loop = true,
  } = props

  const defaultValue = (props.type === TYPE_MULTIPLE ? props.defaultValue ?? [] : props.defaultValue) as Value<T>
  const value = useControllableStateV2(props.value, props.onUpdateValue, defaultValue)

  const direction = useDirection(props.dir)

  provideToggleGroupContext({
    type: props.type,
    value: props.type === TYPE_MULTIPLE
      ? value as Ref<string[]>
      : computed<string[]>(() => value.value ? [value.value as string] : []),
    onItemActivate: props.type === TYPE_MULTIPLE
      ? (itemValue) => {
          value.value = [...value.value || [], itemValue] as Value<T>
        }
      : (itemValue) => {
          value.value = itemValue as Value<T>
        },
    onItemDeactivate: props.type === TYPE_MULTIPLE
      ? (itemValue) => {
          value.value = ((value.value || []) as string[]).filter(value => value !== itemValue) as Value<T>
        }
      : () => {
          value.value = '' as Value<T>
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
    attrs(extraAttrs) {
      const attrs = {
        role: 'group',
        dir: direction.value,
      }

      const extraAttrsList: PrimitiveElAttrs[] = []

      if (rovingFocusGroupRoot) {
        extraAttrsList.push(rovingFocusGroupRoot.attrs())
      }

      if (extraAttrs && extraAttrs.length > 0) {
        extraAttrsList.push(...extraAttrs)
      }

      if (extraAttrsList.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrsList)
      }

      return attrs
    },
  }
}
