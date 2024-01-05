import { computed, defineComponent, h, mergeProps, onMounted, reactive, ref, toRefs, useModel } from 'vue'
import { reactiveOmit, useComposedRefs, useControllable, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { Primitive } from '@oku-ui/primitive'
import { OkuBubbleInput } from './bubble-input'
import { getState } from './utils'
import type { SwitchEmits, SwitchNativeElement } from './props'
import { SWITCH_NAME, scopeSwitchProps, switchProps, switchProvider } from './props'

const Switch = defineComponent({
  name: SWITCH_NAME,
  components: {
    OkuBubbleInput,
  },
  inheritAttrs: false,
  props: {
    ...switchProps.props,
    ...scopeSwitchProps,
  },
  emits: switchProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value,
      ...switchProps
    } = toRefs(props)

    const _reactive = reactive(switchProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const buttonRef = ref<HTMLButtonElement | null>(null)
    const composedRefs = useComposedRefs(buttonRef, forwardedRef)
    const hasConsumerStoppedPropagationRef = ref<boolean>(false)
    // We set this to true by default so that events bubble to forms without JS (SSR)
    const isFormControl = ref<boolean>(false)
    onMounted(() => {
      isFormControl.value = buttonRef.value
        ? typeof buttonRef.value.closest === 'function'
        && Boolean(buttonRef.value.closest('form'))
        : true
    })

    const modelValue = useModel(props, 'modelValue')
    const proxyChecked = computed({
      get: () => modelValue.value !== undefined ? modelValue.value : checkedProp.value !== undefined ? checkedProp.value : undefined,
      set: () => { },
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyChecked.value),
      defaultProp: computed(() => defaultChecked.value),
      onChange: (result) => {
        modelValue.value = result
        emit('checkedChange', result)
        emit('update:modelValue', result)
      },
      initialValue: false,
    })

    switchProvider({
      scope: scopeOkuSwitch.value,
      checked: computed(() => state.value || false),
      disabled,
    })

    return () => [
      h(Primitive.button, {
        'type': 'button',
        'role': 'switch',
        'aria-checked': state.value,
        'aria-required': required.value,
        'data-state': getState(state.value),
        'data-disabled': disabled.value ? '' : undefined,
        'disabled': disabled.value,
        'value': value.value,
        ...mergeProps(attrs, otherProps, emits),
        'ref': composedRefs,
        'onClick': composeEventHandlers<SwitchEmits['click'][0]> ((event) => {
          emit('click', event)
        }, (event) => {
          updateValue(!state.value)
          if (isFormControl.value) {
            // TODO: isPropagationStopped() is not supported in vue
            // hasConsumerStoppedPropagationRef.value = event.isPropagationStopped()

            // if switch is in a form, stop propagation from the button so that we only propagate
            // one click event (from the input). We propagate changes from an input so that native
            // form validation works and form events reflect switch updates.
            if (!hasConsumerStoppedPropagationRef.value)
              event.stopPropagation()
          }
        }),
      }, () => slots.default?.()),

      isFormControl.value && h(OkuBubbleInput, {
        control: buttonRef.value,
        bubbles: computed(() => !hasConsumerStoppedPropagationRef.value).value,
        name: name.value,
        value: value.value,
        checked: state.value,
        required: required.value,
        disabled: disabled.value,
        // We transform because the input is absolutely positioned but we have
        // rendered it **after** the button. This pulls it back to sit on top
        // of the button.
        style: { transform: 'translateX(-100%)' },
      }),
    ]
  },
})

export const OkuSwitch = Switch as typeof Switch & (new () => { $props: SwitchNativeElement })
