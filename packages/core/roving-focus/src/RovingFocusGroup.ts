import { defineComponent, h, mergeProps } from 'vue'
import { useForwardRef, useListeners } from '@oku-ui/use-composable'
import { primitiveProps } from '@oku-ui/primitive'
import { OkuRovingFocusGroupImpl } from './RovingFocusGroupImpl'
import type { RovingFocusGroupNaviteElement } from './props'
import { CollectionItemSlot, CollectionProvider, CollectionSlot, GROUP_NAME, rovingFocusGroupProps, scopedProps } from './props'

const rovingFocusGroup = defineComponent({
  name: GROUP_NAME,
  components: {
    OkuRovingFocusGroupImpl,
    CollectionProvider,
    CollectionSlot,
    CollectionItemSlot,
  },
  inheritAttrs: false,
  props: {
    ...rovingFocusGroupProps.props,
    ...scopedProps,
    ...primitiveProps,
  },
  emits: rovingFocusGroupProps.emits,
  setup(props, { slots, attrs }) {
    const forwardedRef = useForwardRef()

    const emits = useListeners()
    return () => {
      return h(CollectionProvider, {
        scope: props.scopeOkuRovingFocusGroup,
      }, {
        default: () => h(CollectionSlot, {
          scope: props.scopeOkuRovingFocusGroup,
        }, {
          default: () => h(OkuRovingFocusGroupImpl, {
            ...mergeProps(attrs, props, emits),
            ref: forwardedRef,
          }, slots.default?.()),
        }),
      })
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuRovingFocusGroup = rovingFocusGroup as typeof rovingFocusGroup &
  (new () => {
    $props: RovingFocusGroupNaviteElement
  })
