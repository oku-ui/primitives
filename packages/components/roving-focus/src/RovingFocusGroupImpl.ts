import type { ComputedRef, PropType, Ref } from 'vue'
import { computed, defineComponent, h, mergeProps, ref, toRefs, watchEffect } from 'vue'
import { useCallbackRef, useComposedRefs, useControllable, useForwardRef } from '@oku-ui/use-composable'

import type { ElementType } from '@oku-ui/primitive'

import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import type { ScopeRovingFocus } from './utils'
import { focusFirst } from './utils'
import type { RovingFocusGroupOptions } from './RovingFocusGroup'
import { rovingFocusGroupOptionsProps, rovingFocusProvider, useCollection } from './RovingFocusGroup'
import { scopedProps } from './types'

const ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus'
const EVENT_OPTIONS = { bubbles: false, cancelable: true }

export type RovingFocusGroupImplIntrinsicElement = ElementType<'div'>
export type RovingFocusGroupImplElement = HTMLDivElement

interface RovingFocusGroupImplProps extends RovingFocusGroupOptions {
  currentTabStopId?: Ref<string | null>
  defaultCurrentTabStopId?: string
  onCurrentTabStopIdChange?: (tabStopId: string | null) => void
  onEntryFocus?: (event: Event) => void
  onMousedown?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
  isChangedFocusableItemAdd?: number
  isChangedFocusableItemRemove?: number
}

export const rovingFocusGroupImplElementProps = {
  currentTabStopId: String as unknown as PropType<ComputedRef<string | null>>,
  defaultCurrentTabStopId: String,
  // onCurrentTabStopIdChange: Function as PropType<RovingFocusGroupImplProps['onCurrentTabStopIdChange']>,
  // onEntryFocus: Function as PropType<RovingFocusGroupImplProps['onEntryFocus']>,
  onMousedown: Function as PropType<(e: MouseEvent) => void>,
  onFocus: Function as PropType<(e: FocusEvent) => void>,
  onBlur: Function as PropType<(e: FocusEvent) => void>,
}

export const rovingFocusGroupImplProps = {
  ...rovingFocusGroupImplElementProps,
  ...rovingFocusGroupOptionsProps,
}

const RovingFocusGroupImpl = defineComponent({
  name: 'OkuRovingFocusGroupImpl',
  inheritAttrs: false,
  props: {
    ...rovingFocusGroupImplProps,
    ...primitiveProps,
    ...scopedProps,
  },
  emits: {
    currentTabStopId: (tabStopId: string | null) => true,
    entryFocus: (event: Event) => true,
    currentTabStopIdChange: (tabStopId: string | null) => true,
  },
  setup(props, { attrs, slots, emit }) {
    const _attrs = attrs as Omit<RovingFocusGroupImplElement, 'dir'>
    const {
      orientation,
      loop,
      dir,
      currentTabStopId: currentTabStopIdProp,
      defaultCurrentTabStopId,
      onEntryFocus,
      asChild,
      scopeOkuRovingFocusGroup,
      ...propsData
    } = toRefs(props)
    const buttonRef = ref<HTMLDivElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(buttonRef, forwardedRef)

    const { state: currentTabStopId, updateValue: updateCurrentTabStopId } = useControllable({
      prop: computed(() => currentTabStopIdProp.value),
      defaultProp: computed(() => defaultCurrentTabStopId.value),
      onChange: (result: any) => {
        emit('currentTabStopId', result)
      },
    })

    const isTabbingBackOut = ref(false)
    const handleEntryFocus = useCallbackRef(onEntryFocus?.value || undefined)
    const getItems = useCollection(props.scopeOkuRovingFocusGroup)
    const isClickFocusRef = ref(false)
    const focusableItemsCount = ref(0)

    watchEffect(() => {
      const node = buttonRef.value
      if (node) {
        node.addEventListener(ENTRY_FOCUS, handleEntryFocus)
        return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus)
      }
    })

    rovingFocusProvider({
      scope: props.scopeOkuRovingFocusGroup,
      orientation,
      dir,
      loop,
      currentTabStopId: currentTabStopId || null,
      onItemFocus: (tabStopId: string) => {
        updateCurrentTabStopId(tabStopId)
      },
      onItemShiftTab: () => {
        isTabbingBackOut.value = true
      },
      onFocusableItemAdd: () => {
        focusableItemsCount.value++
      },
      onFocusableItemRemove: () => {
        focusableItemsCount.value--
      },
    })

    const _tabIndex = computed(() => isTabbingBackOut.value || focusableItemsCount.value === 0 ? -1 : 0)

    return () => {
      const merged = mergeProps(_attrs, propsData)
      return h(Primitive.div, {
        'tabindex': _tabIndex.value,
        'data-orientation': orientation?.value,
        ...merged,
        'ref': composedRefs,
        'style': {
          outline: 'none',
          ..._attrs.style as any,
        },
        'asChild': asChild.value,
        'onMousedown': composeEventHandlers(props.onMousedown, () => {
          isClickFocusRef.value = true
        }),
        'onFocus': composeEventHandlers(props.onFocus, (event: FocusEvent) => {
          // We normally wouldn't need this check, because we already check
          // that the focus is on the current target and not bubbling to it.
          // We do this because Safari doesn't focus buttons when clicked, and
          // instead, the wrapper will get focused and not through a bubbling event.
          const isKeyboardFocus = !isClickFocusRef.value

          if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut.value) {
            const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS)
            event.currentTarget?.dispatchEvent(entryFocusEvent)
            if (!entryFocusEvent.defaultPrevented) {
              const items = getItems.value.filter(item => item.focusable)
              const activeItem = items.find(item => item.active)
              const currentItem = items.find(item => item.id === currentTabStopId.value)
              const candidateItems = [activeItem, currentItem, ...items].filter(
                Boolean,
              ) as typeof items
              const candidateNodes = candidateItems.map(item => item.ref)
              focusFirst(candidateNodes)
            }
          }

          isClickFocusRef.value = false
        }),
        'onBlur': composeEventHandlers(props.onBlur, () => {
          isTabbingBackOut.value = false
        }),
      }, {
        default: () => slots.default?.(),
      })
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuRovingFocusGroupImpl = RovingFocusGroupImpl as typeof RovingFocusGroupImpl &
(new () => {
  $props: ScopeRovingFocus<Partial<RovingFocusGroupImplElement>>
})

export type {
  RovingFocusGroupImplProps,
}
