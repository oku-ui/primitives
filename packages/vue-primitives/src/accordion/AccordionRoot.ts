import type { ConvertEmitsToUseEmits } from '../shared/typeUtils.ts'
import { type AriaAttributes, computed, type Ref } from 'vue'
import { createCollection } from '../collection/index.ts'
import { type Direction, useDirection } from '../direction/Direction.ts'
import { createContext, type MutableRefObject, useControllableStateV2, useId } from '../hooks/index.ts'
import { composeEventHandlers } from '../shared/composeEventHandlers.ts'
import { arrayify, type Data, mergeAttrs } from '../shared/index.ts'

export type AccordionType = 'single' | 'multiple'

export interface AccordionRootProps<T extends AccordionType> extends AccordionImplProps {
  type: T

  value?: T extends 'single' ? AccordionSingleProps['value'] : AccordionMultipleProps['value']

  defaultValue?: T extends 'single' ? AccordionSingleProps['defaultValue'] : AccordionMultipleProps['defaultValue']

  collapsible?: AccordionSingleProps['collapsible']
}

export type AccordionRootEmits<T extends AccordionType> = {
  /**
   * The callback that fires when the state of the toggle group changes.
   */
  'update:value': [value: T extends 'single' ? NonNullable<AccordionSingleProps['value']> : NonNullable<AccordionMultipleProps['value']>]

  'keydown': [event: KeyboardEvent]
}

interface AccordionSingleProps {
  /**
   * The controlled stateful value of the accordion item whose content is expanded.
   */
  value?: string
  /**
   * The value of the item whose content is expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: string
  /**
   * Whether an accordion item can be collapsed after it has been opened.
   * @default false
   */
  collapsible?: boolean
}

interface AccordionMultipleProps {
  /**
   * The controlled stateful value of the accordion items whose contents are expanded.
   */
  value?: string[]
  /**
   * The value of the items whose contents are expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: string[]
}

export interface AccordionImplProps {
  /**
   * Whether or not an accordion is disabled from user interaction.
   *
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * The layout in which the Accordion operates.
   * @default vertical
   */
  orientation?: AriaAttributes['aria-orientation']
  /**
   * The language read direction.
   */
  dir?: Direction
}

