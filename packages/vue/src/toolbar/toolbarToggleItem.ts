import type { OkuElement } from '@oku-ui/primitive'
import type { ToggleGroupItemProps } from '@oku-ui/toggle-group'
import { primitiveProps } from '@oku-ui/primitive'
import { OkuToggleGroupItem, toggleGroupItemProps } from '@oku-ui/toggle-group'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { useToggleGroupScope } from './toolbar'
import { OkuToolbarButton } from './toolbarButton'
import { scopeToolbarProps } from './utils'

const TOGGLE_ITEM_NAME = 'OkuToolbarToggleItem'

export type ToolbarToggleItemNaviteElement = OkuElement<'div'>
export type ToggleItemElement = HTMLDivElement
export interface ToolbarToggleItemProps extends ToggleGroupItemProps {}

export const toolbarToggleItemProps = {
  props: {
    ...primitiveProps,
    ...toggleGroupItemProps.props,
  },
  emits: {
    ...toggleGroupItemProps.emits,
  },
}

const toolbarToggleItem = defineComponent({
  name: TOGGLE_ITEM_NAME,
  inheritAttrs: false,
  props: {
    ...toolbarToggleItemProps.props,
    ...scopeToolbarProps, // TODO: import edilecek
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuToolbar, ...toggleItemProps } = toRefs(props)

    const _reactive = reactive(toggleItemProps)
    const reactiveItemProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const toggleGroupScope = useToggleGroupScope(scopeOkuToolbar.value)

    const forwardedRef = useForwardRef()

    return () => h(OkuToolbarButton, {
      asChild: true,
      scopeOkuToolbar: scopeOkuToolbar.value,
    }, {
      default: () => h(OkuToggleGroupItem, {
        ...toggleGroupScope,
        ...mergeProps(attrs, reactiveItemProps),
        ref: forwardedRef,
      }, {
        default: () => slots.default?.(),
      }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuToolbarToggleItem = toolbarToggleItem as typeof toolbarToggleItem &
  (new () => {
    $props: ToolbarToggleItemNaviteElement
  })
