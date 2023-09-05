import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { OkuElement } from '@oku-ui/primitive'
import { createProvideScope } from '@oku-ui/provide'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { computed, defineComponent, h, ref, toRefs } from 'vue'
import type { PropType, Ref } from 'vue'
import { composeEventHandlers } from '@oku-ui/utils'
import { getState, scopeRadioProps } from './utils'
import { OkuBubbleInput } from './BubbleInput'

const RADIO_NAME = 'OkuRadio'

export const [createRadioProvide, createRadioScope] = createProvideScope(RADIO_NAME)

type RadioProvideValue = {
  checked: Ref<boolean>
  disabled?: Ref<boolean | undefined>
}

export const useRadioScope = createRadioScope()

export const [radioProvider, useRadioInject] = createRadioProvide<RadioProvideValue>(RADIO_NAME)

export type RadioIntrinsicNaviteElement = OkuElement<'button'>
export type RadioElement = HTMLButtonElement

export interface RadioProps {
  checked?: boolean
  required?: boolean
  disabled?: boolean
  value?: string
  name?: string
}

export type RadioEmits = {
  check: []
  click: (event: MouseEvent) => void
}

export const radioProps = {
  props: {
    checked: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    required: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    disabled: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    name: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    value: {
      type: String as PropType<string>,
      default: 'on',
    },
    ...primitiveProps,
  },
  emits: {
    check: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: MouseEvent) => true,
  },
}

const Radio = defineComponent({
  name: RADIO_NAME,
  inheritAttrs: false,
  props: {
    ...radioProps.props,
    ...scopeRadioProps,
  },
  emits: radioProps.emits,
  setup(props, { attrs, slots, emit }) {
    const {
      checked,
      required,
      disabled,
      value,
      name,
      scopeOkuRadio,
      asChild,
    } = toRefs(props)

    const hasConsumerStoppedPropagationRef = ref(false)
    const buttonRef = ref<HTMLButtonElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(buttonRef, forwardedRef)

    const isFormControl = computed(() => buttonRef.value ? Boolean(buttonRef.value.closest('form')) : false)

    radioProvider({
      checked,
      disabled,
      scope: scopeOkuRadio.value,
    })

    return () => [
      h(Primitive.button, {
        'type': 'button',
        'role': 'radio',
        'aria-checked': checked.value,
        'data-state': getState(checked.value || false),
        'data-disabled': disabled.value ? '' : undefined,
        'disabled': disabled.value,
        'value': value.value,
        ...attrs,
        'asChild': asChild.value,
        'ref': composedRefs,
        'onClick': composeEventHandlers((e: MouseEvent) => {
          emit('click', e)
        },
        (event: MouseEvent) => {
          // radios cannot be unchecked so we only communicate a checked state
          if (!checked.value)
            emit('check')
          if (isFormControl.value) {
            // TODO: check `isPropagationStopped`
            // hasConsumerStoppedPropagationRef.value = event.isPropagationStopped()
            // if radio is in a form, stop propagation from the button so that we only propagate
            // one click event (from the input). We propagate changes from an input so that native
            // form validation works and form events reflect radio updates.
            if (!hasConsumerStoppedPropagationRef.value)
              event.stopPropagation()
          }
        }),
      }, {
        default: () => slots.default?.(),
      }),
      isFormControl.value && h(OkuBubbleInput, {
        control: buttonRef.value,
        bubbles: !hasConsumerStoppedPropagationRef.value,
        name: name.value,
        value: value.value,
        checked: checked.value || false,
        required: required.value,
        disabled: disabled.value,
        // We transform because the input is absolutely positioned but we have
        // rendered it **after** the button. This pulls it back to sit on top
        // of the button.
        style: {
          transform: 'translateX(-100%)',
        },
      }),
    ]
  },
})

export const OkuRadio = Radio as typeof Radio &
(new () => {
  $props: RadioIntrinsicNaviteElement
})
