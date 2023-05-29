import { createProvideScope } from '@oku-ui/provide'
import type { PropType, Ref } from 'vue'
import { Transition, defineComponent, h, onMounted, ref, toRefs, watch, watchEffect } from 'vue'

import { composeEventHandlers } from '@oku-ui/utils'
import { useControllableRef, usePrevious, useRef, useSize } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'

import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'

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

type BubbleInputElement = ElementType<'input'>

interface BubbleInputProps extends PrimitiveProps {
  checked: CheckedState
  control: HTMLElement | null
  bubbles: boolean
}

const BubbleInput = defineComponent({
  name: 'BubbleInput',
  inheritAttrs: false,
  props: {
    checked: {
      type: [Boolean, 'indeterminate'] as PropType<boolean | 'indeterminate'>,
      default: false,
    },
    control: {
      type: Object as PropType<HTMLElement | null>,
      default: null,
    },
    bubbles: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { attrs }) {
    const { ...inputAttrs } = attrs as BubbleInputElement
    const { checked, control, bubbles } = props
    const _ref = ref<HTMLInputElement>()
    const prevChecked = usePrevious(checked)
    const controlSize = useSize(control)

    onMounted(() => {
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
    })

    return () =>
      h('input', {
        'type': 'checkbox',
        'aria-hidden': true,
        'defaultChecked': isIndeterminate(checked) ? false : checked,
        ...inputAttrs,
        'tabIndex': -1,
        'ref': _ref,
        'style': {
          ...inputAttrs.style as any,
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

const [createCheckboxProvider, _createCheckboxScope] = createProvideScope(CHECKBOX_NAME)

type CheckedState = boolean | 'indeterminate'

type CheckboxInjectValue = {
  state: Ref<CheckedState>
  disabled?: boolean
}

const [CheckboxProvider, useCheckboxInject]
  = createCheckboxProvider<CheckboxInjectValue>(CHECKBOX_NAME)

type CheckboxElement = ElementType<'button'>

interface CheckboxProps extends PrimitiveProps {
  checked?: CheckedState
  defaultChecked?: CheckedState
  required?: boolean
  onCheckedChange?(checked: CheckedState): void
  scopeCheckbox?: Scope
}

const checkboxDisplayName = 'OkuCheckbox'
const Checkbox = defineComponent({
  name: checkboxDisplayName,
  components: { BubbleInput },
  inheritAttrs: false,
  props: {
    checked: {
      type: [Boolean, 'indeterminate'] as PropType<boolean | 'indeterminate'>,
      default: undefined,
    },
    defaultChecked: {
      type: [Boolean, 'indeterminate'] as PropType<boolean | 'indeterminate'>,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: undefined,
    },
    onCheckedChange: Function as PropType<(checked: CheckedState) => void>,
    scopeCheckbox: {
      type: Object as unknown as PropType<Scope>,
      required: false,
      default: undefined,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { checked: checkedProp, scopeCheckbox, defaultChecked, onCheckedChange, required } = toRefs(props)

    const { _ref: buttonRef, refEl: buttonRefEl } = useRef<HTMLButtonElement>()

    expose({
      innerRef: buttonRefEl,
    })

    const {
      name,
      disabled,
      value = 'on',
      ...checkboxProps
    } = attrs as CheckboxElement

    const hasConsumerStoppedPropagationRef = ref(false)

    const isFormControl = buttonRefEl.value ? Boolean(buttonRefEl.value.closest('form')) : true
    const { state } = useControllableRef({
      prop: checkedProp.value,
      defaultProp: defaultChecked.value,
      onChange: onCheckedChange.value,
    })

    const initialCheckedStateRef = ref()

    onMounted(() => {
      initialCheckedStateRef.value = state.value
    })

    watch([buttonRefEl, state], () => {
      const form = buttonRefEl.value?.form
      if (form) {
        const reset = () => (state.value = initialCheckedStateRef.value)
        form.addEventListener('reset', reset)
        return () => form.removeEventListener('reset', reset)
      }
    })

    CheckboxProvider({
      scope: scopeCheckbox.value as Scope,
      state: state as Ref<CheckedState>,
      disabled: disabled as boolean,
    })

    const originalReturn = () =>
      [h(Primitive.button, {
        'type': 'button',
        'role': 'checkbox',
        'aria-checked': isIndeterminate(state.value as any) ? 'mixed' : state.value as any,
        'aria-required': required.value,
        'data-state': getState(state.value as any),
        'data-disabled': disabled ? '' : undefined,
        'disabled': disabled,
        'value': value,
        ...checkboxProps,
        'ref': buttonRef,
        'onKeyDown': composeEventHandlers(checkboxProps.onKeydown, (event) => {
          // According to WAI ARIA, Checkboxes don't activate on enter keypress
          if (event.key === 'Enter')
            event.preventDefault()
        }),
        'onClick': composeEventHandlers(checkboxProps.onClick, (event) => {
          state.value = isIndeterminate(state.value as any) ? true : !(state.value as any)
          if (isFormControl) {
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
      isFormControl && h(
        BubbleInput,
        {
          control: buttonRefEl.value,
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

    return originalReturn as unknown as {
      innerRef: Ref<CheckboxElement>
    }
  },
})

type CheckboxIndicatorElement = ElementType<'span'>

interface CheckboxIndicatorProps extends PrimitiveProps {
  forceMount?: true
}

const INDICATOR_NAME = 'CheckboxIndicator'

const CheckboxIndicator = defineComponent({
  name: 'CheckboxIndicator',
  components: { Transition },
  props: {
    scopeCheckbox: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
    forceMount: Boolean,
  },
  setup(props, { attrs, expose, slots }) {
    const { scopeCheckbox, forceMount } = toRefs(props)
    const { ...indicatorProps } = attrs as CheckboxIndicatorElement
    const innerRef = ref<CheckboxIndicatorElement>()
    expose({
      innerRef,
    })

    const context = useCheckboxInject(INDICATOR_NAME, scopeCheckbox.value)

    const originalReturn = () => h(Transition, {}, {
      default: () => (forceMount.value || isIndeterminate(context.value.state.value) || context.value.state.value === true)
        ? h(Primitive.span, {
          'data-state': getState(context.value.state.value),
          'data-disabled': context.value.disabled ? '' : undefined,
          ...indicatorProps,
          'style': { pointerEvents: 'none', ...attrs.style as any },
        },
        {
          default: () => slots.default?.(),
        },
        )
        : null,
    })

    return originalReturn as unknown as {
      innerRef: Ref<HTMLButtonElement>
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _OkuCheckboxProps = MergeProps<CheckboxProps, CheckboxElement>
type _OkuCheckboxIndicatorProps = MergeProps<CheckboxIndicatorProps, CheckboxIndicatorElement>

type CheckboxRef = RefElement<typeof OkuCheckbox>
type CheckboxIndicatorRef = RefElement<typeof OkuCheckboxIndicator>

const OkuCheckbox = Checkbox as typeof Checkbox & (new () => { $props: _OkuCheckboxProps })
const OkuCheckboxIndicator = CheckboxIndicator as typeof CheckboxIndicator & (new () => { $props: _OkuCheckboxIndicatorProps })

export {
  OkuCheckbox,
  OkuCheckboxIndicator,
}

export type {
  CheckboxProps,
  CheckboxIndicatorProps,
  CheckboxElement,
  CheckboxIndicatorElement,
  BubbleInputProps,
  CheckboxRef,
  CheckboxIndicatorRef,
}
