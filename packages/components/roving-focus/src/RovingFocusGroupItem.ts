import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, nextTick, toRefs, watchEffect } from 'vue'
import { useForwardRef, useId } from '@oku-ui/use-composable'

import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'

import { composeEventHandlers } from '@oku-ui/utils'
import type { ItemData } from './RovingFocusGroup'
import { CollectionItemSlot, useCollection, useRovingFocusInject } from './RovingFocusGroup'
import type { ScopeRovingFocus } from './utils'
import { focusFirst, getFocusIntent, wrapArray } from './utils'
import type { ScopedPropsInterface } from './types'
import { scopedProps } from './types'

export type RovingFocusGroupItemIntrinsicElement = ElementType<'span'>
export type RovingFocusGroupItemElement = HTMLSpanElement

interface IRovingFocusItemProps {
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
}

// Define Component Props Type
export interface RovingFocusItemPropsType extends ScopedPropsInterface<IRovingFocusItemProps>, PrimitiveProps {
}

export const RovingFocusGroupItemElementProps = {
  ...RovingFocusItemProps,
}

export const rovingFocusGroupItemProps = {
  ...RovingFocusItemProps,
}

const ITEM_NAME = 'OkuRovingFocusGroupItem'

const rovingFocusGroupItem = defineComponent({
  name: ITEM_NAME,
  components: {
    CollectionItemSlot,
  },
  inheritAttrs: false,
  props: {
    ...rovingFocusGroupItemProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const _attrs = attrs as any
    const {
      focusable,
      active,
      tabStopId,
      scopeOkuRovingFocusGroup,
      asChild,
      onFocus,
      onKeydown,
      onMousedown,
      ...propsData
    } = toRefs(props)
    const attrsItems = _attrs

    const autoId = useId()
    const id = computed(() => tabStopId.value || autoId)
    const inject = useRovingFocusInject(ITEM_NAME, props.scopeOkuRovingFocusGroup)
    const isCurrentTabStop = computed(() => inject.currentTabStopId.value === id.value)
    const getItems = useCollection(props.scopeOkuRovingFocusGroup)
    const forwardedRef = useForwardRef()

    watchEffect((onClean) => {
      nextTick(() => {
        if (focusable.value)
          inject.onFocusableItemAdd()
      })
      onClean(() => {
        nextTick(() => {
          inject.onFocusableItemRemove()
        })
      })
    })

    const _props: ItemData = {
      id: id.value,
      focusable: focusable.value,
      active: active.value,
      scope: props.scopeOkuRovingFocusGroup,
    }
    return () => {
      const merged = mergeProps(attrsItems, propsData, {
        tabindex: isCurrentTabStop.value ? 0 : -1,
      })
      return h(CollectionItemSlot, {
        ..._props,
      }, {
        default: () => {
          return h(Primitive.span, {
            'tabindex': isCurrentTabStop.value ? 0 : -1,
            'data-orientation': inject.orientation?.value,
            ...merged,
            'ref': forwardedRef,
            'asChild': asChild.value,
            'onMousedown':
              composeEventHandlers(onMousedown.value, (event: MouseEvent) => {
                // We prevent focusing non-focusable items on `mousedown`.
                // Even though the item has tabIndex={-1}, that only means take it out of the tab order.
                if (!focusable.value)
                  event.preventDefault()
                // Safari doesn't focus a button when clicked so we run our logic on mousedown also
                else inject.onItemFocus(id.value)
              }),
            'onFocus': composeEventHandlers(onFocus.value, () => {
              inject.onItemFocus(id.value)
            }),
            'onKeydown': composeEventHandlers(onKeydown.value, (event: KeyboardEvent) => {
              if (event.key === 'Tab' && event.shiftKey) {
                inject.onItemShiftTab()
                return
              }

              if (event.target !== event.currentTarget)
                return

              const focusIntent = getFocusIntent(event, inject.orientation?.value, inject.dir?.value)

              if (focusIntent !== undefined) {
                event.preventDefault()

                const items = getItems.value.filter(item => item.focusable)
                let candidateNodes = items.map(item => item.ref)
                if (focusIntent === 'last') {
                  candidateNodes.reverse()
                }
                else if (focusIntent === 'prev' || focusIntent === 'next') {
                  if (focusIntent === 'prev')
                    candidateNodes.reverse()
                  const currentIndex = candidateNodes.indexOf(event.currentTarget as HTMLElement)
                  candidateNodes = inject.loop?.value
                    ? wrapArray(candidateNodes, currentIndex + 1)
                    : candidateNodes.slice(currentIndex + 1)
                }

                // /**
                //  * Imperative focus during keydown is risky so we prevent React's batching updates
                //  * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
                //  */
                focusFirst(candidateNodes)
              }
            }),
          }, slots)
        },
      })
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuRovingFocusGroupItem = rovingFocusGroupItem as typeof rovingFocusGroupItem &
(new () => {
  $props: ScopeRovingFocus<Partial<RovingFocusGroupItemElement>>
})

export type {
  IRovingFocusItemProps,
}
