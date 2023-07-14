import { createProvideScope } from '@oku-ui/provide'
import type { PropType, Ref } from 'vue'
import { Transition, computed, defineComponent, h, onMounted, ref, toRefs, watchEffect } from 'vue'

import { composeEventHandlers } from '@oku-ui/utils'
import { useControllable, usePrevious, useRef, useSize } from '@oku-ui/use-composable'
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
  checked: Ref<CheckedState>
  control: HTMLElement | null
  bubbles: boolean
}

const BubbleInput = defineComponent({
  name: 'BubbleInput',
  inheritAttrs: false,
  props: {
    checked: {
      type: [Boolean, String, Number] as PropType<
        boolean | string | number | undefined | 'indeterminate'
      >,
      default: false,
    },
    control: {
      type: Object as PropType<Ref<HTMLElement | null>>,
      default: null,
    },
    bubbles: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { attrs }) {
    const { ...inputAttrs } = attrs as BubbleInputElement
    const { checked, bubbles, control } = toRefs(props)
    const _ref = ref<HTMLInputElement>()

    const prevChecked = usePrevious(checked)
    const controlSize = useSize(control)

    watchEffect(() => {
      const input = _ref.value!
      const inputProto = window.HTMLInputElement.prototype
      const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'checked') as PropertyDescriptor
      const setChecked = descriptor.set

      if (prevChecked !== checked.value && setChecked) {
        const event = new Event('click', { bubbles: bubbles.value })
        input.indeterminate = isIndeterminate(checked.value)
        setChecked.call(input, isIndeterminate(checked.value) ? false : checked)
        input.dispatchEvent(event)
      }
    })

    return () =>
      h('input', {
        'type': 'checkbox',
        'aria-hidden': true,
        'defaultChecked': isIndeterminate(checked.value) ? false : checked,
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

type CheckedState = boolean | string | number | undefined | 'indeterminate'

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
  setup(props, { attrs, slots, expose, emit }) {
    const { checked: checkedProp, scopeCheckbox, defaultChecked, required } = toRefs(props)

    const { newRef, $el } = useRef<HTMLButtonElement>()

    expose({
      innerRef: $el,
    })

    const {
      name,
      disabled,
      value = 'on',
      ...checkboxProps
    } = attrs as CheckboxElement

    const hasConsumerStoppedPropagationRef = ref(false)

    const isFormControl = ref(false)

    const { state, updateValue } = useControllable({
      prop: computed(() => checkedProp.value),
      defaultProp: computed(() => defaultChecked.value),
      onChange: (result: any) => {
        emit('update:checked', result)
        emit('update:modelValue', result)
      },
    })

    const initialCheckedStateRef = ref()

    onMounted(() => {
      isFormControl.value = Boolean($el.value.closest('form')) || false
      initialCheckedStateRef.value = state.value
    })

    watchEffect(() => {
      const form = newRef.value?.$el.form
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
        'ref': newRef,
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
        BubbleInput,
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
    const { $el, newRef } = useRef<CheckboxIndicatorElement>()
    expose({
      innerRef: $el,
    })

    const context = useCheckboxInject(INDICATOR_NAME, scopeCheckbox.value)

    const originalReturn = () => h(Transition, {}, {
      default: () => (forceMount.value || isIndeterminate(context.value.state.value) || context.value.state.value === true)
        ? h(Primitive.span, {
          'ref': newRef,
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
