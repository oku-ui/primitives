import { defineComponent, h } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { ToggleGroupProps } from '@oku-ui/toggle-group'
import { OkuToggleGroup } from '@oku-ui/toggle-group'
import { scopeToolbarProps } from './utils'
import { useToggleGroupScope, useToolbarInject } from './toolbar'

const TOGGLE_GROUP_NAME = 'OkuToolbarToggleGroup'

export interface ToolbarToggleGroupSingleProps extends Extract<ToggleGroupProps, { type: 'single' }> {}
export interface ToolbarToggleGroupMultipleProps extends Extract<ToggleGroupProps, { type: 'multiple' }> {}

export type ToolbarToggleGroup = ToolbarToggleGroupSingleProps | ToolbarToggleGroupMultipleProps

export const toggleGroupProps = {
  ...primitiveProps,
  props: {
    ...primitiveProps,
  },
}

export const toolbarToggleGroupProps = {
  props: {
    ...primitiveProps,
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
    const context = useToolbarInject(TOGGLE_GROUP_NAME, props.scopeOkuToolbar)
    const toggleGroupScope = useToggleGroupScope(props.scopeOkuToolbar)
    /* const {
      orientation: ,
    } = toRefs(props) */

    // const { __scopeToolbar, ...toolbarProps } = props;

    const forwardedRef = useForwardRef()

    return () => h(OkuToggleGroup, {
      'data-orientation': context.orientation.value,
      'dir': context.dir,
      ...toggleGroupScope,
      ...toggleGroupProps,
      'ref': forwardedRef,
      'rovingFocus': false,
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuToolbarToggleGroup = toolbarToggleGroup as typeof toolbarToggleGroup &
(new () => {
  $props: Partial<ToggleGroupElement>
})
