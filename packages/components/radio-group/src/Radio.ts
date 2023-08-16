import { Primitive, PrimitiveProps } from '@oku-ui/primitive'
import type { ElementType, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { computed, defineComponent, h, mergeProps, ref, toRefs } from 'vue'
import type { PropType, Ref } from 'vue'
import { composeEventHandlers } from '@oku-ui/utils'
import { getState } from './utils'
import { OkuBubbleInput } from './BubbleInput'

const RADIO_NAME = 'OkuRadio'

export type ScopedRadioType<P> = P & { scopeOkuRadio?: Scope }
export const ScopedRadioProps = {
  scopeOkuRadio: {
    ...ScopePropObject,
  },
}
export const [createRadioProvide, createRadioScope] = createProvideScope(RADIO_NAME)

type RadioProvideValue = {
  checked: Ref<boolean>
  disabled?: Ref<boolean | undefined>
}

export const useRadioScope = createRadioScope()

export const [radioProvider, useRadioInject] = createRadioProvide<RadioProvideValue>(RADIO_NAME)

export type RadioIntrinsicElement = ElementType<'button'>
export type RadioElement = HTMLButtonElement

interface RadioProps extends ScopedRadioType<any> {
  checked?: boolean
  required?: boolean
  disabled?: boolean
  value?: string
  name?: string
  onCheck?(): void
  onClick?(): (event: MouseEvent) => void
}

export const radioPropsObject = {
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
  onCheck: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
  value: {
    type: String as PropType<string>,
    default: 'on',
  },
}

const Radio = defineComponent({
  name: RADIO_NAME,
  inheritAttrs: false,
  props: {
    ...radioPropsObject,
    ...ScopedRadioProps,
    ...PrimitiveProps,
  },
  setup(props, { attrs, slots }) {
    const attrsRef = attrs as RadioIntrinsicElement
    const {
      checked,
      required, disabled,
      value,
      name,
      onCheck,
      scopeOkuRadio,
      asChild,
      ...radioProps
    } = toRefs(props)

    const { ...radioAttrs } = attrs as RadioIntrinsicElement

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

    // console.log(mergeProps(radioAttrs, radioProps))
    return () => [
      h(Primitive.button, {
        'type': 'button',
        'role': 'radio',
        'aria-checked': checked.value,
        'data-state': getState(checked.value || false).value,
        'data-disabled': disabled.value ? '' : undefined,
        'disabled': disabled.value,
        'value': value.value,
        ...mergeProps(radioAttrs, radioProps),
        'ref': composedRefs,
        'onClick': composeEventHandlers(attrsRef.onClick, (event: MouseEvent) => {
          // radios cannot be unchecked so we only communicate a checked state
          if (!checked.value)
            onCheck.value?.()
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

type _OkuRadioProps = MergeProps<RadioProps, Partial<RadioElement>>
export type IstanceOkuRadioType = InstanceTypeRef<typeof OkuRadio, RadioIntrinsicElement>

const OkuRadio = Radio as typeof Radio & (new () => { $props: _OkuRadioProps })

export { OkuRadio }

export type { RadioProps }
