import { defineComponent, h } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { ToggleGroupVariantElement, ToggleGroupVariantProps } from '@oku-ui/toggle-group'
import { OkuToggleGroup, toggleGroupVariantProps } from '@oku-ui/toggle-group'
import { scopeToolbarProps } from './utils'
import { useToggleGroupScope, useToolbarInject } from './toolbar'

const TOGGLE_GROUP_NAME = 'OkuToolbarToggleGroup'

export type ToolbarToggleGroupProps = ToggleGroupVariantProps

export const toolbarToggleGroupProps = {
  props: {
    ...primitiveProps,
    ...toggleGroupVariantProps.props,
  },
  emits: {
    ...toggleGroupVariantProps.emits,
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
    const inject = useToolbarInject(TOGGLE_GROUP_NAME, props.scopeOkuToolbar)
    const toggleGroupScope = useToggleGroupScope(props.scopeOkuToolbar)

    const forwardedRef = useForwardRef()

    return () => h(OkuToggleGroup, {
      'data-orientation': inject.orientation.value,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      'dir': inject.dir.value,
      ...toggleGroupScope,
      ...attrs,
      ...props,
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
  $props: Partial<ToggleGroupVariantElement>
})
