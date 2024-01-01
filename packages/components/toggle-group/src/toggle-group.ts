import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuToggleGroupImplSingle } from './toggle-group-impl-single'
import { OkuToggleGroupImplMultiple } from './toggle-group-impl-multiple'
import type { ToggleGroupNativeElement } from './props'
import { TOGGLE_GROUP_NAME, scopeToggleGroupProps, toggleGroupProps } from './props'

const toggleGroup = defineComponent({
  name: TOGGLE_GROUP_NAME,
  components: {
    OkuToggleGroupImplSingle,
    OkuToggleGroupImplMultiple,
  },
  inheritAttrs: false,
  props: {
    ...toggleGroupProps.props,
    ...scopeToggleGroupProps,
  },
  emits: toggleGroupProps.emits,
  setup(props, { slots, attrs }) {
    const { type, ...toggleGroupProps } = toRefs(props)

    const _reactive = reactive(toggleGroupProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    return () => {
      if (type.value === 'single') {
        const singleProps = otherProps
        return h(OkuToggleGroupImplSingle, {
          ...mergeProps(attrs, singleProps),
          ref: forwardedRef,
        }, () => slots.default?.())
      }

      if (type.value === 'multiple') {
        const multipleProps = otherProps
        return h(OkuToggleGroupImplMultiple, {
          ...mergeProps(attrs, multipleProps),
          ref: forwardedRef,
        }, () => slots.default?.())
      }
    }
  },
})

export const OkuToggleGroup = toggleGroup as typeof toggleGroup & (new () => { $props: ToggleGroupNativeElement })
