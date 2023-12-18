import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuSeparator } from '@oku-ui/separator'
import { TOOLBAR_SEPARATOR_NAME, scopeToolbarProps, toolbarSeparatorProps, useToolbarInject } from './props'
import type { ToolbarSeparatorNativeElement } from './props'

const toolbarSeparator = defineComponent({
  name: TOOLBAR_SEPARATOR_NAME,
  components: {
    OkuSeparator,
  },
  inheritAttrs: false,
  props: {
    ...toolbarSeparatorProps.props,
    ...scopeToolbarProps,
  },
  emits: toolbarSeparatorProps.emits,
  setup(props, { attrs }) {
    const { scopeOkuToolbar, ...separatorProps } = toRefs(props)

    const _reactive = reactive(separatorProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useToolbarInject(TOOLBAR_SEPARATOR_NAME, scopeOkuToolbar.value)

    return () => h(OkuSeparator, {
      orientation: computed(() => inject.orientation.value === 'horizontal' ? 'vertical' : 'horizontal').value,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuToolbarSeparator = toolbarSeparator as typeof toolbarSeparator & (new () => { $props: ToolbarSeparatorNativeElement })
