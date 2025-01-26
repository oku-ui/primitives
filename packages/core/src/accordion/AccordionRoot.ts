import type { AriaAttributes, MaybeRefOrGetter, Ref } from 'vue'
import type { Direction } from '../direction/index.ts'
import type { MutableRefObject } from '../hooks/index.ts'
import type { EmitsToHookProps, PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { computed } from 'vue'
import { createCollection } from '../collection/index.ts'
import { useDirection } from '../direction/index.ts'
import { createContext, useControllableStateV2, useId, useRef } from '../hooks/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'

export type AccordionType = 'single' | 'multiple' | undefined
export type IsSingle<T extends AccordionType> = T extends 'single' | undefined ? true : false

export interface AccordionRootProps<T extends AccordionType> extends AccordionImplProps {
  type?: T

  value?: T extends 'multiple' ? AccordionMultipleProps['value'] : AccordionSingleProps['value']

  defaultValue?: T extends 'multiple' ? AccordionMultipleProps['defaultValue'] : AccordionSingleProps['defaultValue']

  collapsible?: AccordionSingleProps['collapsible']
}

type SingleValue = AccordionSingleProps['value']
type MultipleValue = AccordionMultipleProps['value']
type Value<T extends AccordionType> = T extends 'multiple' ? MultipleValue : SingleValue
type DefValue<T extends AccordionType> = T extends 'multiple' ? Exclude<SingleValue, undefined> : MultipleValue
type EmitValue<T> = T extends 'multiple' ? Exclude<AccordionMultipleProps['value'], undefined> : Exclude<AccordionSingleProps['value'], undefined>

export const DEFAULT_ACCORDION_ROOT_PROPS = {
  collapsible: undefined,
  disabled: undefined,
} satisfies PrimitiveDefaultProps<AccordionRootProps<AccordionType>>

export type AccordionRootEmits<T extends AccordionType> = {
  /**
   * The callback that fires when the state of the toggle group changes.
   */
  'update:value': [value: EmitValue<T>]
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
  collapsible?: boolean

  disabled?: () => boolean | undefined
  direction: Ref<Direction>
  orientation: Exclude<AccordionImplProps['orientation'], undefined>

  value: Ref<string[]>
  onItemOpen: (value: string) => void
  onItemClose: (value: string) => void
}

export const [provideAccordionContext, useAccordionContext] = createContext<AccordionContext>('AccordionContext')

export interface UseAccordionRootProps<T extends AccordionType> extends EmitsToHookProps<AccordionRootEmits<T>> {
  elRef?: MutableRefObject<HTMLElement | undefined>

  value?: () => T extends 'multiple' ? AccordionMultipleProps['value'] : AccordionSingleProps['value']
  defaultValue?: T extends 'multiple' ? AccordionMultipleProps['defaultValue'] : AccordionSingleProps['defaultValue']

  collapsible?: AccordionSingleProps['collapsible']

  type?: T
  disabled?: () => boolean | undefined
  orientation?: AccordionImplProps['orientation']
  dir?: MaybeRefOrGetter<Direction | undefined>
}

const TYPE_MULTIPLE = 'multiple' as const satisfies AccordionType

export function useAccordionRoot<T extends AccordionType>(props: UseAccordionRootProps<T>): RadixPrimitiveReturns {
  const isMultiple = props.type === TYPE_MULTIPLE
  const {
    orientation = 'vertical',
    defaultValue = isMultiple ? [] : undefined,
  } = props

  const direction = useDirection(props.dir)
  const value = useControllableStateV2<Value<T>, EmitValue<T>, DefValue<T>>(
    props.value,
    props.onUpdateValue,
    defaultValue as DefValue<T>,
  )

  const elRef = props.elRef || useRef<HTMLElement>()
  const setElRef = props.elRef ? undefined : (value: HTMLElement | undefined) => elRef.value = value

  const getItems = useCollection(Collection.provideCollectionContext(elRef))

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented)
      return

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
        if (orientation === 'horizontal') {
          if (direction.value === 'ltr') {
            moveNext()
          }
          else {
            movePrev()
          }
        }
        break
      case 'ArrowDown':
        if (orientation === 'vertical') {
          moveNext()
        }
        break
      case 'ArrowLeft':
        if (orientation === 'horizontal') {
          if (direction.value === 'ltr') {
            movePrev()
          }
          else {
            moveNext()
          }
        }
        break
      case 'ArrowUp':
        if (orientation === 'vertical') {
          movePrev()
        }
        break
    }

    const clampedIndex = nextIndex % triggerCount
    triggerCollection[clampedIndex]?.focus()
  }

  provideAccordionContext({
    id: useId(),
    collapsible: props.collapsible,

    disabled: props.disabled,
    direction,
    orientation: orientation ?? 'vertical',
    value: isMultiple
      ? value as Ref<string[]>
      : computed<string[]>(() => value.value ? [value.value as string] : []),
    onItemOpen: isMultiple
      ? (itemValue) => {
          value.value = [...value.value || [], itemValue] as DefValue<T>
        }
      : (itemValue) => {
          value.value = itemValue as DefValue<T>
        },
    onItemClose: isMultiple
      ? (itemValue) => {
          value.value = ((value.value || []) as string[]).filter(value => value !== itemValue) as DefValue<T>
        }
      : () => {
          if (props.collapsible) {
            value.value = '' as DefValue<T>
          }
        },
  })

  return {
    attrs(extraAttrs) {
      const _disabled = props.disabled?.()
      const attrs = {
        'elRef': setElRef,
        'data-disabled': _disabled ? '' : undefined,
        'data-orientation': orientation,
        'onKeydown': onKeydown,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
