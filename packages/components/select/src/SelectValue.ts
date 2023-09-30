import type { CSSProperties } from 'vue'
import {
  computed,
  defineComponent,
  h,
  mergeProps,
  onMounted,
  ref,
  toRefs,
  watchEffect,
} from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import {
  VALUE_NAME,
  scopeSelectProps,
  selectValueProps,
  useSelectInject,
} from './props'
import { shouldShowPlaceholder } from './utils'
import type { SelectValueElement } from './types'

const SelectValue = defineComponent({
  name: VALUE_NAME,
  inheritAttrs: false,
  props: {
    ...selectValueProps.props,
    ...scopeSelectProps,
  },
  setup(props, { slots, attrs }) {
    const { scopeOkuSelect, placeholder, ...valueProps } = toRefs(props)

    const selectValueRef = ref<HTMLSpanElement | null>(null)

    const forwardedRef = useForwardRef()

    const composedRefs = useComposedRefs(forwardedRef, selectValueRef)

    const {
      onValueNodeHasChildrenChange,
      value: contextValue,
      onValueNodeChange,
    } = useSelectInject(VALUE_NAME, scopeOkuSelect.value)

    const hasChildren = computed(() => slots.default !== undefined)

    watchEffect(() => {
      onValueNodeHasChildrenChange(hasChildren.value)
    })

    onMounted(() => {
      onValueNodeChange(selectValueRef.value as unknown as SelectValueElement)
    })

    return () =>
      h(
        Primitive.span,
        {
          ...mergeProps(attrs, valueProps),
          ref: composedRefs,
          style: {
            ...(attrs.style as CSSProperties),
            pointerEvents: 'none',
          },
        },
        {
          default: () =>
            shouldShowPlaceholder(contextValue?.value)
              ? h(Primitive.div, { default: () => placeholder.value })
              : slots.default?.(),
        },
      )
  },
})

export const OkuSelectValue = SelectValue as typeof SelectValue &
(new () => {
  $props: SelectValueElement
})
