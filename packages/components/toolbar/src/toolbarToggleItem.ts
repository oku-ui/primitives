import { defineComponent, h } from 'vue'
import type { ElementType } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuToggleGroupItem } from '@oku-ui/toggle-group'
import type { ScopeToolbar } from './utils'
import { scopeToolbarProps } from './utils'
import { useToggleGroupScope } from './toolbar'
import { OkuToolbarButton } from './toolbarButton'

const TOGGLE_ITEM_NAME = 'OkuToolbarToggleItem'

// TODO
export type ToolbarToggleItemIntrinsicElement = ElementType<'div'>
export type ToggleItemElement = HTMLDivElement
export interface ToolbarToggleItemProps extends ToggleGroupItemProps {}

export const toolbarToggleItemProps = {
  props: {
    ...primitiveProps,
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
    const scope = { ...props.scopeOkuToolbar }
    /* const {
      orientation: ,
    } = toRefs(props) */

    const { ...restAttrs } = attrs as ToolbarToggleItemIntrinsicElement
    // const { __scopeToolbar, ...toolbarProps } = props;

    const forwardedRef = useForwardRef()

    return () => h(OkuToolbarButton, {
      asChild: { ...scope },
    }, {
      default: () => h(OkuToggleGroupItem, {
        ...toggleGroupScope,
        ...toggleItemProps,
        ref: forwardedRef,
      }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuToolbarToggleItem = toolbarToggleItem as typeof toolbarToggleItem &
(new () => {
  $props: ScopeToolbar<Partial<ToggleItemElement>>
})
