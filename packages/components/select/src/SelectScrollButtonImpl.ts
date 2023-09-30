import type { CSSProperties } from 'vue'
import {
  defineComponent,
  h,
  mergeProps,
  nextTick,
  onMounted,
  ref,
  toRefs,
  watchEffect,
} from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import type { ItemData, SelectScrollButtonImplNativeElement } from './props'
import {
  SELECT_SCROLL_BUTTON,
  scopeSelectProps,
  selectScrollButtonProps,
  useCollection,
  useSelectContentInject,
} from './props'

const SelectScrollButtonImpl = defineComponent({
  name: SELECT_SCROLL_BUTTON,
  inheritAttrs: false,
  props: {
    ...selectScrollButtonProps.props,
    ...scopeSelectProps,
  },
  emits: {
    ...selectScrollButtonProps.emits,
  },
  setup(props, { emit, attrs }) {
    const { scopeOkuSelect, ...scrollIndicatorProps } = toRefs(props)

    const contentInject = useSelectContentInject(
      SELECT_SCROLL_BUTTON,
      scopeOkuSelect.value,
    )

    const forwardedRef = useForwardRef()

    const autoScrollTimerRef = ref<number | null>(0)

    const getItems = useCollection(scopeOkuSelect.value)

    const clearAutoScrollTimer = () => {
      if (autoScrollTimerRef.value !== null) {
        window.clearInterval(autoScrollTimerRef.value)
        autoScrollTimerRef.value = null
      }
    }

    watchEffect((inValidate) => {
      inValidate(() => clearAutoScrollTimer())
    })

    // When the viewport becomes scrollable on either side, the relevant scroll button will mount.
    // Because it is part of the normal flow, it will push down (top button) or shrink (bottom button)
    // the viewport, potentially causing the active item to now be partially out of view.
    // We re-run the `scrollIntoView` logic to make sure it stays within the viewport.
    onMounted(() => {
      nextTick(() => {
        const activeItem = getItems().find(
          (item: ItemData) => item === document.activeElement,
        )

        activeItem?.scrollIntoView?.({ block: 'nearest' })
      })
    })

    return () =>
      h(Primitive.div, {
        'aria-hidden': true,
        ...mergeProps(attrs, scrollIndicatorProps),
        'ref': forwardedRef,
        'style': {
          'flex-shrink': 0,
          ...(attrs.style as CSSProperties),
        },
        'onPointerDown': composeEventHandlers((event: PointerEvent) => {
          emit('pointerdown', event)

          if (autoScrollTimerRef.value === null) {
            autoScrollTimerRef.value = window.setInterval(
              () => emit('autoScroll'),
              50,
            )
          }
        }),
        'onPointerMove': composeEventHandlers((event: PointerEvent) => {
          emit('pointermove', event)

          contentInject.onItemLeave?.()

          if (autoScrollTimerRef.value === null) {
            autoScrollTimerRef.value = window.setInterval(
              () => emit('autoScroll'),
              50,
            )
          }
        }),
        'onPointerLeave': composeEventHandlers((event: PointerEvent) => {
          emit('pointerleave', event)

          clearAutoScrollTimer()
        }),
      })
  },
})

export const OkuSelectScrollButtonImpl
  = SelectScrollButtonImpl as typeof SelectScrollButtonImpl &
  (new () => {
    $props: SelectScrollButtonImplNativeElement
  })
