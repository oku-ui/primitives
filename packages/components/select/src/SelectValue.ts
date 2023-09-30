import {
  Fragment,
  computed,
  defineComponent,
  h,
  mergeProps,
  reactive,
  ref,
  toRefs,
  watchEffect,
} from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import {
  VALUE_NAME,
  scopeSelectProps,
  selectValueProps,
  useSelectInject,
} from './props'
import { shouldShowPlaceholder } from './utils'
import type { SelectValueNativeElement } from './props'

const SelectValue = defineComponent({
  name: VALUE_NAME,
  inheritAttrs: false,
  props: {
    ...selectValueProps.props,
    ...scopeSelectProps,
  },
  setup(props, { slots, attrs }) {
    const { scopeOkuSelect, placeholder, ...valueProps } = toRefs(props)

    const _reactive = reactive(valueProps)
    const _valueProps = reactiveOmit(
      _reactive,
      (key, _value) => key === undefined,
    )

    const selectValueRef = ref<HTMLSpanElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, selectValueRef)

    const inject = useSelectInject(VALUE_NAME, scopeOkuSelect.value)

    const hasChildren = computed(() => slots.default !== undefined)

    watchEffect(() => {
      inject.onValueNodeHasChildrenChange(hasChildren.value)
    })

    return () =>
      h(
        Primitive.span,
        {
          ...mergeProps(attrs, _valueProps),
          ref: composedRefs,
          style: {
            // we don't want events from the portalled `SelectValue` children to bubble
            // through the item they came from
            pointerEvents: 'none',
          },
        },
        {
          default: () =>
            shouldShowPlaceholder(inject.value?.value)
              ? h(Fragment, [placeholder.value])
              : slots.default?.(),
        },
      )
  },
})

export const OkuSelectValue = SelectValue as typeof SelectValue &
(new () => {
  $props: SelectValueNativeElement
})
