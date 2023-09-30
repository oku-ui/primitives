import {
  Teleport,
  computed,
  defineComponent,
  h,
  mergeProps,
  nextTick,
  onMounted,
  ref,
  toRefs,
  watchEffect,
} from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import {
  ITEM_TEXT_NAME,
  scopeSelectProps,
  selectItemTextProps,
  useSelectContentInject,
  useSelectInject,
  useSelectItemInject,
  useSelectNativeOptionsInject,
} from './props'
import type { SelectItemTextElement } from './props'

const SelectItemText = defineComponent({
  name: ITEM_TEXT_NAME,
  inheritAttrs: false,
  props: {
    ...selectItemTextProps.props,
    ...scopeSelectProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuSelect, ...itemTextProps } = toRefs(props)

    // We ignore `class` and `style` as this part shouldn't be styled.
    const { style, className, ...selectItemTextAttrs } = attrs as any

    const selectInject = useSelectInject(ITEM_TEXT_NAME, scopeOkuSelect.value)
    const contentInject = useSelectContentInject(
      ITEM_TEXT_NAME,
      scopeOkuSelect.value,
    )

    const itemInject = useSelectItemInject(
      ITEM_TEXT_NAME,
      scopeOkuSelect.value,
    )

    const nativeOptionsInject = useSelectNativeOptionsInject(
      ITEM_TEXT_NAME,
      scopeOkuSelect.value,
    )

    const itemTextNode = ref<SelectItemTextElement | null>(null)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(
      forwardedRef,
      itemTextNode.value as any,
    )

    onMounted(() => {
      nextTick(() => {
        itemInject.onItemTextChange(
          itemTextNode.value as SelectItemTextElement,
        )

        contentInject?.itemTextRefCallback?.(
          itemTextNode.value as SelectItemTextElement,
          itemInject.value.value,
          itemInject.disabled.value,
        )
      })
    })

    const textContent = computed(() => itemTextNode.value?.textContent)

    const nativeOption = computed(() => {
      return () =>
        h(
          'option',
          {
            key: itemInject.value.value,
            value: itemInject.value.value,
            disabled: itemInject.disabled.value,
          },
          { default: () => textContent.value },
        )
    })

    const { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsInject

    watchEffect((onInvalidate) => {
      onNativeOptionAdd(nativeOption.value?.())

      onInvalidate(() => onNativeOptionRemove(nativeOption.value?.()))
    })

    return () => [
      h(
        Primitive.span,
        {
          id: itemInject.textId,
          ...mergeProps(selectItemTextAttrs, itemTextProps),
          ref: composedRefs,
        },
        slots,
      ),
      /* Teleport the select item text into the trigger value node */
      itemInject.isSelected.value
      && selectInject.valueNode.value
      && !selectInject.valueNodeHasChildren.value
        ? h(
          Teleport,
          { to: selectInject.valueNode.value },
          { default: () => attrs.children },
        )
        : null,
    ]
  },
})

export const OkuSelectItemText = SelectItemText as typeof SelectItemText &
(new () => {
  $props: SelectItemTextElement
})
