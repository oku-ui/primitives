import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { Primitive } from '@oku-ui/primitive'
import { OkuBubbleInput } from './bubble-input'
import { getState } from './utils'
import { RADIO_NAME, radioProps, radioProvider, scopeRadioProps } from './props'
import type { RadioEmits, RadioNativeElement } from './props'

const radio = defineComponent({
  name: RADIO_NAME,
  components: {
    OkuBubbleInput,
  },
  inheritAttrs: false,
  props: {
    ...radioProps.props,
    ...scopeRadioProps,
  },
  emits: radioProps.emits,
  setup(props, { attrs, slots, emit }) {
    const {
      scopeOkuRadio,
      name,
      // checked,
      checked: checkedProp,
      required,
      disabled,
      value,
      ...radioProps
    } = toRefs(props)

    const _reactive = reactive(radioProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const checked = computed(() => checkedProp.value || false)

    const buttonRef = ref<HTMLButtonElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, buttonRef)
    const hasConsumerStoppedPropagationRef = ref(false)
    // We set this to true by default so that events bubble to forms without JS (SSR)
    const isFormControl = computed(() => buttonRef.value ? Boolean(buttonRef.value.closest('form')) : false)

    radioProvider({
      scope: scopeOkuRadio.value,
      checked,
      disabled,
    })

    return () => [
      h(Primitive.button, {
        'type': 'button',
        'role': 'radio',
        'aria-checked': checked.value,
        'data-state': computed(() => getState(checked.value)).value,
        'data-disabled': disabled.value ? '' : undefined,
        'disabled': disabled.value,
        'value': value.value,
        ...mergeProps(attrs, otherProps, emits),
        'ref': composedRefs,
        'onClick': composeEventHandlers<RadioEmits['click'][0]>((event) => {
          emit('click', event)
        }, (event) => {
          // radios cannot be unchecked so we only communicate a checked state
          if (!checked.value)
            emit('check')
          if (isFormControl.value) {
            // TODO: isPropagationStopped() is not supported in vue
            // hasConsumerStoppedPropagationRef.value = event.isPropagationStopped()

            // if radio is in a form, stop propagation from the button so that we only propagate
            // one click event (from the input). We propagate changes from an input so that native
            // form validation works and form events reflect radio updates.
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
        checked: checked.value,
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

export const OkuRadio = radio as typeof radio & (new () => { $props: RadioNativeElement })
