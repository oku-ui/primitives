import type { PropType } from 'vue'
import { defineComponent, h, toRefs, watchEffect } from 'vue'
import { useComposeEventHandlers, useForwardRef, useId } from '@oku-ui/use-composable'

import { Primitive, PrimitiveProps } from '@oku-ui/primitive'
import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'

import type { ItemData, ScopedPropsInterface } from './RovingFocusGroup'
import { CollectionItemSlot, ScopedProps, useCollection, useRovingFocusInject } from './RovingFocusGroup'
import { focusFirst, getFocusIntent, wrapArray } from './utils'

export type RovingFocusGroupItemElement = ElementType<'span'>
export type _RovingFocusGroupItemEl = HTMLSpanElement

interface IRovingFocusItemProps extends IPrimitiveProps {
  tabStopId?: string
  focusable?: boolean
  active?: boolean
  onFocus?: (event: FocusEvent) => void
  onKeydown?: (event: KeyboardEvent) => void
  onMousedown?: (event: MouseEvent) => void

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
  onFocus: Function as PropType<(event: FocusEvent) => void>,
  onKeydown: Function as PropType<(event: KeyboardEvent) => void>,
  onMousedown: Function as PropType<(event: MouseEvent) => void>,
  ...PrimitiveProps,
}

// Define Component Props Type
export interface RovingFocusItemPropsType extends ScopedPropsInterface<IRovingFocusItemProps> {
}

export const RovingFocusGroupImplElementProps = {
  ...RovingFocusItemProps,
}

export const IRovingFocusGroupImplProps = {
  ...RovingFocusItemProps,
  ...ScopedProps,
}

const ITEM_NAME = 'OkuRovingFocusGroupItem'

const RovingFocusGroupItem = defineComponent({
  name: ITEM_NAME,
  inheritAttrs: false,
  props: IRovingFocusGroupImplProps,
  setup(props, { attrs }) {
    const _attrs = attrs as any
    const {
      scopeRovingFocusGroup,
      focusable,
      active,
      tabStopId,
      ...itemProps
    } = toRefs(props)
    const attrsItems = _attrs as HTMLSpanElement

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

    const _props: ItemData = {
      id,
      focusable: focusable.value,
      active: active.value,
      scope: scopeRovingFocusGroup.value,
    }
    return () => h(CollectionItemSlot, {
      ..._props,
    }, {
      default: () =>
        h(Primitive.span, {
          'asChild': props.asChild,
          'tabindex': isCurrentTabStop ? 0 : -1,
          'data-orientation': inject.value.orientation,
          ...attrsItems as any,
          'ref': forwardedRef,
          'onMouseDown': (event: MouseEvent) => {
            useComposeEventHandlers(props.onMousedown, (event: MouseEvent) => {
              // We prevent focusing non-focusable items on `mousedown`.
              // Even though the item has tabIndex={-1}, that only means take it out of the tab order.
              if (!focusable)
                event.preventDefault()
              // Safari doesn't focus a button when clicked so we run our logic on mousedown also
              else inject.value.onItemFocus(id)
            })
          },
          'onFocus': (event: FocusEvent) => {
            useComposeEventHandlers(props.onFocus, () => {
              inject.value.onItemFocus(id)
            })
          },
          'onKeyDown': (event: KeyboardEvent) => {
            useComposeEventHandlers(props.onKeydown, (event: KeyboardEvent) => {
              if (event.key === 'Tab' && event.shiftKey) {
                inject.value.onItemShiftTab()
                return
              }

              if (event.target !== event.currentTarget)
                return

              const focusIntent = getFocusIntent(event, inject.value.orientation, inject.value.dir)

              if (focusIntent !== undefined) {
                event.preventDefault()
                const items = getItems.value.filter(item => item.focusable)
                let candidateNodes = items.map(item => item.ref.value!)

                if (focusIntent === 'last') {
                  candidateNodes.reverse()
                }
                else if (focusIntent === 'prev' || focusIntent === 'next') {
                  if (focusIntent === 'prev')
                    candidateNodes.reverse()
                  // TODO: check HTMLElement
                  const currentIndex = candidateNodes.indexOf(event.currentTarget as HTMLElement)
                  candidateNodes = inject.value.loop
                    ? wrapArray(candidateNodes, currentIndex + 1)
                    : candidateNodes.slice(currentIndex + 1)
                }

                /**
                 * Imperative focus during keydown is risky so we prevent React's batching updates
                 * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
                 */
                setTimeout(() => focusFirst(candidateNodes))
              }
            })
          },
        }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _OkuRovingFocusGroupImpl = MergeProps<RovingFocusItemPropsType, RovingFocusGroupItemElement>

export type InstanceCheckboxType = InstanceTypeRef<typeof RovingFocusGroupItem, _OkuRovingFocusGroupImpl>

const OkuRovingFocusGroupItem = RovingFocusGroupItem as typeof RovingFocusGroupItem & (new () => { $props: _OkuRovingFocusGroupImpl })

export {
  OkuRovingFocusGroupItem,
}
