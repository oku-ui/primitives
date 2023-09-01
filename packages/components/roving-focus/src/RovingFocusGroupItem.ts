import { computed, defineComponent, h, nextTick, toRefs, watchEffect } from 'vue'
import { useForwardRef, useId } from '@oku-ui/use-composable'

import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'

import { composeEventHandlers } from '@oku-ui/utils'
import { CollectionItemSlot, useCollection, useRovingFocusInject } from './RovingFocusGroup'
import type { ScopeRovingFocus } from './utils'
import { focusFirst, getFocusIntent, wrapArray } from './utils'
import { scopedProps } from './types'

export type RovingFocusGroupItemIntrinsicElement = ElementType<'span'>
export type RovingFocusGroupItemElement = HTMLSpanElement

export interface RovingFocusItemProps extends PrimitiveProps {
  tabStopId?: string
  focusable?: boolean
  active?: boolean
}

export type RovingFocusGroupItemEmits = {
  focus: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  mousedown: [event: MouseEvent]
}

export const rovingFocusItemProps = {
  props: {
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
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    focus: (event: FocusEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (event: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    mousedown: (event: MouseEvent) => true,
  },
}

const ITEM_NAME = 'OkuRovingFocusGroupItem'

const rovingFocusGroupItem = defineComponent({
  name: ITEM_NAME,
  components: {
    CollectionItemSlot,
  },
  inheritAttrs: false,
  props: {
    ...rovingFocusItemProps.props,
    ...scopedProps,
  },
  emits: rovingFocusItemProps.emits,
  setup(props, { attrs, slots, emit }) {
    const _attrs = attrs as any
    const {
      focusable,
      active,
      tabStopId,
      scopeOkuRovingFocusGroup,
      asChild,
    } = toRefs(props)
    const attrsItems = _attrs

    const autoId = useId()
    const id = computed(() => tabStopId.value || autoId)
    const inject = useRovingFocusInject(ITEM_NAME, scopeOkuRovingFocusGroup.value)
    const isCurrentTabStop = computed(() => inject.currentTabStopId.value === id.value)
    const getItems = useCollection(scopeOkuRovingFocusGroup.value)
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

    return () => {
      return h(CollectionItemSlot, {
        id: id.value,
        focusable: focusable.value,
        active: active.value,
        scope: scopeOkuRovingFocusGroup.value,
      }, {
        default: () => {
          return h(Primitive.span, {
            'tabindex': isCurrentTabStop.value ? 0 : -1,
            ...attrsItems,
            'data-orientation': inject.orientation?.value,
            'ref': forwardedRef,
            'asChild': asChild.value,
            'onMousedown':
              composeEventHandlers<MouseEvent>((e) => {
                emit('mousedown', e)
              }, (event) => {
                // We prevent focusing non-focusable items on `mousedown`.
                // Even though the item has tabIndex={-1}, that only means take it out of the tab order.
                if (!focusable.value)
                  event.preventDefault()
                // Safari doesn't focus a button when clicked so we run our logic on mousedown also
                else inject.onItemFocus(id.value)
              }),
            'onFocus': composeEventHandlers<FocusEvent>((e) => {
              emit('focus', e)
            }, () => {
              inject.onItemFocus(id.value)
            }),
            'onKeydown': composeEventHandlers<KeyboardEvent>((e) => {
              emit('keydown', e)
            }, (event) => {
              if (event.key === 'Tab' && event.shiftKey) {
                inject.onItemShiftTab()
                return
              }

              if (event.target !== event.currentTarget)
                return

              const focusIntent = getFocusIntent(event, inject.orientation?.value, inject.dir?.value)

              if (focusIntent !== undefined) {
                event.preventDefault()

                const items = getItems().filter(item => item.focusable)
                let candidateNodes = items.map(item => item.ref.value)
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
