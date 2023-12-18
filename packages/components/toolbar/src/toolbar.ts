import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { useDirection } from '@oku-ui/direction'
import { OkuRovingFocusGroup } from '@oku-ui/roving-focus'
import { TOOLBAR_NAME, scopeToolbarProps, toolbarProps, toolbarProvider, useRovingFocusGroupScope } from './props'
import type { ToolbarNativeElement } from './props'

const toolbar = defineComponent({
  name: TOOLBAR_NAME,
  components: {
    OkuRovingFocusGroup,
  },
  inheritAttrs: false,
  props: {
    ...toolbarProps.props,
    ...scopeToolbarProps,
  },
  emits: toolbarProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuToolbar,
      orientation,
      dir,
      loop,
      ...toolbarProps
    } = toRefs(props)

    const _reactive = reactive(toolbarProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeOkuToolbar.value)
    const direction = useDirection(dir)

    toolbarProvider({
      scope: scopeOkuToolbar.value,
      orientation,
      dir: direction,
    })

    return () => h(OkuRovingFocusGroup, {
      asChild: true,
      ...rovingFocusGroupScope,
      orientation: orientation.value,
      dir: direction.value,
      loop: loop.value,
    }, () => h(Primitive.div, {
      'role': 'toolbar',
      'aria-orientation': orientation.value,
      'dir': direction.value,
      ...mergeProps(attrs, otherProps),
      'ref': forwardedRef,
    }, () => slots.default?.()))
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuToolbar = toolbar as typeof toolbar & (new () => { $props: ToolbarNativeElement })
