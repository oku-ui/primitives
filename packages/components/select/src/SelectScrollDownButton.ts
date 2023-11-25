import {
  defineComponent,
  h,
  mergeProps,
  onMounted,
  reactive,
  ref,
  toRefs,
  watchEffect,
} from 'vue'
import {
  reactiveOmit,
  useComposedRefs,
  useForwardRef,
} from '@oku-ui/use-composable'
import type { SelectScrollDownButtonElement } from './props'
import {
  SCROLL_DOWN_BUTTON_NAME,
  scopeSelectProps,
  selectScrollDownButtonProps,
  useSelectContentInject,
  useSelectViewportInject,
} from './props'
import { OkuSelectScrollButtonImpl } from './SelectScrollButtonImpl'

const SelectScrollDownButton = defineComponent({
  name: SCROLL_DOWN_BUTTON_NAME,
  inheritAttrs: false,
  props: {
    ...selectScrollDownButtonProps.props,
    ...scopeSelectProps,
  },
  emits: selectScrollDownButtonProps.emits,
  setup(props, { slots, attrs }) {
    const { scopeOkuSelect, ...propsRefs } = toRefs(props)

    const _reactive = reactive(propsRefs)

    const reactivePropsRefs = reactiveOmit(
      _reactive,
      (key, _value) => key === undefined,
    )

    const contentInject = useSelectContentInject(
      SCROLL_DOWN_BUTTON_NAME,
      scopeOkuSelect.value,
    )

    const viewportInject = useSelectViewportInject(
      SCROLL_DOWN_BUTTON_NAME,
      scopeOkuSelect.value,
    )

    const canScrollDownRef = ref<boolean>(false)
    const scrollDownButtonRef = ref<HTMLDivElement | null>(null)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, scrollDownButtonRef)

    onMounted(() => {
      viewportInject.onScrollButtonChange?.(scrollDownButtonRef.value)
    })

    watchEffect((onInvalidate) => {
      if (contentInject.viewport?.value && contentInject.isPositioned?.value) {
        const viewport = contentInject.viewport.value

        function handleScroll() {
          const maxScroll = viewport.scrollHeight - viewport.clientHeight
          // we use Math.ceil here because if the UI is zoomed-in
          // `scrollTop` is not always reported as an integer
          const canScrollDown = Math.ceil(viewport.scrollTop) < maxScroll
          canScrollDownRef.value = canScrollDown
        }

        handleScroll()
        viewport.addEventListener('scroll', handleScroll)

        onInvalidate(() =>
          viewport.removeEventListener('scroll', handleScroll),
        )
      }
    })

    return () =>
      canScrollDownRef.value
        ? h(
          OkuSelectScrollButtonImpl,
          {
            ...mergeProps(attrs, reactivePropsRefs),
            ref: composedRefs,
            onAutoScroll: () => {
              const { viewport, selectedItem } = contentInject
              if (viewport?.value && selectedItem?.value) {
                viewport.value.scrollTop
                    = viewport.value.scrollTop + selectedItem.value.offsetHeight
              }
            },
          },
          slots,
        )
        : null
  },
})

export const OkuSelectScrollDownButton
  = SelectScrollDownButton as typeof SelectScrollDownButton &
  (new () => {
    $props: SelectScrollDownButtonElement
  })
