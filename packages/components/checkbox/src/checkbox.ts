import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs, useModel, watchEffect } from 'vue'
import { reactiveOmit, useComposedRefs, useControllable, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { Primitive } from '@oku-ui/primitive'
import { OkuBubbleInput } from './bubble-input'
import { getState, isIndeterminate } from './utils'
import { CHECKBOX_NAME, checkboxProps, checkboxProvider, scopeCheckboxProps } from './props'
import type { CheckboxEmits, CheckboxNativeElement } from './props'

const Checkbox = defineComponent({
  name: CHECKBOX_NAME,
  components: {
    OkuBubbleInput,
  },
  inheritAttrs: false,
  props: {
    ...checkboxProps.props,
    ...scopeCheckboxProps,
  },
  emits: checkboxProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuCheckbox,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value,
      ...checkboxProps
    } = toRefs(props)

    const _reactive = reactive(checkboxProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const buttonRef = ref<HTMLButtonElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, buttonRef)
    const hasConsumerStoppedPropagationRef = ref(false)
    // We set this to true by default so that events bubble to forms without JS (SSR)
    const isFormControl = computed(() => buttonRef.value instanceof HTMLElement ? Boolean(buttonRef.value.closest('form')) : false)

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
        emit('update:modelValue', result)
      },
      initialValue: false,
    })

    const initialCheckedStateRef = ref(state.value)

    watchEffect((onInvalidate) => {
      const form = buttonRef.value?.form
      if (form) {
        const reset = () => updateValue(initialCheckedStateRef.value)
        form.addEventListener('reset', reset)

        onInvalidate(() => form.removeEventListener('reset', reset))
      }
    })

    checkboxProvider({
      scope: scopeOkuCheckbox.value,
      state,
      disabled,
    })

    return () => [
      h(Primitive.button, {
        'type': 'button',
        'role': 'checkbox',
        'aria-checked': computed(() => isIndeterminate(state.value) ? 'mixed' : state.value).value,
        'aria-required': required.value,
        'data-state': computed(() => getState(state.value)).value,
        'data-disabled': disabled.value ? '' : undefined,
        'disabled': disabled.value,
        'value': value.value,
        ...mergeProps(attrs, otherProps, emits),
        'ref': composedRefs,
        'onKeydown': composeEventHandlers<CheckboxEmits['keydown'][0]>((event) => {
          emit('keydown', event)
        }, (event) => {
          // According to WAI ARIA, Checkboxes don't activate on enter keypress
          if (event.key === 'Enter')
            event.preventDefault()
        }),
        'onClick': composeEventHandlers<CheckboxEmits['click'][0]>((event) => {
          emit('click', event)
        }, (event) => {
          updateValue(isIndeterminate(state.value) ? true : !state.value)

          if (isFormControl.value) {
            // TODO: isPropagationStopped() is not supported in vue
            // hasConsumerStoppedPropagationRef.value = event.isPropagationStopped()

            // if checkbox is in a form, stop propagation from the button so that we only propagate
            // one click event (from the input). We propagate changes from an input so that native
            // form validation works and form events reflect checkbox updates.
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
        checked: state.value,
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

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuCheckbox = Checkbox as typeof Checkbox &
  (new () => { $props: CheckboxNativeElement })
