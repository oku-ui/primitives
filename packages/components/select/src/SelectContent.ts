import { Teleport, defineComponent, h, mergeProps, onMounted, ref } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import {
  CONTENT_NAME,
  CollectionSlot,
  SelectContentProvider,
  scopeSelectProps,
  selectContentProps,
  useSelectInject,
} from './props'
import { OkuSelectContentImpl } from './SelectContentImpl'
import type { SelectContentNativeElement } from './props'

const SelectContent = defineComponent({
  name: CONTENT_NAME,
  inheritAttrs: false,
  props: {
    ...selectContentProps.props,
    ...scopeSelectProps,
  },
  setup(props, { slots, attrs }) {
    const selectInject = useSelectInject(CONTENT_NAME, props.scopeOkuSelect)

    const fragment = ref<DocumentFragment>()

    const forwardedRef = useForwardRef()

    // setting the fragment in `onMounted` as `DocumentFragment` doesn't exist on the server
    onMounted(() => {
      fragment.value = new DocumentFragment()
    })

    return () => {
      if (!selectInject.open.value) {
        const frag = fragment.value as Element | undefined

        return frag
          ? h(
            Teleport,
            { to: fragment.value },
            h(
              SelectContentProvider,
              { scope: props.scopeOkuSelect },
              {
                default: () =>
                  h(
                    CollectionSlot,
                    { scope: props.scopeOkuSelect },
                    { default: () => h(Primitive.div, {}, slots) },
                  ),
              },
            ),
          )
          : null
      }

      return h(
        OkuSelectContentImpl,
        {
          ...mergeProps(attrs, props),
          ref: forwardedRef,
        },
        slots,
      )
    }
  },
})

export const OkuSelectContent = SelectContent as typeof SelectContent &
(new () => {
  $props: SelectContentNativeElement
})
