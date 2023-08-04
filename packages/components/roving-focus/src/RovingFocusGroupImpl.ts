import type { PropType } from 'vue'
import { computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { useCallbackRef, useComposedRefs, useControllable, useForwardRef } from '@oku-ui/use-composable'

import type { ComponentPublicInstanceRef, ElementType } from '@oku-ui/primitive'

import { Primitive } from '@oku-ui/primitive'
import type { Direction, Orientation } from './utils'
import { RovingFocusProvider, ScopedProps, useCollection } from './RovingFocusGroup'

const ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus'

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
    const _attrs = attrs as Omit<RovingFocusGroupImplElement, 'dir'>
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

    const { state, updateValue: updateCurrentTabStopId } = useControllable({
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
      currentTabStopId: state.value ?? null,
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
    })
  },
})

export {
  OkuRovingFocusGroupImpl,
}
