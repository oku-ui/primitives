<script setup lang="ts">
import { computed, onWatcherCleanup, shallowRef, watchEffect } from 'vue'
import { useControllableState, useForwardElement, useRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { type CheckboxRootEmits, type CheckboxRootProps, type CheckboxRootSlots, provideCheckboxContext } from './CheckboxRoot.ts'
import { getState, isIndeterminate } from './utils.ts'

defineOptions({
  name: 'Checkbox',
})

const props = withDefaults(defineProps<CheckboxRootProps>(), {
  checked: undefined,
  defaultChecked: false,
  value: 'on',
  as: 'button',
})
const emit = defineEmits<CheckboxRootEmits>()

defineSlots<CheckboxRootSlots>()

const control = shallowRef<HTMLButtonElement>()
// const elRef = useRef<HTMLButtonElement>()
const forwardElement = useForwardElement<HTMLButtonElement>(control)

const bubbles = useRef(true)
// We set this to true by default so that events bubble to forms without JS (SSR)
const isFormControl = computed(() => control.value ? Boolean(control.value.closest('form')) : true)
const checked = useControllableState(props, 'checked', v => emit('update:checked', v), props.defaultChecked)

const initialCheckedStateRef = checked.value

watchEffect(() => {
  const form = control.value?.form
  if (!form)
    return

  const reset = () => {
    checked.value = initialCheckedStateRef
  }

  form.addEventListener('reset', reset)

  onWatcherCleanup(() => {
    form.removeEventListener('reset', reset)
  })
})

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('keydown', event)
}, (event) => {
  // According to WAI ARIA, Checkboxes don't activate on enter keypress
  if (event.key === 'Enter')
    event.preventDefault()
})

const onClick = composeEventHandlers<MouseEvent>((event) => {
  emit('click', event)
}, (event) => {
  checked.value = isIndeterminate(checked.value) ? true : !checked.value
  if (isFormControl.value) {
    bubbles.current = !event.cancelBubble
    // if checkbox is in a form, stop propagation from the button so that we only propagate
    // one click event (from the input). We propagate changes from an input so that native
    // form validation works and form events reflect checkbox updates.
    if (bubbles.current)
      event.stopPropagation()
  }
})

provideCheckboxContext({
  disabled() {
    return props.disabled
  },
  state: checked,
})
</script>

<template>
  <Primitive
    :ref="forwardElement"
    :as="as"
    type="button"
    role="checkbox"
    :aria-checked="isIndeterminate(checked) ? 'mixed' : checked"
    :aria-required="required"
    :data-state="getState(checked)"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    :value="value"
    @keydown="onKeydown"
    @click="onClick"
  >
    <slot
      :is-form-control="isFormControl"
      :input="{
        control,
        bubbles,
        name,
        value,
        checked,
        required,
        disabled,
      }"
    />
  </Primitive>
</template>
