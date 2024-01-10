import type { PropType, Ref } from 'vue'
import {
  computed,
  defineComponent,
  h,
  mergeProps,
  onMounted,
  reactive,
  ref,
  toRefs,
  toValue,
  useModel,
} from 'vue'
import {
  reactiveOmit,
  useComposedRefs,
  useControllable,
  useForwardRef,
} from '@oku-ui/use-composable'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { createProvideScope } from '@oku-ui/provide'
import { composeEventHandlers } from '@oku-ui/utils'
import { getState, scopeSwitchProps } from './util'
import { BubbleInput } from './BubbleInput'

const SWITCH_NAME = 'OkuSwitch'

export type SwitchNaviteElement = OkuElement<'button'>
export type SwitchElement = HTMLButtonElement

type SwitchProvideValue = {
  checked: Ref<boolean>
  disabled?: Ref<boolean | undefined>
}

export interface SwitchProps extends PrimitiveProps {
  name?: string
  checked?: boolean
  defaultChecked?: boolean
  required?: boolean
  disabled?: boolean
  value?: 'on' | 'off'
}

export type SwitchEmits = {
  'update:modelValue': [checked: boolean]
  'checkedChange': [checked: boolean]
  'click': [event: MouseEvent]
}

export const switchProps = {
  props: {
    modelValue: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    name: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    checked: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    defaultChecked: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    required: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    disabled: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    value: {
      type: String as PropType<'on' | 'off'>,
      default: 'on',
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (checked: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'checkedChange': (checked: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'click': (event: MouseEvent) => true,
  },
}

const [createSwitchProvide, createSwitchScope]
  = createProvideScope(SWITCH_NAME)

const [switchProvider, useSwitchInject]
  = createSwitchProvide<SwitchProvideValue>(SWITCH_NAME)

const Switch = defineComponent({
  name: SWITCH_NAME,
  components: {
    BubbleInput,
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
      modelValue: _modelValue,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value: switchValue,
      name,
      ...switchProps
    } = toRefs(props)
    const _reactive = reactive(switchProps)
    const reactiveSwitchProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const buttonRef = ref<HTMLButtonElement | null>(null)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(buttonRef, forwardedRef)

    const isFormControl = ref<boolean>(false)

    const hasConsumerStoppedPropagationRef = ref<boolean>(false)
    // We set this to true by default so that events bubble to forms without JS (SSR)
    onMounted(() => {
      isFormControl.value = buttonRef.value
        ? typeof buttonRef.value.closest === 'function'
        && Boolean(buttonRef.value.closest('form'))
        : true
    })

    const modelValue = useModel(props, 'modelValue')

    const checkedProxy = computed(() => {
      if (checkedProp.value === undefined && modelValue.value === undefined)
        return undefined
      if (checkedProp.value !== undefined)
        return checkedProp.value
      if (modelValue.value !== undefined)
        return modelValue.value
    })

    const [checked, setChecked] = useControllable({
      prop: computed(() => checkedProxy.value),
      defaultProp: computed(() => defaultChecked.value),
      onChange: (result) => {
        emit('checkedChange', result)
        emit('update:modelValue', result)
      },
      initialValue: false,
    })

    switchProvider({
      disabled,
      scope: scopeOkuSwitch.value,
      checked,
    })

    const originalReturn = () => [
      h(
        Primitive.button,
        {
          'type': 'button',
          'role': 'switch',
          'aria-checked': toValue(checked.value),
          'aria-required': required.value,
          'data-disabled': disabled.value ? '' : undefined,
          'disabled': disabled.value,
          'value': switchValue.value,
          'data-state': getState(checked.value),
          'ref': composedRefs,
          ...mergeProps(attrs, reactiveSwitchProps),
          'onClick': composeEventHandlers<MouseEvent>(
            (e) => {
              emit('click', e)
            },
            (event) => {
              setChecked(!checked.value)

              if (isFormControl.value) {
                // hasConsumerStoppedPropagationRef.value
                //   = event.isPropagationStopped()
                // if switch is in a form, stop propagation from the button so that we only propagate
                // one click event (from the input). We propagate changes from an input so that native
                // form validation works and form events reflect switch updates.
                if (!hasConsumerStoppedPropagationRef.value)
                  event.stopPropagation()
              }
            },
          ),
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
        checked: checked.value,
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
    $props: SwitchNaviteElement
  })

export { useSwitchInject, createSwitchScope }
