/* eslint-disable vue/one-component-per-file */
import { createProvideScope } from '@oku-ui/provide'
import type { ComponentPublicInstance, Ref } from 'vue'
import { Transition, computed, defineComponent, h, onMounted, ref, watchEffect } from 'vue'

// import { composeEventHandlers } from '@oku-ui/primitive';
import { useControllableRef } from '@oku-ui/use-controllable-ref'

import { usePrevious } from '@oku-ui/use-previous'
import { useSize } from '@oku-ui/use-size'
import { Primitive } from '@oku-ui/primitive'
import type { ComponentPropsWithoutRef, ElementRef } from '@oku-ui/primitive'

import type { Scope } from '@oku-ui/provide'

function isIndeterminate(checked?: CheckedState): checked is 'indeterminate' {
  return checked === 'indeterminate'
}

function getState(checked: CheckedState) {
  return isIndeterminate(checked) ? 'indeterminate' : checked ? 'checked' : 'unchecked'
}

/* -------------------------------------------------------------------------------------------------
 * Checkbox
 * ----------------------------------------------------------------------------------------------- */

type InputProps = ComponentPropsWithoutRef<'input'>
interface BubbleInputProps extends Omit<InputProps, 'checked'> {
  checked: CheckedState
  control: HTMLElement | null
  bubbles: boolean
}

const BubbleInput = defineComponent({
  name: 'BubbleInput',
  inheritAttrs: false,
  setup(_, { attrs }) {
    const { control, checked, bubbles = true, ...inputProps } = attrs as unknown as BubbleInputProps
    const _ref = ref<HTMLInputElement>()
    const prevChecked = usePrevious(checked)
    const controlSize = useSize(control)

    watchEffect(() => {
      const input = _ref.value!
      const inputProto = window.HTMLInputElement.prototype
      const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'checked') as PropertyDescriptor
      const setChecked = descriptor.set

      if (prevChecked !== checked && setChecked) {
        const event = new Event('click', { bubbles })
        input.indeterminate = isIndeterminate(checked)
        setChecked.call(input, isIndeterminate(checked) ? false : checked)
        input.dispatchEvent(event)
      }
    })

    return () =>
      h('input', {
        'type': 'checkbox',
        'aria-hidden': true,
        'defaultChecked': isIndeterminate(checked) ? false : checked,
        ...inputProps,
        'tabIndex': -1,
        'ref': _ref,
        'style': {
          ...attrs.style as any,
          ...controlSize,
          position: 'absolute',
          pointerEvents: 'none',
          opacity: 0,
          margin: 0,
        },
      })
  },
})

const CHECKBOX_NAME = 'Checkbox'

type ScopedProps<P> = P & { __scopeCheckbox?: Scope }
const [createCheckboxProvider, _createCheckboxScope] = createProvideScope(CHECKBOX_NAME)

type CheckedState = boolean | 'indeterminate'

type CheckboxInjectValue = {
  state: Ref<CheckedState>
  disabled?: boolean
}

const [CheckboxProvider, useCheckboxInject]
  = createCheckboxProvider<CheckboxInjectValue>(CHECKBOX_NAME)

