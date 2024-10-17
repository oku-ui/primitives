import type { ToggleGroupImplNativeElement } from './props'
import { useDirection } from '@oku-ui/direction'
import { Primitive } from '@oku-ui/primitive'
import { OkuRovingFocusGroup } from '@oku-ui/roving-focus'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { scopeToggleGroupProps, TOGGLE_GROUP_IMPL_NAME, toggleGroupImplProps, toggleGroupProvider, useRovingFocusGroupScope } from './props'

const toggleGroupImpl = defineComponent({
  name: TOGGLE_GROUP_IMPL_NAME,
  components: {
    OkuRovingFocusGroup,
  },
  inheritAttrs: false,
  props: {
    ...toggleGroupImplProps.props,
    ...scopeToggleGroupProps,
  },
  emits: toggleGroupImplProps.emits,
  setup(props, { slots, attrs }) {
    const {
      scopeOkuToggleGroup,
      disabled,
      rovingFocus,
      orientation,
      dir,
      loop,
      ...toggleGroupProps
    } = toRefs(props)

    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeOkuToggleGroup.value)
    const direction = useDirection(dir)
    const commonProps = { role: 'group', dir: direction, ...toggleGroupProps }

    const _reactive = reactive(commonProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    toggleGroupProvider({
      scope: scopeOkuToggleGroup.value,
      rovingFocus,
      disabled,
    })

    return () => [rovingFocus
      ? h(OkuRovingFocusGroup, {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: orientation.value,
        dir: direction.value,
        loop: loop.value,
      }, () => h(Primitive.div, {
        ...mergeProps(attrs, otherProps),
        ref: forwardedRef,
      }, () => slots.default?.()))
      : h(Primitive.div, {
        ...mergeProps(attrs, otherProps),
        ref: forwardedRef,
      }, () => slots.default?.()),
    ]
  },
})

export const OkuToggleGroupImpl = toggleGroupImpl as typeof toggleGroupImpl & (new () => { $props: ToggleGroupImplNativeElement })
