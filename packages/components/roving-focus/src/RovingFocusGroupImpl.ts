import type { PropType } from 'vue'
import { computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { useCallbackRef, useComposeEventHandlers, useComposedRefs, useControllable, useForwardRef } from '@oku-ui/use-composable'

import type { ComponentPublicInstanceRef, ElementType } from '@oku-ui/primitive'

import { Primitive } from '@oku-ui/primitive'
import { type Direction, type Orientation, focusFirst } from './utils'
import { RovingFocusProvider, ScopedProps, useCollection } from './RovingFocusGroup'

const ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus'
const EVENT_OPTIONS = { bubbles: false, cancelable: true }

export type RovingFocusGroupImplElement = ElementType<'div'>
export type _RovingFocusGroupImplEl = HTMLDivElement

export interface RovingFocusGroupOptions {
  /**
   * The orientation of the group.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   */
  orientation?: Orientation
  /**
   * The direction of navigation between items.
   */
  dir?: Direction
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: boolean
}

export const RovingFocusGroupOptionsProps = {
  orientation: String as PropType<Orientation>,
  dir: String as PropType<Direction>,
  loop: Boolean,
}

export interface RovingFocusGroupImplProps
  extends
  RovingFocusGroupOptions {
  currentTabStopId?: string | null
  defaultCurrentTabStopId?: string
  onCurrentTabStopIdChange?: (tabStopId: string | null) => void
  onEntryFocus?: (event: Event) => void
}

export const IRovingFocusGroupImplProps = {
  ...RovingFocusGroupOptionsProps,
  ...ScopedProps,
  currentTabStopId: String,
  defaultCurrentTabStopId: String,
  onCurrentTabStopIdChange: Function as PropType<RovingFocusGroupImplProps['onCurrentTabStopIdChange']>,
  onEntryFocus: Function as PropType<RovingFocusGroupImplProps['onEntryFocus']>,
}

const OkuRovingFocusGroupImpl = defineComponent({
  name: 'OkuRovingFocusGroupImpl',
  inheritAttrs: false,
  props: IRovingFocusGroupImplProps,
  emits: {
    currentTabStopId: (tabStopId: string | null) => true,
    entryFocus: (event: Event) => true,
  },
  setup(props, { attrs, slots, emit }) {
    const _attrs = attrs as Omit<_RovingFocusGroupImplEl, 'dir'>
    const {
      orientation,
      loop,
      dir,
      currentTabStopId: currentTabStopIdProp,
      defaultCurrentTabStopId,
      onCurrentTabStopIdChange,
      onEntryFocus,
    } = toRefs(props)

    const buttonRef = ref<ComponentPublicInstanceRef<HTMLButtonElement> | null>(null)
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
    const handleEntryFocus = useCallbackRef(onEntryFocus.value)
    const getItems = useCollection(props.scopeRovingFocusGroup)
    const isClickFocusRef = ref(false)
    const focusableItemsCount = ref(0)

    watchEffect(() => {
      // TODO: handleEntryFocus watch ?
      const node = buttonRef.value?.$el
      if (node) {
        node.addEventListener(ENTRY_FOCUS, handleEntryFocus)
        return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus)
      }
    })

    RovingFocusProvider({
      scope: props.scopeRovingFocusGroup,
      orientation: orientation.value,
      dir: dir.value,
      loop: loop.value ?? false,
      currentTabStopId: currentTabStopId.value ?? null,
      onItemFocus: (tabStopId) => {
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

    return () => h(Primitive.div, {
      'tabIndex': isTabbingBackOut.value || focusableItemsCount.value === 0 ? -1 : 0,
      'data-orientation': orientation.value,
      'ref': composedRefs,
      'style': {
        outline: 'none',
        ..._attrs.style,
      },
      'onMouseDown': () => {
        useComposeEventHandlers(_attrs.onmousedown, () => {
          isClickFocusRef.value = true
        })
      },
      'onFocus': () => {
        useComposeEventHandlers(_attrs.onfocus, (event) => {
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
              const candidateNodes = candidateItems.map(item => item.ref.value!)
              focusFirst(candidateNodes)
            }
          }

          isClickFocusRef.value = false
        })
      },

    })
  },
})

export {
  OkuRovingFocusGroupImpl,
}
