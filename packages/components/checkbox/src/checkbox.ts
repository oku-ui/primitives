import { createProvideScope } from '@oku-ui/provide'
import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'

import { composeEventHandlers } from '@oku-ui/utils'
import { useComposedRefs, useControllable, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'

import type { ComponentPublicInstanceRef, ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'

import type { Scope } from '@oku-ui/provide'
import { type CheckedState, getState, isIndeterminate } from './utils'
import { OkuBubbleInput } from './bubbleInput'

const CHECKBOX_NAME = 'OkuCheckbox'

const [createCheckboxProvider, _createCheckboxScope] = createProvideScope(CHECKBOX_NAME)

type CheckboxInjectValue = {
  state: Ref<CheckedState>
  disabled?: boolean
}

export const [CheckboxProvider, useCheckboxInject]
  = createCheckboxProvider<CheckboxInjectValue>(CHECKBOX_NAME)

type CheckboxElement = ElementType<'button'>
export type _CheckboxEl = HTMLButtonElement

interface CheckboxProps extends IPrimitiveProps {
  checked?: CheckedState
  defaultChecked?: CheckedState
  required?: boolean
  onCheckedChange?(checked: CheckedState): void
  scopeCheckbox?: Scope
}

const checkboxDisplayName = 'OkuCheckbox'
const Checkbox = defineComponent({
  name: checkboxDisplayName,
  components: { OkuBubbleInput },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Boolean, String, Number] as PropType<
        boolean | string | number | undefined | 'indeterminate'
      >,
      default: undefined,
    },
    checked: {
      type: [Boolean, String, Number] as PropType<
        boolean | string | number | undefined | 'indeterminate'
      >,
      default: undefined,
    },
    defaultChecked: {
      type: [Boolean, String] as PropType<boolean | 'indeterminate'>,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: undefined,
    },
    scopeCheckbox: {
      type: Object as unknown as PropType<Scope>,
      required: false,
      default: undefined,
    },
  },
  emits: ['update:checked', 'update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const { checked: checkedProp, scopeCheckbox, defaultChecked, required } = toRefs(props)

    const buttonRef = ref<ComponentPublicInstanceRef<HTMLButtonElement> | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(buttonRef, forwardedRef)

    const {
      name,
      disabled,
      value = 'on',
      ...checkboxProps
    } = attrs as CheckboxElement

    const hasConsumerStoppedPropagationRef = ref(false)

    const { state, updateValue } = useControllable({
      prop: computed(() => checkedProp.value),
      defaultProp: computed(() => defaultChecked.value),
      onChange: (result: any) => {
        emit('update:checked', result)
        emit('update:modelValue', result)
      },
    })

    const initialCheckedStateRef = ref(state.value)

    const isFormControl = computed(() => {
      return Boolean(buttonRef.value?.$el.closest('form')) || false
    })

    watchEffect(() => {
      const form = buttonRef.value?.$el.form
      if (form) {
        const reset = () => updateValue(initialCheckedStateRef.value)
        form.addEventListener('reset', reset)
        return () => form.removeEventListener('reset', reset)
      }
    })

    CheckboxProvider({
      scope: scopeCheckbox.value as Scope,
      state,
      disabled: disabled as boolean,
    })

    const originalReturn = () =>
      [h(Primitive.button, {
        'type': 'button',
        'role': 'checkbox',
        'aria-checked': isIndeterminate(state.value) ? 'mixed' : state.value as any,
        'aria-required': required.value,
        'data-state': getState(state.value as any),
        'data-disabled': disabled ? '' : undefined,
        'disabled': disabled,
        'value': value,
        ...checkboxProps,
        'ref': composedRefs,
        'onKeyDown': composeEventHandlers(checkboxProps.onKeydown, (event) => {
          // According to WAI ARIA, Checkboxes don't activate on enter keypress
          if (event.key === 'Enter')
            event.preventDefault()
        }),
        'onClick': composeEventHandlers(checkboxProps.onClick, (event) => {
          const data = isIndeterminate(checkedProp.value) ? true : !checkedProp.value
          if (state.value === data)
            updateValue(!data)
          else if (state.value === 'indeterminate')
            updateValue(!data)
          else
            updateValue(data)

          if (isFormControl.value) {
            // hasConsumerStoppedPropagationRef.value.current = event.isPropagationStopped()
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
          bubbles: !hasConsumerStoppedPropagationRef.value,
          name,
          value,
          checked: state.value,
          required,
          disabled,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          style: { transform: 'translateX(-100%)' },
        },
      ),
      ]

    return originalReturn
  },
})

type CheckboxIndicatorElement = ElementType<'span'>

interface CheckboxIndicatorProps extends IPrimitiveProps {
  forceMount?: true
}

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _OkuCheckboxProps = MergeProps<CheckboxProps, CheckboxElement>

type InstanceCheckboxType = InstanceTypeRef<typeof OkuCheckbox, _CheckboxEl>

const OkuCheckbox = Checkbox as typeof Checkbox & (new () => { $props: _OkuCheckboxProps })

export {
  OkuCheckbox,
}

export type {
  CheckboxProps,
  CheckboxIndicatorProps,
  CheckboxElement,
  CheckboxIndicatorElement,
  InstanceCheckboxType,
}
