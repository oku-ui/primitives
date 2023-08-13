import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, nextTick, toRefs, watchEffect } from 'vue'
import { useForwardRef, useId } from '@oku-ui/use-composable'

import { Primitive, PrimitiveProps } from '@oku-ui/primitive'
import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'

import { composeEventHandlers } from '@oku-ui/utils'
import type { ItemData } from './RovingFocusGroup'
import { CollectionItemSlot, useCollection, useRovingFocusInject } from './RovingFocusGroup'
import { focusFirst, getFocusIntent, wrapArray } from './utils'
import type { ScopedPropsInterface } from './types'
import { scopedProps } from './types'

export type RovingFocusGroupItemElement = ElementType<'span'>
export type _RovingFocusGroupItemEl = HTMLSpanElement

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
export interface RovingFocusItemPropsType extends ScopedPropsInterface<IRovingFocusItemProps>, IPrimitiveProps {
}

export const RovingFocusGroupItemElementProps = {
  ...RovingFocusItemProps,
}

export const rovingFocusGroupItemProps = {
  ...RovingFocusItemProps,
  ...scopedProps,
  ...PrimitiveProps,
}

const ITEM_NAME = 'OkuRovingFocusGroupItem'

const RovingFocusGroupItem = defineComponent({
  name: ITEM_NAME,
  components: {
    CollectionItemSlot,
  },
  inheritAttrs: false,
  props: rovingFocusGroupItemProps,
  setup(props, { attrs, slots }) {
    const _attrs = attrs as any
    const {
      focusable,
      active,
      tabStopId,
      scopeRovingFocusGroup,
      asChild,
      onFocus,
      onKeydown,
      onMousedown,
      ...propsData
    } = toRefs(props)
    const attrsItems = _attrs

    const autoId = useId()
    const id = computed(() => tabStopId.value ?? autoId)
    const inject = useRovingFocusInject(ITEM_NAME, props.scopeRovingFocusGroup)
    const isCurrentTabStop = computed(() => inject.currentTabStopId.value === id.value)
    const getItems = useCollection(scopeRovingFocusGroup.value)
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
      scope: props.scopeRovingFocusGroup,
    }
    return () => {
      console.log('inject', inject)
      const merged = mergeProps(attrsItems, propsData, {
        tabIndex: isCurrentTabStop.value ? 0 : -1,
      })
      return h(CollectionItemSlot, {
        ..._props,
      }, {
        default: () => {
          return h(Primitive.span, {
            'tabindex': isCurrentTabStop.value ? 0 : -1,
            'data-orientation': inject.orientation,
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

              const focusIntent = getFocusIntent(event, inject.orientation, inject.dir)

              if (focusIntent !== undefined) {
                event.preventDefault()

                const items = getItems.value.filter(item => item.focusable)
                let candidateNodes = items.map(item => item.ref.$el!)

                if (focusIntent === 'last') {
                  candidateNodes.reverse()
                }
                else if (focusIntent === 'prev' || focusIntent === 'next') {
                  if (focusIntent === 'prev')
                    candidateNodes.reverse()
                  const currentIndex = candidateNodes.indexOf(event.currentTarget as HTMLElement)
                  candidateNodes = inject.loop
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
type _OkuRovingFocusGroupItem = MergeProps<RovingFocusItemPropsType, RovingFocusGroupItemElement>

export type InstanceCheckboxType = InstanceTypeRef<typeof RovingFocusGroupItem, _OkuRovingFocusGroupItem>

const OkuRovingFocusGroupItem = RovingFocusGroupItem as typeof RovingFocusGroupItem & (new () => { $props: _OkuRovingFocusGroupItem })

export {
  OkuRovingFocusGroupItem,
}
