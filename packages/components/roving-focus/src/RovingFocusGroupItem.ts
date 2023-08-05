import { defineComponent, h, toRefs, watchEffect } from 'vue'
import { useForwardRef, useId } from '@oku-ui/use-composable'

import type { ElementType } from '@oku-ui/primitive'

import { CollectionItemSlot, ScopedProps, useCollection, useRovingFocusInject } from './RovingFocusGroup'

const ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus'
const EVENT_OPTIONS = { bubbles: false, cancelable: true }

export type RovingFocusGroupItemElement = ElementType<'span'>
export type _RovingFocusGroupItemEl = HTMLSpanElement

interface IRovingFocusItemProps {
  tabStopId?: string
  focusable?: boolean
  active?: boolean
}

export const RovingFocusItemProps = {
  tabStopId: {
    type: String,
  },
  focusable: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
}

// Define Component Props Type
export interface RovingFocusItemPropsType extends IRovingFocusItemProps {
}

export const RovingFocusGroupImplElementProps = {
  ...RovingFocusItemProps,
}

export const IRovingFocusGroupImplProps = {
  ...RovingFocusItemProps,
  ...ScopedProps,
}

const ITEM_NAME = 'OkuRovingFocusGroupItem'

const OkuRovingFocusGroupItem = defineComponent({
  name: ITEM_NAME,
  inheritAttrs: false,
  props: IRovingFocusGroupImplProps,
  setup(props, { attrs, slots, emit }) {
    const _attrs = attrs as _RovingFocusGroupItemEl
    const {
      scopeRovingFocusGroup,
      focusable,
      active,
      tabStopId,
      ...itemProps
    } = toRefs(props)

    const autoId = useId()
    const id = tabStopId.value || autoId
    const inject = useRovingFocusInject(ITEM_NAME, scopeRovingFocusGroup.value)
    const isCurrentTabStop = inject.value.currentTabStopId === id
    const getItems = useCollection(scopeRovingFocusGroup.value)

    const { onFocusableItemAdd, onFocusableItemRemove } = inject.value

    const forwardedRef = useForwardRef()

    watchEffect((onClean) => {
      if (focusable.value)
        onFocusableItemAdd()

      onClean(() => onFocusableItemRemove())
    })

    return () => h(CollectionItemSlot, {

    })
  },
})

export {
  OkuRovingFocusGroupItem,
}
