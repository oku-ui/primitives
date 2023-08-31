import { computed, defineComponent, h } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import type { SeparatorElement, SeparatorIntrinsicElement, SeparatorProps } from '@oku-ui/separator'
import { OkuSeparator, separatorProps } from '@oku-ui/separator'
import { scopeToolbarProps } from './utils'
import { useToolbarInject } from './toolbar'

const SEPARATOR_NAME = 'OkuToolbarSeparator'

export type ToolbarSeparatorIntrinsicElement = SeparatorIntrinsicElement

export interface ToolbarSeparatorProps extends SeparatorProps {}

export const toolbarSeparatorProps = {
  props: {
    ...separatorProps.props,
  },
}

const toolbarSeparator = defineComponent({
  name: SEPARATOR_NAME,
  inheritAttrs: false,
  props: {
    ...toolbarSeparatorProps.props,
    ...scopeToolbarProps,
  },
  setup(props, { attrs, slots }) {
    const inject = useToolbarInject(SEPARATOR_NAME, props.scopeOkuToolbar)
    const forwardedRef = useForwardRef()

    return () => h(OkuSeparator, {
      orientation: computed(() => inject.orientation.value === 'horizontal' ? 'vertical' : 'horizontal').value,
      ...attrs,
      ref: forwardedRef,
    }, {
      default: slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuToolbarSeparator = toolbarSeparator as typeof toolbarSeparator &
(new () => {
  $props: Partial<SeparatorElement>
})
