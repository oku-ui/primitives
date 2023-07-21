import type {
  ComputedRef,
  PropType,
  Ref,
} from 'vue'
import {
  computed,
  defineComponent,
  h,
  ref,
  toRefs,
  toValue,
  useModel,
} from 'vue'
import { useControllable, useRef } from '@oku-ui/use-composable'
import type {
  ElementType,
  MergeProps,
  PrimitiveProps,
} from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import { composeEventHandlers } from '@oku-ui/utils'
import { getState } from './util'

// import { OkuBubbleInput } from "./BubbleInput";

const SWITCH_NAME = 'OkuSwitch'

type SwitchElement = ElementType<'button'>

type SwitchContextValue = {
  checked: Ref<boolean> | ComputedRef<boolean>
  disabled?: Ref<boolean>
}

interface SwitchProps extends PrimitiveProps {
  checked?: boolean
  defaultChecked?: boolean
  required?: boolean
  onCheckedChange?(checked: boolean): void
}

const [createSwitchContext, createSwitchScope]
  = createProvideScope(SWITCH_NAME)

const [switchProvider, useSwitchContext]
  = createSwitchContext<SwitchContextValue>(SWITCH_NAME)

const Switch = defineComponent({
  name: SWITCH_NAME,
  inheritAttrs: false,
  props: {
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
      default: false,
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
    scopeSwitch: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
    asChild: {
      type: Boolean,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, expose, slots, emit }) {
    const {
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value: switchValue,
      onCheckedChange,
      scopeSwitch,
    } = toRefs(props)

    const { ...switchProps } = attrs as SwitchElement

    const { $el, newRef } = useRef<SwitchElement>()

    const modelValue = useModel(props, 'modelValue')

    const button = ref<HTMLButtonElement | null>(null)

    const hasConsumerStoppedPropagationRef = ref<boolean>(false)
    // We set this to true by default so that events bubble to forms without JS (SSR)
    const isFormControl = button.value
      ? Boolean(button.value?.closest('form'))
      : true

    const { state, updateValue } = useControllable({
      prop: computed(() => modelValue.value ?? checkedProp.value),
      defaultProp: computed(() => defaultChecked.value),
      onChange: (value: any) => {
        onCheckedChange.value?.(value)
        emit('update:modelValue', value)
      },
    })

    switchProvider({
      disabled,
      scope: scopeSwitch.value,
      checked: state as ComputedRef<boolean>,
    })

    expose({
      innerRef: $el,
    })

    const originalReturn = () =>
      h(Primitive.div, [
        h(
          Primitive.button,
          {
            'type': 'button',
            'role': 'switch',
            'aria-checked': toValue(state.value ?? false),
            'aria-required': required.value,
            'data-disabled': disabled.value ? '' : undefined,
            'disabled': disabled,
            'value': switchValue.value,
            'data-state': getState(state.value ?? false),
            'ref': newRef,
            'asChild': props.asChild,
            ...switchProps,
            'onClick': composeEventHandlers(switchProps.onClick, (event: any) => {
              updateValue(!state.value)

              if (isFormControl) {
                hasConsumerStoppedPropagationRef.value
                  = event.isPropagationStopped()
                // if switch is in a form, stop propagation from the button so that we only propagate
                // one click event (from the input). We propagate changes from an input so that native
                // form validation works and form events reflect switch updates.
                if (!hasConsumerStoppedPropagationRef.value)
                  event.stopPropagation()
              }
            }),
          },
          {
            default: () =>
              slots?.default
                ? slots.default()
                : h(Primitive.div, null, { default: () => '' }),
          },
        ),
        // isFormControl &&
        //   h(OkuBubbleInput, {
        //     control: button.value,
        //     bubbles: !hasConsumerStoppedPropagationRef.value,
        //     name: name.value,
        //     value: switchValue.value,
        //     checked: state.value,
        //     required: required.value,
        //     disabled: disabled.value,
        //     style: { transform: "translateX(-100%)" },
        //   }),
      ])

    return originalReturn as unknown as {
      innerRef: SwitchElement
    }
  },
})

type _Switch = MergeProps<SwitchProps, SwitchElement>

const OkuSwitch = Switch as typeof Switch & (new () => { $props: _Switch })

export { OkuSwitch, useSwitchContext, createSwitchScope }

export type { SwitchProps }