export const ACCORDION_KEYS = ['Home', 'End', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight']

export const [Collection, useCollection] = createCollection<HTMLButtonElement>('Accordion')

export interface AccordionContext {
  id: string
  collapsible: boolean

  disabled?: () => boolean | undefined
  direction: Ref<Direction>
  orientation: Exclude<AccordionImplProps['orientation'], undefined>

  value: Ref<string[]>
  onItemOpen: (value: string) => void
  onItemClose: (value: string) => void
}

export const [provideAccordionContext, useAccordionContext] = createContext<AccordionContext>('AccordionContext')

type SingleValue = Exclude<AccordionRootProps<'single'>['value'], undefined>
type MultipleValue = Exclude<AccordionRootProps<'multiple'>['value'], undefined>
type Value<T extends AccordionType> = T extends 'single' ? SingleValue | undefined : MultipleValue | undefined
type DefaultValue<T extends AccordionType> = T extends 'single' ? SingleValue | undefined : MultipleValue
type UptValue<T extends AccordionType> = T extends 'single' ? SingleValue : MultipleValue

export interface UseAccordionRootProps<T extends AccordionType> extends ConvertEmitsToUseEmits<AccordionRootEmits<T>> {
  elRef: MutableRefObject<HTMLElement | undefined>

  value?: () => AccordionRootProps<T>['value']
  defaultValue?: AccordionRootProps<T>['defaultValue']

  collapsible?: AccordionSingleProps['collapsible']

  type: T
  disabled?: () => boolean
  orientation?: AccordionImplProps['orientation']
  dir: () => Direction | undefined
}

export interface UseAccordionRootReturns {
  'data-disabled'?: string
  'data-orientation': AccordionImplProps['orientation']
  'onKeydown': (event: KeyboardEvent) => void
  [key: string]: any
}

export function useAccordionRoot<T extends AccordionType>(
  props: UseAccordionRootProps<T>,
): (extraAttrs?: Data) => UseAccordionRootReturns {
  const direction = useDirection(props.dir)
  const defaultValue = (props.type === 'single' ? props.defaultValue : props.defaultValue ?? []) as DefaultValue<T>
  const value = useControllableStateV2<Value<T>, UptValue<T>, DefaultValue<T>>(props.value, props.onUpdateValue, defaultValue)
  const TYPE_SINGLE = 'single' as const satisfies AccordionType

  const getItems = useCollection(Collection.provideCollectionContext(props.elRef))

  const onKeydown = composeEventHandlers<KeyboardEvent>(props.onKeydown, (event) => {
    if (!ACCORDION_KEYS.includes(event.key))
      return
    const target = event.target as HTMLElement
    const triggerCollection = getItems().filter(item => !item.disabled)
    const triggerIndex = triggerCollection.findIndex(item => item === target)
    const triggerCount = triggerCollection.length

    if (triggerIndex === -1)
      return

    // Prevents page scroll while user is navigating
    event.preventDefault()

    let nextIndex = triggerIndex
    const homeIndex = 0
    const endIndex = triggerCount - 1

    const moveNext = () => {
      nextIndex = triggerIndex + 1
      if (nextIndex > endIndex) {
        nextIndex = homeIndex
      }
    }

    const movePrev = () => {
      nextIndex = triggerIndex - 1
      if (nextIndex < homeIndex) {
        nextIndex = endIndex
      }
    }

    switch (event.key) {
      case 'Home':
        nextIndex = homeIndex
        break
      case 'End':
        nextIndex = endIndex
        break
      case 'ArrowRight':
        if (props.orientation === 'horizontal') {
          if (direction.value === 'ltr') {
            moveNext()
          }
          else {
            movePrev()
          }
        }
        break
      case 'ArrowDown':
        if (props.orientation === 'vertical') {
          moveNext()
        }
        break
      case 'ArrowLeft':
        if (props.orientation === 'horizontal') {
          if (direction.value === 'ltr') {
            movePrev()
          }
          else {
            moveNext()
          }
        }
        break
      case 'ArrowUp':
        if (props.orientation === 'vertical') {
          movePrev()
        }
        break
    }

    const clampedIndex = nextIndex % triggerCount
    triggerCollection[clampedIndex]?.focus()
  })

  provideAccordionContext({
    id: useId(),
    collapsible: props.collapsible ?? false,

    disabled: props.disabled,
    direction,
    orientation: props.orientation ?? 'vertical',
    value: computed(() => {
      if (props.type === TYPE_SINGLE)
        return typeof value.value === 'string' ? [value.value] : []
      return Array.isArray(value.value) ? value.value : []
    }),
    onItemOpen(itemValue) {
      if (props.type === TYPE_SINGLE) {
        value.value = itemValue as DefaultValue<T>
      }
      else {
        value.value = [...arrayify<SingleValue>(value.value || []), itemValue] as DefaultValue<T>
      }
    },
    onItemClose(itemValue) {
      if (props.type === TYPE_SINGLE) {
        if (props.collapsible) {
          value.value = '' as DefaultValue<T>
        }
      }
      else {
        value.value = arrayify<SingleValue>(value.value || []).filter(value => value !== itemValue) as DefaultValue<T>
      }
    },
  })

  return (extraAttrs?: Data): UseAccordionRootReturns => {
    const attrs = {
      'data-disabled': props.disabled?.() ? '' : undefined,
      'data-orientation': props.orientation,
      onKeydown,
    } as const

    if (extraAttrs)
      mergeAttrs(attrs, extraAttrs)

    return attrs
  }
}
