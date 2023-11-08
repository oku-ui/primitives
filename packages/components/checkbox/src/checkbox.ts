import { createProvideScope } from '@oku-ui/provide'
import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs, useModel, watchEffect } from 'vue'

import { composeEventHandlers } from '@oku-ui/utils'
import { reactiveOmit, useComposedRefs, useControllable, useForwardRef } from '@oku-ui/use-composable'
import { Primitive, primitiveProps } from '@oku-ui/primitive'

import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'

import type { Scope } from '@oku-ui/provide'
import { getState, isIndeterminate, scopeCheckboxProps } from './utils'
import type { CheckedState } from './utils'
import { OkuBubbleInput } from './bubbleInput'

const CHECKBOX_NAME = 'OkuCheckbox'

const [createCheckboxProvider, createCheckboxScope] = createProvideScope(CHECKBOX_NAME)

type CheckboxInjectValue = {
  state: Ref<CheckedState>
  disabled?: Ref<boolean | undefined>
}

export const [CheckboxProvider, useCheckboxInject]
  = createCheckboxProvider<CheckboxInjectValue>(CHECKBOX_NAME)

export type CheckboxNaviteElement = Omit<OkuElement<'button', true>, 'checked' | 'defaultChecked'>
export type CheckboxElement = HTMLButtonElement

export interface CheckboxProps extends PrimitiveProps {
  modelValue?: CheckedState
  checked?: CheckedState
  defaultChecked?: CheckedState
  required?: boolean
  scopeCheckbox?: Scope
  name?: string
  disabled?: boolean
  value?: string
}

export type CheckboxEmits = {
  'update:modelValue': [checked: CheckedState]
  'checkedChange': [checked: CheckedState]
  'keydown': [event: KeyboardEvent]
  'click': [event: MouseEvent]
}

export const checkboxProps = {
  props: {
    modelValue: {
      type: [Boolean, String, Number, undefined] as PropType<CheckedState>,
      default: undefined,
    },
    checked: {
      type: [Boolean, String, Number, undefined] as PropType<CheckedState>,
      default: undefined,
    },
    defaultChecked: {
      type: [Boolean, String, undefined] as PropType<boolean | 'indeterminate' | undefined>,
      default: undefined,
    },
    required: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    name: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    disabled: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    value: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (checked: CheckedState) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'checkedChange': (checked: CheckedState) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'keydown': (event: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'click': (event: MouseEvent) => true,
  },
}

const checkboxDisplayName = 'OkuCheckbox'

const Checkbox = defineComponent({
  name: checkboxDisplayName,
  components: { OkuBubbleInput },
  inheritAttrs: false,
  props: {
    ...checkboxProps.props,
    ...scopeCheckboxProps,
    ...primitiveProps,
  },
  emits: checkboxProps.emits,
  setup(props, { attrs, slots, emit }) {
    const {
      modelValue: _modelValue,
      scopeOkuCheckbox,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      ...checkboxProps
    } = toRefs(props)

    const _reactive = reactive(checkboxProps)
    const reactiveCheckboxProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const buttonRef = ref<HTMLButtonElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(buttonRef, forwardedRef)

    const hasConsumerStoppedPropagationRef = ref(false)

    const modelValue = useModel(props, 'modelValue')
    const proxyChecked = computed({
      get: () => modelValue.value !== undefined ? modelValue.value : checkedProp.value !== undefined ? checkedProp.value : undefined,
      set: () => {
      },
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyChecked.value),
      defaultProp: computed(() => defaultChecked.value),
      onChange: (result: any) => {
        modelValue.value = result
        emit('checkedChange', result)
      },
      initialValue: false,
    })

    const initialCheckedStateRef = ref(state.value)

    const isFormControl = computed(() => {
      return Boolean(buttonRef.value?.closest('form')) || false
    })

    watchEffect(() => {
      const form = buttonRef.value?.form
      if (form) {
        const reset = () => updateValue(initialCheckedStateRef.value)
        form.addEventListener('reset', reset)
        return () => form.removeEventListener('reset', reset)
      }
    })

    CheckboxProvider({
      scope: scopeOkuCheckbox.value,
      state,
      disabled,
    })

    const originalReturn = () =>
      [h(Primitive.button, {
        'type': 'button',
        'role': 'checkbox',
        'aria-checked': computed(() => isIndeterminate(state.value) ? 'mixed' : state.value).value as any,
        'aria-required': required.value,
        'data-state': computed(() => getState(state.value)).value,
        'data-disabled': disabled.value ? '' : undefined,
        'disabled': disabled.value,
        'value': value.value,
        'asChild': props.asChild,
        ...mergeProps(attrs, reactiveCheckboxProps),
        'ref': composedRefs,
        'onKeydown': composeEventHandlers<KeyboardEvent>((e) => {
          emit('keydown', e)
        }, (event) => {
          // According to WAI ARIA, Checkboxes don't activate on enter keypress
          if (event.key === 'Enter')
            event.preventDefault()
        }),
        'onClick': composeEventHandlers<MouseEvent>((e) => {
          emit('click', e)
        }, (event) => {
          updateValue(isIndeterminate(state.value) ? true : !state.value)

          if (isFormControl.value) {
            // hasConsumerStoppedPropagationRef.value = event.isPropagationStopped()
            // if checkbox is in a form, stop propagation from the button so that we only propagate
            // one click event (from the input). We propagate changes from an input so that native
            // form validation works and form events reflect checkbox updates.
            if (!hasConsumerStoppedPropagationRef.value)
              event.stopPropagation()
          }
        }),
      }, {
        default: () => slots.default?.(),
      }), isFormControl.value && h(
        OkuBubbleInput,
        {
          bubbles: computed(() => !hasConsumerStoppedPropagationRef.value).value,
          name: name.value,
          value: value.value,
          checked: state.value,
          required: required.value,
          control: buttonRef.value,
          disabled: disabled.value,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          style: { transform: 'translateX(-100%)' },
        },
      )]

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuCheckbox = Checkbox as typeof Checkbox &
(new () => {
  $props: CheckboxNaviteElement
})

export {
  createCheckboxScope,
}
