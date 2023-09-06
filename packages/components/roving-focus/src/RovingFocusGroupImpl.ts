import type { ComputedRef, PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, ref, toRefs, unref, watchEffect } from 'vue'
import { useCallbackRef, useComposedRefs, useControllable, useForwardRef } from '@oku-ui/use-composable'

import type { OkuElement } from '@oku-ui/primitive'

import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import type { RovingFocusGroupOptions } from './utils'
import { focusFirst, rovingFocusGroupOptionsProps } from './utils'
import { rovingFocusProvider, useCollection } from './RovingFocusGroup'
import { scopedProps } from './types'

const ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus'
const EVENT_OPTIONS = { bubbles: false, cancelable: true }

export type RovingFocusGroupImplNaviteElement = OkuElement<'div'>
export type RovingFocusGroupImplElement = HTMLDivElement

export interface RovingFocusGroupImplProps extends RovingFocusGroupOptions {
  currentTabStopId?: string | null
  defaultCurrentTabStopId?: string
}

export type RovingFocusGroupImplEmits = {
  currentTabStopIdChange: [tabStopId: string | null]
  entryFocus: [event: Event]
  mousedown: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}

export const rovingFocusGroupImplProps = {
  props: {
    currentTabStopId: String as unknown as PropType<ComputedRef<string | null>>,
    defaultCurrentTabStopId: String,
    ...rovingFocusGroupOptionsProps.props,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    entryFocus: (event: Event) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    currentTabStopIdChange: (tabStopId: string | null) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    mousedown: (event: MouseEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    focus: (event: FocusEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    blur: (event: FocusEvent) => true,
  },
}

const RovingFocusGroupImpl = defineComponent({
  name: 'OkuRovingFocusGroupImpl',
  inheritAttrs: false,
  props: {
    ...rovingFocusGroupImplProps.props,
    ...primitiveProps,
    ...scopedProps,
  },
  emits: rovingFocusGroupImplProps.emits,
  setup(props, { attrs, slots, emit }) {
    const _attrs = attrs as Omit<RovingFocusGroupImplNaviteElement, 'dir'>
    const {
      orientation,
      loop,
      currentTabStopId: currentTabStopIdProp,
      defaultCurrentTabStopId,
      onEntryFocus,
      asChild,
      scopeOkuRovingFocusGroup,
      dir,
      ...propsData
    } = toRefs(props)

    const buttonRef = ref<HTMLDivElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(buttonRef, forwardedRef)

    const { state: currentTabStopId, updateValue: updateCurrentTabStopId } = useControllable({
      prop: computed(() => currentTabStopIdProp.value),
      defaultProp: computed(() => defaultCurrentTabStopId.value),
      onChange: (result: any) => {
        emit('currentTabStopIdChange', result)
      },
      initialValue: null,
    })

    const isTabbingBackOut = ref(false)
    const handleEntryFocus = useCallbackRef(onEntryFocus?.value || undefined)
    const getItems = useCollection(scopeOkuRovingFocusGroup.value)
    const isClickFocusRef = ref(false)
    const focusableItemsCount = ref(0)

    watchEffect(() => {
      const node = buttonRef.value
      if (node) {
        node.addEventListener(ENTRY_FOCUS, handleEntryFocus.value)
        return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus.value)
      }
    })

    rovingFocusProvider({
      scope: scopeOkuRovingFocusGroup.value,
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

    return () => {
      return h(Primitive.div, {
        'tabindex': isTabbingBackOut.value || focusableItemsCount.value === 0 ? -1 : 0,
        'data-orientation': orientation?.value,
        ...unref(mergeProps(propsData, _attrs)),
        'ref': composedRefs,
        'style': {
          outline: 'none',
          ..._attrs.style as any,
        },
        'asChild': asChild.value,
        'onMousedown': composeEventHandlers<MouseEvent>((e) => {
          emit('mousedown', e)
        }, () => {
          isClickFocusRef.value = true
        }),
        'onFocus': composeEventHandlers<FocusEvent>((e) => {
          emit('focus', e)
        }, (event: FocusEvent) => {
          // We normally wouldn't need this check, because we already check
          // that the focus is on the current target and not bubbling to it.
          // We do this because Safari doesn't focus buttons when clicked, and
          // instead, the wrapper will get focused and not through a bubbling event.
          const isKeyboardFocus = !isClickFocusRef.value

          if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut.value) {
            const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS)
            event.currentTarget?.dispatchEvent(entryFocusEvent)
            if (!entryFocusEvent.defaultPrevented) {
              const items = getItems().filter(item => item.focusable)
              const activeItem = items.find(item => item.active)
              const currentItem = items.find(item => item.id === currentTabStopId.value)
              const candidateItems = [activeItem, currentItem, ...items].filter(
                Boolean,
              ) as typeof items
              const candidateNodes = candidateItems.map(item => item.ref.value)
              focusFirst(candidateNodes)
            }
          }

          isClickFocusRef.value = false
        }),
        'onBlur': composeEventHandlers<FocusEvent>((e) => {
          emit('blur', e)
        }, () => {
          isTabbingBackOut.value = false
        }),
      }, slots)
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuRovingFocusGroupImpl = RovingFocusGroupImpl as typeof RovingFocusGroupImpl &
(new () => {
  $props: RovingFocusGroupImplNaviteElement
})
