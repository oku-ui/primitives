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

    const valueProxy = computed(() => {
      if (valueProp.value === undefined && modelValue.value === undefined)
        return undefined
      if (valueProp.value !== undefined)
        return valueProp.value
      if (modelValue.value !== undefined)
        return modelValue.value
    })

    const [value, setValue] = useControllable({
      prop: computed(() => valueProxy.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result) => {
        emit('valueChange', result)
        emit('update:modelValue', result)
      },
      initialValue: [],
    })

    const handleButtonActivate = (itemValue: string) =>
      setValue([...value.value, itemValue])

    const handleButtonDeactivate = (itemValue: string) =>
      setValue(value.value.filter(_value => _value !== itemValue))

    toggleGroupValueProvider({
      scope: props.scopeOkuToggleGroup,
      type: 'multiple',
      value,
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
