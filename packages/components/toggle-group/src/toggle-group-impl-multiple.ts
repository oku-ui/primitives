import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import { reactiveOmit, useControllable, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuToggleGroupImpl } from './toggle-group-impl'
import { TOGGLE_GROUP_IMPL_MULTIPLE_NAME, scopeToggleGroupProps, toggleGroupImplMultipleProps, toggleGroupValueProvider } from './props'
import type { ToggleGroupImplMultipleNativeElement } from './props'

const toggleGroupImplMultiple = defineComponent({
  name: TOGGLE_GROUP_IMPL_MULTIPLE_NAME,
  components: {
    OkuToggleGroupImpl,
  },
  inheritAttrs: false,
  props: {
    ...toggleGroupImplMultipleProps.props,
    ...scopeToggleGroupProps,
  },
  emits: toggleGroupImplMultipleProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      value: valueProp,
      defaultValue,
      ...toggleGroupMultipleProps
    } = toRefs(props)

    const _reactive = reactive(toggleGroupMultipleProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const modelValue = useModel(props, 'modelValue')
    const proxyValue = computed({
      get: () => modelValue.value !== undefined ? modelValue.value : valueProp.value !== undefined ? valueProp.value : undefined,
      set: () => { },
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyValue.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result) => {
        modelValue.value = result
        emit('valueChange', result)
        emit('update:modelValue', result)
      },
      initialValue: [],
    })

    const handleButtonActivate = (itemValue: string) =>
      updateValue([...state.value, itemValue])

    const handleButtonDeactivate = (itemValue: string) =>
      updateValue(state.value.filter(value => value !== itemValue))

    toggleGroupValueProvider({
      scope: props.scopeOkuToggleGroup,
      type: 'multiple',
      value: state,
      onItemActivate: handleButtonActivate,
      onItemDeactivate: handleButtonDeactivate,
    })

    return () => h(OkuToggleGroupImpl, {
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
    }, () => slots.default?.())
  },
})

export const OkuToggleGroupImplMultiple = toggleGroupImplMultiple as typeof toggleGroupImplMultiple & (new () => { $props: ToggleGroupImplMultipleNativeElement })
