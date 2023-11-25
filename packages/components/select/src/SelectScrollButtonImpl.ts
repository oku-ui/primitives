import type { CSSProperties } from 'vue'
import {
  defineComponent,
  h,
  mergeProps,
  reactive,
  ref,
  toRefs,
  watchEffect,
} from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import type { SelectScrollButtonImplEmits, SelectScrollButtonImplNativeElement } from './props'
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
  emits: selectScrollButtonProps.emits,
  setup(props, { emit, attrs }) {
    const { scopeOkuSelect, ...propsRefs } = toRefs(props)

    const _reactive = reactive(propsRefs)
    const reactivePropsRefs = reactiveOmit(_reactive, (key, _value) => key === undefined)

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
    watchEffect(() => {
      const activeItem = getItems().find(
        item => item.ref.value === document.activeElement,
      )

      activeItem?.ref.value?.scrollIntoView?.({ block: 'nearest' })
    })

    return () =>
      h(Primitive.div, {
        'aria-hidden': true,
        ...mergeProps(attrs, reactivePropsRefs),
        'ref': forwardedRef,
        'style': {
          'flex-shrink': 0,
          ...(attrs.style as CSSProperties),
        },
        'onPointerdown': composeEventHandlers(
          (event: SelectScrollButtonImplEmits['pointerdown'][0]) => emit('pointerdown', event),
          () => {
            if (autoScrollTimerRef.value === null) {
              autoScrollTimerRef.value = window.setInterval(
                () => emit('autoScroll'),
                50,
              )
            }
          }),
        'onPointermove': composeEventHandlers(
          (event: SelectScrollButtonImplEmits['pointermove'][0]) => emit('pointermove', event),
          () => {
            contentInject.onItemLeave?.()

            if (autoScrollTimerRef.value === null) {
              autoScrollTimerRef.value = window.setInterval(
                () => emit('autoScroll'),
                50,
              )
            }
          }),
        'onPointerleave': composeEventHandlers(
          (event: SelectScrollButtonImplEmits['pointerleave'][0]) => emit('pointerleave', event),
          () => {
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
