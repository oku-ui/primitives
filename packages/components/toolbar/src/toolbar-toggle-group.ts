import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuToggleGroup } from '@oku-ui/toggle-group'
import { TOOLBAR_TOGGLE_GROUP_NAME, scopeToolbarProps, toolbarToggleGroupProps, useToggleGroupScope, useToolbarInject } from './props'
import type { ToolbarToggleGroupNativeElement } from './props'

const toolbarToggleGroup = defineComponent({
  name: TOOLBAR_TOGGLE_GROUP_NAME,
  components: {
    OkuToggleGroup,
  },
  inheritAttrs: false,
  props: {
    ...toolbarToggleGroupProps.props,
    ...scopeToolbarProps,
  },
  emits: toolbarToggleGroupProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuToolbar, ...toggleGroupProps } = toRefs(props)

    const _reactive = reactive(toggleGroupProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useToolbarInject(TOOLBAR_TOGGLE_GROUP_NAME, scopeOkuToolbar.value)
    const toggleGroupScope = useToggleGroupScope(scopeOkuToolbar.value)

    return () => h(OkuToggleGroup, {
      'data-orientation': inject.orientation.value,
      'dir': inject.dir.value,
      ...toggleGroupScope,
      ...mergeProps(attrs, otherProps),
      'ref': forwardedRef,
      'rovingFocus': false,
    }, () => slots.default?.())
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuToolbarToggleGroup = toolbarToggleGroup as typeof toolbarToggleGroup & (new () => { $props: ToolbarToggleGroupNativeElement })
