import { computed, defineComponent, h, mergeProps, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useId } from '@oku-ui/use-composable'

import { Primitive } from '@oku-ui/primitive'

import { composeEventHandlers } from '@oku-ui/utils'
import type { RovingFocusGroupItemNaviteElement } from './props'
import { CollectionItemSlot, ITEM_NAME, rovingFocusItemProps, scopedProps, useCollection, useRovingFocusInject } from './props'
import { focusFirst, getFocusIntent, wrapArray } from './utils'

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
    const {
      scopeOkuRovingFocusGroup,
      focusable,
      active,
      tabStopId,
      ...itemProps
    } = toRefs(props)
    const _reactive = reactive(itemProps)
    const reactiveItemProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const autoId = useId()
    const id = computed(() => tabStopId.value || autoId)
    const inject = useRovingFocusInject(ITEM_NAME, scopeOkuRovingFocusGroup.value)
    const isCurrentTabStop = computed(() => inject.currentTabStopId.value === id.value)
    const getItems = useCollection(scopeOkuRovingFocusGroup.value)
    const forwardedRef = useForwardRef()

    onMounted(() => {
      if (props.focusable)
        inject.onFocusableItemAdd()
    })

    onBeforeUnmount(() => {
      if (props.focusable)
        inject.onFocusableItemRemove()
    })

    return () => h(CollectionItemSlot, {
      id: id.value,
      focusable: focusable.value,
      active: active.value,
      scope: scopeOkuRovingFocusGroup.value,
    }, {
      default: () => {
        return h(Primitive.span, {
          'tabindex': isCurrentTabStop.value ? 0 : -1,
          'data-orientation': inject.orientation?.value,
          ...mergeProps(attrs, reactiveItemProps),
          'ref': forwardedRef,
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
              setTimeout(() => focusFirst(candidateNodes))
            }
          }),
        }, slots.default?.())
      },
    })
  },

})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuRovingFocusGroupItem = rovingFocusGroupItem as typeof rovingFocusGroupItem &
  (new () => {
    $props: RovingFocusGroupItemNaviteElement
  })
