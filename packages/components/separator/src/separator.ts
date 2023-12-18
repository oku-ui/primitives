import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { isValidOrientation } from './utils'
import { DEFAULT_ORIENTATION, SEPARATOR_NAME, separatorProps } from './props'
import type { SeparatorNativeElement } from './props'

const separator = defineComponent({
  name: SEPARATOR_NAME,
  inheritAttrs: false,
  props: {
    ...separatorProps.props,
  },
  emits: separatorProps.emits,
  setup(props, { attrs }) {
    const {
      decorative,
      orientation: orientationProp,
      ...domProps
    } = toRefs(props)

    const _reactive = reactive(domProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const orientation = computed(() => isValidOrientation(orientationProp.value) ? orientationProp.value : DEFAULT_ORIENTATION)
    // `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
    const ariaOrientation = computed(() => orientation.value === 'vertical' ? orientation.value : undefined)
    const semanticProps = computed(() => decorative.value
      ? { role: 'none' }
      : { 'aria-orientation': ariaOrientation.value, 'role': 'separator' })

    return () => h(Primitive.div, {
      'data-orientation': orientation.value,
      ...semanticProps.value,
      ...mergeProps(attrs, otherProps, emits),
      'ref': forwardedRef,
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuSeparator = separator as typeof separator & (new () => { $props: SeparatorNativeElement })
