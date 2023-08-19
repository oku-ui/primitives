import { createProvideScope } from '@oku-ui/provide'
import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, ref, toRefs, useModel, watchEffect } from 'vue'

import { composeEventHandlers } from '@oku-ui/utils'
import { useComposedRefs, useControllable, useForwardRef } from '@oku-ui/use-composable'
import { Primitive, primitiveProps } from '@oku-ui/primitive'

import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'

import type { Scope } from '@oku-ui/provide'
import { getState, isIndeterminate, scopeCheckboxProps } from './utils'
import type { CheckedState, ScopeCheckbox } from './utils'
import { OkuBubbleInput } from './bubbleInput'

const CHECKBOX_NAME = 'OkuCheckbox'

const [createCheckboxProvider, createCheckboxScope] = createProvideScope(CHECKBOX_NAME)

type CheckboxInjectValue = {
  state: Ref<CheckedState>
  disabled?: Ref<boolean | undefined>
}

export const [CheckboxProvider, useCheckboxInject]
  = createCheckboxProvider<CheckboxInjectValue>(CHECKBOX_NAME)

export type CheckboxIntrinsicElement = ElementType<'button'>
export type CheckboxElement = HTMLButtonElement

interface CheckboxProps extends PrimitiveProps {
  checked?: CheckedState
  defaultChecked?: CheckedState
  required?: boolean
  onCheckedChange?(checked: CheckedState): void
  scopeCheckbox?: Scope
  name?: string
  disabled?: boolean
  value?: string
}

const checkboxProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<CheckedState>,
    default: undefined,
  },
  checked: {
    type: [Boolean, String, Number] as PropType<CheckedState>,
    default: undefined,
  },
  defaultChecked: {
    type: [Boolean, String] as PropType<boolean | 'indeterminate' | undefined>,
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
}

const checkboxDisplayName = 'OkuCheckbox'

const Checkbox = defineComponent({
  name: checkboxDisplayName,
  components: { OkuBubbleInput },
  inheritAttrs: false,
  props: {
    ...checkboxProps,
    ...scopeCheckboxProps,
    ...primitiveProps,
  },
  emits: ['update:modelValue', 'checkedChange'],
  setup(props, { attrs, slots, emit }) {
    const {
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      name,
      value,
    } = toRefs(props)

    const buttonRef = ref<HTMLButtonElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(buttonRef, forwardedRef)

    const {
      ...checkboxProps
    } = attrs as CheckboxIntrinsicElement

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
        emit('update:modelValue', result)
        emit('checkedChange', result)
      },
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
      scope: props.scopeOkuCheckbox,
      state,
      disabled,
    })

    const originalReturn = () =>
      [h(Primitive.button, {
        'type': 'button',
        'role': 'checkbox',
        'aria-checked': isIndeterminate(state.value) ? 'mixed' : state.value as any,
        'aria-required': required.value,
        'data-state': computed(() => getState(state.value)).value,
        'data-disabled': disabled.value ? '' : undefined,
        'disabled': disabled.value,
        'value': value.value,
        'asChild': props.asChild,
        ...checkboxProps,
        'ref': composedRefs,
        'onKeyDown': composeEventHandlers(checkboxProps.onKeydown, (event) => {
          // According to WAI ARIA, Checkboxes don't activate on enter keypress
          if (event.key === 'Enter')
            event.preventDefault()
        }),
        'onClick': composeEventHandlers(checkboxProps.onClick, (event) => {
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
      },
      {
        default: () => slots.default?.(),
      }),
      isFormControl.value && h(
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
          style: { transform: 'translateX(-100%)' } as CSSStyleDeclaration,
        },
      ),
      ]

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuCheckbox = Checkbox as typeof Checkbox &
(new () => {
  $props: ScopeCheckbox<Partial<CheckboxElement>>
})

export {
  createCheckboxScope,
}

export type {
  CheckboxProps,
}
