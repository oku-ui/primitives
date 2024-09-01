<script setup lang="ts">
import { computed, shallowRef, useAttrs, watchEffect } from 'vue'
import { useControllableState, useForwardElement } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { type CheckboxRootEmits, type CheckboxRootProps, type ClickEvent, provideCheckboxContext } from './CheckboxRoot.ts'
import { getState, isIndeterminate } from './utils.ts'
import BubbleInput from './BubbleInput.vue'

defineOptions({
  name: 'Checkbox',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CheckboxRootProps>(), {
  checked: undefined,
  value: 'on',
  as: 'button',
})
const emit = defineEmits<CheckboxRootEmits>()
const attrs = useAttrs()
const $el = shallowRef<HTMLButtonElement>()
const forwardElement = useForwardElement($el)

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
  emit('keydown', event)
}, (event) => {
  // According to WAI ARIA, Checkboxes don't activate on enter keypress
  if (event.key === 'Enter')
    event.preventDefault()
})

const onClick = composeEventHandlers<ClickEvent>((event) => {
  event._stopPropagation = event.stopPropagation
  event._isPropagationStopped = false
  event.stopPropagation = function stopPropagation() {
    this._isPropagationStopped = true
    event._stopPropagation()
  }
  event.isPropagationStopped = function isPropagationStopped() {
    return this._isPropagationStopped
  }

  emit('click', event)
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
    :ref="forwardElement"
    :as="as"
    type="button"
    role="checkbox"
    :aria-checked="isIndeterminate(checked) ? 'mixed' : checked"
    :aria-required="attrs.required"
    :data-state="getState(checked)"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    :value="value"
    v-bind="$attrs"
    @keydown="onKeydown"
    @click="onClick"
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
