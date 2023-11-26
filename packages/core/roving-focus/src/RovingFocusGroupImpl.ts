import { computed, defineComponent, h, mergeProps, onBeforeUnmount, onMounted, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useComposedRefs, useControllable, useForwardRef } from '@oku-ui/use-composable'

import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { focusFirst } from './utils'
import type { RovingFocusGroupImplNaviteElement } from './props'
import { ENTRY_FOCUS, EVENT_OPTIONS, rovingFocusGroupImplProps, rovingFocusProvider, scopedProps, useCollection } from './props'

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
    const {
      scopeOkuRovingFocusGroup,
      orientation,
      loop,
      dir,
      currentTabStopId: currentTabStopIdProp,
      defaultCurrentTabStopId,
      ...groupProps
    } = toRefs(props)
    const _reactive = reactive(groupProps)
    const reactiveProupProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

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
    const getItems = useCollection(scopeOkuRovingFocusGroup.value)
    const isClickFocusRef = ref(false)
    const focusableItemsCount = ref(0)

    onMounted(() => {
      const node = buttonRef.value
      if (node) {
        node.addEventListener(ENTRY_FOCUS, (event) => {
          emit('entryFocus', event)
        })
      }
    })

    onBeforeUnmount(() => {
      const node = buttonRef.value
      if (node) {
        node.removeEventListener(ENTRY_FOCUS, (event) => {
          emit('entryFocus', event)
        })
      }
    })

    rovingFocusProvider({
      scope: scopeOkuRovingFocusGroup.value,
      orientation,
      dir,
      loop,
      currentTabStopId: computed(() => currentTabStopId.value || null),
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
      'tabindex': isTabbingBackOut.value || focusableItemsCount.value === 0 ? -1 : 0,
      'data-orientation': orientation?.value,
      ...mergeProps(attrs, reactiveProupProps),
      'ref': composedRefs,
      'style': {
        outline: 'none',
        ...attrs.style as any,
      },
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
    }, slots.default?.())
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuRovingFocusGroupImpl = RovingFocusGroupImpl as typeof RovingFocusGroupImpl &
(new () => {
  $props: RovingFocusGroupImplNaviteElement
})
