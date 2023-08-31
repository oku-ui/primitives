import { defineComponent, h } from 'vue'
import type { ElementType } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { ToggleGroupItemProps } from '@oku-ui/toggle-group'
import { OkuToggleGroupItem, toggleGroupItemProps } from '@oku-ui/toggle-group'
import type { ScopeToolbar } from './utils'
import { scopeToolbarProps } from './utils'
import { useToggleGroupScope } from './toolbar'
import { OkuToolbarButton } from './toolbarButton'

const TOGGLE_ITEM_NAME = 'OkuToolbarToggleItem'

export type ToolbarToggleItemIntrinsicElement = ElementType<'div'>
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
    const toggleGroupScope = useToggleGroupScope(props.scopeOkuToolbar)
    const scope = { scopeOkuToolbar: props.scopeOkuToolbar }

    const forwardedRef = useForwardRef()

    return () => h(OkuToolbarButton, {
      asChild: true,
      ...scope,
    }, {
      default: () => h(OkuToggleGroupItem, {
        ...toggleGroupScope,
        ...attrs,
        ...props,
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
  $props: ScopeToolbar<Partial<ToggleItemElement>>
})
