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
import {
  SCROLL_UP_BUTTON_NAME,
  scopeSelectProps,
  selectScrollUpButtonProps,
  useSelectContentInject,
  useSelectViewportInject,
} from './props'
import { OkuSelectScrollButtonImpl } from './SelectScrollButtonImpl'

const SelectScrollUpButton = defineComponent({
  name: SCROLL_UP_BUTTON_NAME,
  inheritAttrs: false,
  props: {
    ...selectScrollUpButtonProps.props,
    ...scopeSelectProps,
  },
  emits: selectScrollUpButtonProps.emits,
  setup(props, { emit, slots, attrs }) {
    const { scopeOkuSelect, ...propsRefs } = toRefs(props)

    const _reactive = reactive(propsRefs)

    const reactivePropsRefs = reactiveOmit(
      _reactive,
      (key, _value) => key === undefined,
    )

    const contentInject = useSelectContentInject(
      SCROLL_UP_BUTTON_NAME,
      scopeOkuSelect.value,
    )

    const viewportInject = useSelectViewportInject(
      SCROLL_UP_BUTTON_NAME,
      scopeOkuSelect.value,
    )

    const canScrollUpRef = ref<boolean>(false)
    const scrollUpButtonRef = ref<HTMLDivElement | null>(null)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, scrollUpButtonRef)

    onMounted(() => {
      viewportInject.onScrollButtonChange?.(scrollUpButtonRef.value)
    })

    watchEffect((onInvalidate) => {
      if (contentInject.viewport?.value && contentInject.isPositioned?.value) {
        const viewport = contentInject.viewport.value

        function handleScroll() {
          const canScrollUp = viewport.scrollTop > 0
          canScrollUpRef.value = canScrollUp
        }

        handleScroll()
        viewport.addEventListener('scroll', handleScroll)

        onInvalidate(() =>
          viewport.removeEventListener('scroll', handleScroll),
        )
      }
    })

    return () =>
      canScrollUpRef.value
        ? h(OkuSelectScrollButtonImpl, {
          ...mergeProps(attrs, reactivePropsRefs),
          ref: composedRefs,
          onAutoScroll: () => {
            const { viewport, selectedItem } = contentInject
            if (viewport?.value && selectedItem?.value) {
              viewport.value.scrollTop
                  = viewport.value.scrollTop - selectedItem.value.offsetHeight
            }
          },
        })
        : null
  },
})
