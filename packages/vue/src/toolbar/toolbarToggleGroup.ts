import type { ToggleGroupMultipleProps, ToggleGroupSingleProps } from '@oku-ui/toggle-group'
import { primitiveProps } from '@oku-ui/primitive'
import { OkuToggleGroup, toggleGroupProps } from '@oku-ui/toggle-group'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { useToggleGroupScope, useToolbarInject } from './toolbar'
import { scopeToolbarProps } from './utils'

const TOGGLE_GROUP_NAME = 'OkuToolbarToggleGroup'

export type ToolbarToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps

export const toolbarToggleGroupProps = {
  props: {
    ...primitiveProps,
    ...toggleGroupProps.props,
  },
  emits: {
    ...toggleGroupProps.emits,
  },
}

const toolbarToggleGroup = defineComponent({
  name: TOGGLE_GROUP_NAME,
  inheritAttrs: false,
  props: {
    ...toolbarToggleGroupProps.props,
    ...scopeToolbarProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuToolbar, ...toggleGroupProps } = toRefs(props)

    const _reactive = reactive(toggleGroupProps)
    const reactiveToggleGroupProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = useToolbarInject(TOGGLE_GROUP_NAME, scopeOkuToolbar.value)
    const toggleGroupScope = useToggleGroupScope(scopeOkuToolbar.value)

    const forwardedRef = useForwardRef()

    return () => h(OkuToggleGroup, {
      'data-orientation': inject.orientation.value,
      'dir': inject.dir.value,
      ...toggleGroupScope,
      ...mergeProps(attrs, reactiveToggleGroupProps),
      'ref': forwardedRef,
      'rovingFocus': false,
    }, {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuToolbarToggleGroup = toolbarToggleGroup as typeof toolbarToggleGroup &
  (new () => {
    $props: ToolbarToggleGroupProps
  })
