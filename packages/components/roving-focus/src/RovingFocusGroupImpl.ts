import type { PropType } from 'vue'
import { computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { useComposeEventHandlers, useComposedRefs, useControllable, useForwardRef } from '@oku-ui/use-composable'

import type { ComponentPublicInstanceRef, ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'

import { Primitive, PrimitiveProps } from '@oku-ui/primitive'
import { type Direction, type Orientation, focusFirst } from './utils'
import type { ScopedPropsInterface } from './RovingFocusGroup'
import { ScopedProps, useCollection, useRovingFocusProvider } from './RovingFocusGroup'

const ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus'
const EVENT_OPTIONS = { bubbles: false, cancelable: true }

export type RovingFocusGroupImplElement = ElementType<'div'>
export type _RovingFocusGroupImplEl = HTMLDivElement

export interface RovingFocusGroupOptions extends IPrimitiveProps {
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
  orientation: {
    type: String as PropType<Orientation>,
  },
  dir: {
    type: String as PropType<Direction>,
  },
  loop: {
    type: Boolean,
  },
  ...PrimitiveProps,
}

export interface RovingFocusGroupImplPropsType extends ScopedPropsInterface<RovingFocusGroupOptions> {
  currentTabStopId?: string | null
  defaultCurrentTabStopId?: string
  onCurrentTabStopIdChange?: (tabStopId: string | null) => void
  onEntryFocus?: (event: Event) => void
  onMousedown?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
}

export const RovingFocusGroupImplElementProps = {
  currentTabStopId: String,
  defaultCurrentTabStopId: String,
  // onCurrentTabStopIdChange: Function as PropType<RovingFocusGroupImplPropsType['onCurrentTabStopIdChange']>,
  // onEntryFocus: Function as PropType<RovingFocusGroupImplPropsType['onEntryFocus']>,
  onMousedown: Function as PropType<(e: MouseEvent) => void>,
  onFocus: Function as PropType<(e: FocusEvent) => void>,
}

export const IRovingFocusGroupImplProps = {
  ...RovingFocusGroupImplElementProps,
  ...RovingFocusGroupOptionsProps,
  ...ScopedProps,
}

const RovingFocusGroupImpl = defineComponent({
  name: 'OkuRovingFocusGroupImpl',
  inheritAttrs: false,
  props: IRovingFocusGroupImplProps,
  emits: {
    currentTabStopId: (tabStopId: string | null) => true,
    entryFocus: (event: Event) => true,
    currentTabStopIdChange: (tabStopId: string | null) => true,
  },
  setup(props, { attrs, slots, emit }) {
    const _attrs = attrs as Omit<_RovingFocusGroupImplEl, 'dir'>
    const {
      orientation,
      loop,
      dir,
      currentTabStopId: currentTabStopIdProp,
      defaultCurrentTabStopId,
      onEntryFocus,
    } = toRefs(props)

    const buttonRef = ref<ComponentPublicInstanceRef<HTMLDivElement> | null>(null)
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
    // const handleEntryFocus = useCallbackRef(onEntryFocus.value)
    const getItems = useCollection(props.scopeRovingFocusGroup)
    const isClickFocusRef = ref(false)
    const focusableItemsCount = ref(0)

    watchEffect(() => {
      // TODO: handleEntryFocus watch ?
      const node = buttonRef.value?.$el
      // if (node) {
      //   node.addEventListener(ENTRY_FOCUS, handleEntryFocus)
      //   return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus)
      // }
    })

    useRovingFocusProvider({
      scope: props.scopeRovingFocusGroup,
      orientation: orientation.value,
      dir: dir.value,
      loop: loop.value ?? false,
      currentTabStopId: currentTabStopId.value ?? null,
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

    return () => h(Primitive.div, {
      'tabIndex': isTabbingBackOut.value || focusableItemsCount.value === 0 ? -1 : 0,
      'data-orientation': orientation.value,
      'ref': composedRefs,
      'style': {
        outline: 'none',
        ..._attrs.style as any,
      },
      'asChild': props.asChild,
      'onMouseDown': () => {
        useComposeEventHandlers(props.onMousedown, () => {
          isClickFocusRef.value = true
        })
      },
      'onFocus': () => {
        useComposeEventHandlers(props.onFocus, (event: FocusEvent) => {
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

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _OkuRovingFocusGroupImpl = MergeProps<RovingFocusGroupImplPropsType, RovingFocusGroupImplElement>

export type InstanceCheckboxType = InstanceTypeRef<typeof RovingFocusGroupImpl, _OkuRovingFocusGroupImpl>

const OkuRovingFocusGroupImpl = RovingFocusGroupImpl as typeof RovingFocusGroupImpl & (new () => { $props: RovingFocusGroupImplPropsType })

export {
  OkuRovingFocusGroupImpl,
}