type CheckboxElement = ElementRef<typeof Primitive.button>
type PrimitiveButtonProps = ComponentPropsWithoutRef<typeof Primitive.button>
interface CheckboxProps extends Omit<PrimitiveButtonProps, 'checked' | 'defaultChecked'> {
  checked?: CheckedState
  defaultChecked?: CheckedState
  required?: boolean
  onCheckedChange?(checked: CheckedState): void
}
const checkboxDisplayName = 'OkuCheckbox'
const Checkbox = defineComponent({
  name: checkboxDisplayName,
  components: { BubbleInput },
  inheritAttrs: false,
  setup(_, { attrs, slots, expose }) {
    const innerRef = ref<ComponentPublicInstance>()
    const _innerRef = computed(() => innerRef.value?.$el)

    expose({
      innerRef: _innerRef as Ref<CheckboxElement>,
    })

    const {
      __scopeCheckbox,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = 'on',
      onCheckedChange,
      ...checkboxProps
    } = attrs as ScopedProps<CheckboxProps>

    const _button = computed<HTMLButtonElement>(() => _innerRef.value)
    const hasConsumerStoppedPropagationRef = ref(false)

    const isFormControl = _button.value ? Boolean(_button.value.closest('form')) : true
    const [checked, setChecked] = useControllableRef({
      prop: checkedProp,
      defaultProp: defaultChecked,
      onChange: onCheckedChange,
    })

    const initialCheckedStateRef = ref()
    onMounted(() => {
      initialCheckedStateRef.value = checked.value
    })
    watchEffect(() => {
      const form = _button.value?.form
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.value)
        form.addEventListener('reset', reset)
        return () => form.removeEventListener('reset', reset)
      }
    })

    CheckboxProvider({
      scope: __scopeCheckbox as Scope,
      state: checked as Ref<CheckedState>,
      disabled: disabled as boolean,
    })
    const originalReturn = () =>
      [h(Primitive.button, {
        'type': 'button',
        'role': 'checkbox',
        'aria-checked': isIndeterminate(checked.value as any) ? 'mixed' : checked.value as any,
        'aria-required': required,
        'data-state': getState(checked.value as any),
        'data-disabled': disabled ? '' : undefined,
        'disabled': disabled,
        'value': value,
        ...checkboxProps,
        'ref': innerRef,
        'onKeyDown': (event: KeyboardEvent) => {
        // According to WAI ARIA, Checkboxes don't activate on enter keypress
          if (event.key === 'Enter')
            event.preventDefault()
        },
        'onClick': (event: MouseEvent) => {
          setChecked((prevChecked) => {
            return (isIndeterminate(prevChecked) ? true : !prevChecked)
          })

          if (isFormControl) {
            // hasConsumerStoppedPropagationRef.value = event.isPropagationStopped()
            //   // if checkbox is in a form, stop propagation from the button so that we only propagate
            //   // one click event (from the input). We propagate changes from an input so that native
            // form validation works and form events reflect checkbox updates.
            if (!hasConsumerStoppedPropagationRef.value)
              event.stopPropagation()
          }
        },
      },
      slots.default?.(),
      ), isFormControl && h(
        BubbleInput,
        {
          control: _button.value,
          bubbles: !hasConsumerStoppedPropagationRef.value,
          name,
          value,
          checked: checked.value,
          required,
          disabled,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          style: { transform: 'translateX(-100%)' },
        },
      ),
      ]

    return originalReturn as unknown as {
      innerRef: Ref<CheckboxElement>
    }
  },
})

type ChecknoxIndicatorElement = ElementRef<typeof Primitive.span>
type PrimitiveSpanProps = ComponentPropsWithoutRef<typeof Primitive.span>
interface CheckboxIndicatorProps extends PrimitiveSpanProps {
  forceMount?: true
}

const INDICATOR_NAME = 'CheckboxIndicator'

const CheckboxIndicator = defineComponent({
  name: 'CheckboxIndicator',
  components: { Transition },
  setup(_, { attrs, expose, slots }) {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = attrs as ScopedProps<CheckboxIndicatorProps>
    const innerRef = ref<ChecknoxIndicatorElement>()
    expose({
      innerRef,
    })

    const context = useCheckboxInject(INDICATOR_NAME, __scopeCheckbox)

    const originalReturn = () => h(Transition, [
      (forceMount || isIndeterminate(context.value.state.value) || context.value.state.value === true)
        ? h(Primitive.span, {
          'data-state': getState(context.value.state.value),
          'data-disabled': context.value.disabled ? '' : undefined,
          ...indicatorProps,
          'style': { pointerEvents: 'none', ...attrs.style as any },
        },
        slots.default?.(),
        )
        : null,
    ])

    return originalReturn as unknown as {
      innerRef: Ref<ChecknoxIndicatorElement>
    }
  },
})

const OkuCheckbox = Checkbox as typeof Checkbox & (new () => { $props: ScopedProps<CheckboxProps> })
const OkuCheckboxIndicator = CheckboxIndicator as typeof CheckboxIndicator & (new () => { $props: ScopedProps<CheckboxIndicatorProps> })

type OkuCheckboxElement = Omit<InstanceType<typeof Checkbox>, keyof ComponentPublicInstance>
type OkuCheckboxIndicatorElement = Omit<InstanceType<typeof CheckboxIndicator>, keyof ComponentPublicInstance>
export {
  OkuCheckbox,
  OkuCheckboxIndicator,
}

export type {
  CheckboxProps,
  CheckboxIndicatorProps,
  OkuCheckboxElement,
  OkuCheckboxIndicatorElement,
}
