<script setup lang="ts">
import { computed, shallowRef, useAttrs } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/composeEventHandlers.ts'
import { isFunction } from '../utils/is.ts'
import { useTemplateElRef } from '../hooks/index.ts'
import { type RadioEmits, type RadioProps, getState, provideRadioContext } from './Radio.ts'
import BubbleInput from './BubbleInput.vue'

defineOptions({
  name: 'Radio',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RadioProps>(), {
  as: 'button',
  value: 'on',
  checked: false,
})
const emit = defineEmits<RadioEmits>()
const attrs = useAttrs()
const elRef = shallowRef<HTMLButtonElement>()
const setElRef = useTemplateElRef(elRef)

const hasConsumerStoppedPropagation = shallowRef(false)
// We set this to true by default so that events bubble to forms without JS (SSR)
const isFormControl = computed(() => elRef.value ? Boolean(elRef.value.closest('form')) : true)

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

  isFunction(attrs.onClick) && attrs.onClick(event)
}, (event) => {
  // radios cannot be unchecked so we only communicate a checked state
  if (!props.checked)
    emit('update:checked', true)
  if (isFormControl.value) {
    hasConsumerStoppedPropagation.value = event.isPropagationStopped()
    // if radio is in a form, stop propagation from the button so that we only propagate
    // one click event (from the input). We propagate changes from an input so that native
    // form validation works and form events reflect radio updates.
    if (!hasConsumerStoppedPropagation.value)
      event.stopPropagation()
  }
})

provideRadioContext({
  checked() {
    return props.checked
  },
  disabled() {
    return props.disabled
  },
})

defineExpose({
  $el: elRef,
})
</script>

<template>
  <Primitive
    :ref="setElRef"
    :as="as"
    :as-child="asChild"
    type="button"
    role="radio"
    :aria-checked="checked"
    :data-state="getState(checked)"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    :value="value"
    v-bind="{
      ...attrs,
      onClick,
    }"
  >
    <slot />
  </Primitive>

  <BubbleInput
    v-if="isFormControl"
    :control="elRef"
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
