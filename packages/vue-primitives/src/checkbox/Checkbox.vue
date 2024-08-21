<script setup lang="ts">
import { computed, shallowRef, useAttrs, watchEffect } from 'vue'
import { useControllableState } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers, forwardRef } from '../utils/vue.ts'
import { isFunction } from '../utils/is.ts'
import { type CheckboxEmits, type CheckboxProps, provideCheckboxContext } from './Checkbox.ts'
import { getState, isIndeterminate } from './utils.ts'
import BubbleInput from './BubbleInput.vue'

defineOptions({
  name: 'Checkbox',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CheckboxProps>(), {
  checked: undefined,
  value: 'on',
  as: 'button',
})
const emit = defineEmits<CheckboxEmits>()
const attrs = useAttrs()
const $el = shallowRef<HTMLButtonElement>()
const forwardedRef = forwardRef($el)

const hasConsumerStoppedPropagation = shallowRef(false)
// We set this to true by default so that events bubble to forms without JS (SSR)
const isFormControl = computed(() => $el.value ? Boolean($el.value.closest('form')) : true)
const checked = useControllableState(props, v => emit('update:checked', v), 'checked', props.defaultChecked)

const initialCheckedStateRef = checked.value

watchEffect((onCleanup) => {
  const form = $el.value?.form
  if (form) {
    const reset = () => {
      checked.value = initialCheckedStateRef
    }

    form.addEventListener('reset', reset)

    onCleanup(() => form.removeEventListener('reset', reset))
  }
})

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  if (isFunction(attrs.onKeydown))
    attrs.onKeydown(event)
}, (event) => {
  // According to WAI ARIA, Checkboxes don't activate on enter keypress
  if (event.key === 'Enter')
    event.preventDefault()
})

type CliclEvent = Event & { _stopPropagation: Event['stopPropagation'], _isPropagationStopped: boolean, isPropagationStopped: () => boolean }
const onClick = composeEventHandlers<CliclEvent>((event) => {
  event._stopPropagation = event.stopPropagation
  event._isPropagationStopped = false
  event.stopPropagation = function stopPropagation() {
    this._isPropagationStopped = true
    event._stopPropagation()
  }
  event.isPropagationStopped = function isPropagationStopped() {
    return this._isPropagationStopped
  }

  if (isFunction(attrs.onClick))
    attrs.onClick(event)
}, (event) => {
  checked.value = isIndeterminate(checked.value) ? true : !checked.value
  if (isFormControl.value) {
    hasConsumerStoppedPropagation.value = event.isPropagationStopped()
    // if checkbox is in a form, stop propagation from the button so that we only propagate
    // one click event (from the input). We propagate changes from an input so that native
    // form validation works and form events reflect checkbox updates.
    if (!hasConsumerStoppedPropagation.value)
      event.stopPropagation()
  }
})

provideCheckboxContext({
  disabled() {
    return props.disabled
  },
  state: checked,
})

defineExpose({
  $el,
})
</script>

<template>
  <Primitive
    :ref="forwardedRef"
    :as="as"
    :as-child="asChild"
    type="button"
    role="checkbox"
    :aria-checked="isIndeterminate(checked) ? 'mixed' : checked"
    :aria-required="attrs.required"
    :data-state="getState(checked)"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    :value="value"
    v-bind="{
      ...attrs,
      onKeydown,
      onClick,
    }"
  >
    <slot />
  </Primitive>

  <BubbleInput
    v-if="isFormControl"
    :control="$el"
    :bubbles="!hasConsumerStoppedPropagation"
    :name="name"
    :value="value"
    :checked="checked"
    :required="required"
    :disabled="disabled"
    :style="{
      transform: 'translateX(-100%)',
    }"
  />
</template>
