import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import { reactiveOmit, useControllable, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { useDirection } from '@oku-ui/direction'
import { Primitive } from '@oku-ui/primitive'
import { OkuRovingFocusGroup } from '@oku-ui/roving-focus'
import { RADIO_GROUP_NAME, radioGroupProps, radioGroupProvider, scopeRadioGroupProps, useRovingFocusGroupScope } from './props'
import type { RadioGroupNativeElement } from './props'

const radioGroup = defineComponent({
  name: RADIO_GROUP_NAME,
  components: {
    OkuRovingFocusGroup,
  },
  inheritAttrs: false,
  props: {
    ...radioGroupProps.props,
    ...scopeRadioGroupProps,
  },
  emits: radioGroupProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      scopeOkuRadioGroup,
      name,
      defaultValue,
      value: valueProp,
      required,
      disabled,
      orientation,
      dir,
      loop,
      ...groupProps
    } = toRefs(props)

    const _reactive = reactive(groupProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeOkuRadioGroup.value)
    const direction = useDirection(dir)

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

    radioGroupProvider({
      scope: scopeOkuRadioGroup.value,
      name,
      required,
      disabled,
      value: state,
      onValueChange: _value => updateValue(_value),
    })

    return () => h(OkuRovingFocusGroup, {
      asChild: true,
      ...rovingFocusGroupScope,
      orientation: orientation.value,
      dir: direction.value,
      loop: loop.value,
    }, () => h(Primitive.div, {
      'role': 'radiogroup',
      'aria-required': required.value,
      'aria-oriented': orientation.value,
      'data-disabled': disabled.value ? '' : undefined,
      'dir': direction.value,
      ...mergeProps(attrs, otherProps, emits),
      'ref': forwardedRef,
    }, () => slots.default?.()))
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuRadioGroup = radioGroup as typeof radioGroup & (new () => { $props: RadioGroupNativeElement })
