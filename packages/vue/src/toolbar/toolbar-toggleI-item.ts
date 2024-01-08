import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuToggleGroupItem } from '@oku-ui/toggle-group'
import { OkuToolbarButton } from './toolbar-button'
import { TOOLBAR_TOGGLE_ITEM_NAME, scopeToolbarProps, toolbarToggleItemProps, useToggleGroupScope } from './props'
import type { ToolbarToggleItemNativeElement } from './props'

const toolbarToggleItem = defineComponent({
  name: TOOLBAR_TOGGLE_ITEM_NAME,
  components: {
    OkuToolbarButton,
    OkuToggleGroupItem,
  },
  inheritAttrs: false,
  props: {
    ...toolbarToggleItemProps.props,
    ...scopeToolbarProps,
  },
  emits: toolbarToggleItemProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuToolbar, ...toggleItemProps } = toRefs(props)

    const _reactive = reactive(toggleItemProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const toggleGroupScope = useToggleGroupScope(scopeOkuToolbar.value)
    const scope = { scope: props.scopeOkuToolbar }

    return () => h(OkuToolbarButton, {
      asChild: true,
      ...scope,
    }, () => h(OkuToggleGroupItem, {
      ...toggleGroupScope,
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
    }, () => slots.default?.()))
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuToolbarToggleItem = toolbarToggleItem as typeof toolbarToggleItem & (new () => { $props: ToolbarToggleItemNativeElement })
