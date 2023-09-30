import {
  Teleport,
  defineComponent,
  h,
  mergeProps,
  nextTick,
  onMounted,
  ref,
} from 'vue'
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
import type { SelectContentElement } from './types'

const SelectContent = defineComponent({
  name: CONTENT_NAME,
  inheritAttrs: false,
  props: {
    ...selectContentProps.props,
    ...scopeSelectProps,
  },
  emits: {
    ...selectContentProps.emits,
  },
  setup(props, { slots, attrs }) {
    const selectInject = useSelectInject(CONTENT_NAME, props.scopeOkuSelect)

    const fragment = ref<DocumentFragment>()

    const forwardedRef = useForwardRef()

    // setting the fragment in `onMounted` as `DocumentFragment` doesn't exist on the server
    onMounted(() => {
      nextTick(() => {
        const frag = document.createDocumentFragment()
        frag.appendChild(document.createElement('div'))

        fragment.value = frag
      })
    })

    return () =>
      !selectInject.open.value
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
        : h(
          OkuSelectContentImpl,
          {
            ...mergeProps(attrs, props),
            ref: forwardedRef,
            ...selectContentProps.emits,
          },
          slots,
        )
  },
})

export const OkuSelectContent = SelectContent as typeof SelectContent &
(new () => {
  $props: SelectContentElement
})
