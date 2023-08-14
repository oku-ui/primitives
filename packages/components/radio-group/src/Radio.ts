import { type ComponentPublicInstanceRef, type ElementType, Primitive } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { computed, defineComponent, h, ref, toRefs } from 'vue'
import type { PropType, Ref } from 'vue'
import { composeEventHandlers } from '@oku-ui/utils'
import { getState } from './utils'

const RADIO_NAME = 'OkuRadio'

export type ScopedRadioType<P> = P & { scopeRadio?: Scope }
export const ScopedRadioProps = {
  scopeRadio: {
    ...ScopePropObject,
  },
}
const [createRadioProvide, createRadioScope] = createProvideScope(RADIO_NAME)

type RadioProvideValue = {
  checked: Ref<boolean>
  disabled?: Ref<boolean | undefined>
}

export const [RadioProvider, useRadioInject] = createRadioProvide<RadioProvideValue>(RADIO_NAME)

type RadioElement = ElementType<'button'>
export type _RadioEl = HTMLButtonElement

interface RadioProps extends ScopedRadioType<any> {
  checked?: boolean
  required?: boolean
  disabled?: boolean
  value?: string
  name?: string
  onCheck?(): void
  onClick?(): (event: MouseEvent) => void
}

const RadioPropsObject = {
  checked: {
    type: Boolean as PropType<boolean | undefined>,
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
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  onClick: {
    type: Function as PropType<(event: MouseEvent) => void>,
    default: undefined,
  },
  ...ScopedRadioProps,
}

const OkuRadio = defineComponent({
  name: RADIO_NAME,
  inheritAttrs: false,
  props: RadioPropsObject,
  setup(props, { attrs, slots }) {
    const { checked: _checked, required, disabled, value } = toRefs(props)
    const { ...radioAttrs } = attrs as RadioElement
    const checked = computed(() => _checked.value ?? false)

    const hasConsumerStoppedPropagationRef = ref(false)
    const buttonRef = ref<ComponentPublicInstanceRef<HTMLButtonElement> | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(buttonRef, forwardedRef)

    const isFormControl = computed(() => buttonRef.value?.$el ? Boolean(buttonRef.value.$el.closest('form')) : false)
    RadioProvider({
      checked: computed(() => checked.value ?? false),
      disabled,
      scope: props.scopeRadio,
    })

    return () => [
      h(Primitive.button, {
        'type': 'button',
        'role': 'radio',
        'aria-checked': checked.value,
        'data-state': getState(checked.value),
        'data-disabled': disabled.value ? '' : undefined,
        'disabled': disabled.value,
        'value': value.value,
        ...radioAttrs,
        'ref': composedRefs,
        'onClick': () => composeEventHandlers(props.onClick, (event: MouseEvent) => {
          // radios cannot be unchecked so we only communicate a checked state
          if (!checked.value)
            props.onCheck?.()
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

    ]
  },

})
