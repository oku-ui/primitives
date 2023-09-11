import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import type { SeparatorElement, SeparatorNaviteElement, SeparatorProps } from '@oku-ui/separator'
import { OkuSeparator, separatorProps } from '@oku-ui/separator'
import { scopeToolbarProps } from './utils'
import { useToolbarInject } from './toolbar'

const SEPARATOR_NAME = 'OkuToolbarSeparator'

export type ToolbarSeparatorNaviteElement = SeparatorNaviteElement
export type ToolbarSeparatorElement = SeparatorElement

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
    const { scopeOkuToolbar, ...separatorProps } = toRefs(props)
    const _reactive = reactive(separatorProps)
    const reactiveSeparatorProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = useToolbarInject(SEPARATOR_NAME, scopeOkuToolbar.value)
    const forwardedRef = useForwardRef()
    const orientation = computed(() => inject.orientation.value === 'horizontal' ? 'vertical' : 'horizontal')

    return () => h(OkuSeparator, {
      orientation: orientation.value,
      decorative: props.decorative,
      ...mergeProps(attrs, reactiveSeparatorProps),
      ref: forwardedRef,
    }, {
      default: slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuToolbarSeparator = toolbarSeparator as typeof toolbarSeparator &
(new () => {
  $props: ToolbarSeparatorNaviteElement
})
