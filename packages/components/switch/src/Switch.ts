import type { PropType, Ref } from 'vue'
import {
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
  toRefs,
  toValue,
  useModel,
} from 'vue'
import { useComposedRefs, useControllable, useForwardRef } from '@oku-ui/use-composable'
import type {
  ElementType,
  PrimitiveProps,

} from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { createProvideScope } from '@oku-ui/provide'
import { composeEventHandlers } from '@oku-ui/utils'
import type { ScopeSwitch } from './util'
import { getState, scopeSwitchProps } from './util'
import { BubbleInput } from './BubbleInput'

const SWITCH_NAME = 'OkuSwitch'

export type SwitchIntrinsicElement = ElementType<'button'>
export type SwitchElement = HTMLButtonElement

type SwitchContextValue = {
  checked: Ref<boolean>
  disabled?: Ref<boolean>
}

interface SwitchProps extends PrimitiveProps {
  name?: string
  checked?: boolean
  defaultChecked?: boolean
  required?: boolean
  disabled?: boolean
  value?: 'on' | 'off'
  onCheckedChange?(checked: boolean): void
}

const switchProps = {
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  name: {
    type: String,
    required: false,
  },
  checked: {
    type: Boolean,
    default: undefined,
  },
  defaultChecked: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String as PropType<'on' | 'off'>,
    default: 'on',
  },
  onCheckedChange: {
    type: Function as PropType<(checked: boolean) => void>,
  },
}

const [createSwitchProvide, createSwitchScope]
  = createProvideScope(SWITCH_NAME)

const [switchProvider, useSwitchInject]
  = createSwitchProvide<SwitchContextValue>(SWITCH_NAME)

const Switch = defineComponent({
  name: SWITCH_NAME,
  components: {
    BubbleInput,
  },
  inheritAttrs: false,
  props: {
    ...switchProps,
    ...scopeSwitchProps,
    ...primitiveProps,
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit, slots }) {
    const {
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value: switchValue,
      onCheckedChange,
      name,
    } = toRefs(props)

    const { ...switchProps } = attrs as SwitchIntrinsicElement

    const buttonRef = ref<HTMLButtonElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(buttonRef, forwardedRef)

    const modelValue = useModel(props, 'modelValue')

    const isFormControl = ref<boolean>(false)

    const hasConsumerStoppedPropagationRef = ref<boolean>(false)
    // We set this to true by default so that events bubble to forms without JS (SSR)
    onMounted(() => {
      isFormControl.value = buttonRef.value
        ? typeof buttonRef.value.closest === 'function'
        && Boolean(buttonRef.value.closest('form'))
        : true
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => modelValue.value ?? checkedProp.value),
      defaultProp: computed(() => defaultChecked.value),
      onChange: (value: boolean) => {
        onCheckedChange.value?.(value)
        emit('update:modelValue', value)
      },
    })

    switchProvider({
      disabled,
      scope: props.scopeOkuSwitch,
      checked: computed(() => state.value || false),
    })

    const originalReturn = () => [
      h(
        Primitive.button,
        {
          'type': 'button',
          'role': 'switch',
          'aria-checked': toValue(state.value),
          'aria-required': required.value,
          'data-disabled': disabled.value ? '' : undefined,
          'disabled': disabled.value,
          'value': switchValue.value,
          'data-state': getState(state.value),
          'ref': composedRefs,
          'asChild': props.asChild,
          ...switchProps,
          'onClick': composeEventHandlers(switchProps.onClick, (event) => {
            updateValue(!state.value)

            if (isFormControl.value) {
              // hasConsumerStoppedPropagationRef.value
              //   = event.isPropagationStopped()
              // if switch is in a form, stop propagation from the button so that we only propagate
              // one click event (from the input). We propagate changes from an input so that native
              // form validation works and form events reflect switch updates.
              if (!hasConsumerStoppedPropagationRef.value)
                event.stopPropagation()
            }
          }),
        },
        {
          default: () => slots.default?.(),
        },
      ),
      isFormControl.value
        && h(BubbleInput, {
          control: buttonRef.value,
          bubbles: !hasConsumerStoppedPropagationRef.value,
          name: name.value,
          value: switchValue.value,
          checked: state.value,
          required: required.value,
          disabled: disabled.value,
          style: { transform: 'translateX(-100%)' },
        }),
    ]

    return originalReturn
  },
})

export const OkuSwitch = Switch as typeof Switch &
(new () => {
  $props: ScopeSwitch<Partial<SwitchIntrinsicElement>>
})

export { useSwitchInject, createSwitchScope }

export type { SwitchProps }
