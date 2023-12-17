import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import { reactiveOmit, useControllable, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuToggleGroupImpl } from './toggle-group-impl'
import { TOGGLE_GROUP_IMPL_SINGLE_NAME, scopeToggleGroupProps, toggleGroupImplSingleProps, toggleGroupValueProvider } from './props'
import type { ToggleGroupImplSingleNativeElement } from './props'

const toggleGroupImplSingle = defineComponent({
  name: TOGGLE_GROUP_IMPL_SINGLE_NAME,
  components: {
    OkuToggleGroupImpl,
  },
  inheritAttrs: false,
  props: {
    ...toggleGroupImplSingleProps.props,
    ...scopeToggleGroupProps,
  },
  emits: toggleGroupImplSingleProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      value: valueProp,
      defaultValue,
      ...toggleGroupSingleProps
    } = toRefs(props)

    const _reactive = reactive(toggleGroupSingleProps)
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
    })

    toggleGroupValueProvider({
      scope: props.scopeOkuToggleGroup,
      type: 'single',
      value: computed(() => state.value ? [state.value] : []),
      onItemActivate: _value => updateValue(_value),
      onItemDeactivate: () => updateValue(''),
    })

    return () => h(OkuToggleGroupImpl, {
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
    }, () => slots.default?.())
  },
})

export const OkuToggleGroupImplSingle = toggleGroupImplSingle as typeof toggleGroupImplSingle & (new () => { $props: ToggleGroupImplSingleNativeElement })
