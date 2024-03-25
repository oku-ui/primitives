<script setup lang="ts">
import { type RadioEmits, type RadioProps, provideRadioContext } from './Radio'
import { computed, shallowRef, toRef, useAttrs } from 'vue'
import { getState } from './utils'
import { RADIO_NAME } from './constants'
import { composeEventHandlers } from '@oku-ui/utils'
import BubbleInput from './BubbleInput.vue'
import { Primitive } from '@oku-ui/primitive'
import { usePrimitiveElement } from '@oku-ui/use-composable'

defineOptions({
  name: RADIO_NAME,
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RadioProps>(), {
  checked: false,
  value: 'on',
  is: 'button',
})

const emit = defineEmits<RadioEmits>()
const attrs = useAttrs()

const hasConsumerStoppedPropagation = shallowRef(false)
const [buttonRef, setForwardRef] = usePrimitiveElement<HTMLButtonElement>()
const isFormControl = computed(() => {
  return buttonRef.value ? Boolean(buttonRef.value.closest('form')) : false
})

const handleClick = composeEventHandlers((event: MouseEvent) => {
  emit('click', event)
}, (event) => {
  // radios cannot be unchecked so we only communicate a checked state
  if (!props.checked)
    emit('check')
  if (isFormControl.value) {
    // TODO: check `isPropagationStopped`
    // https://github.com/jquery/jquery/blob/063831b6378d518f9870ec5c4f1e7d5d16e04f36/src/event.js#L636
    // hasConsumerStoppedPropagationRef.value = event.isPropagationStopped()
    // if radio is in a form, stop propagation from the button so that we only propagate
    // one click event (from the input). We propagate changes from an input so that native
    // form validation works and form events reflect radio updates.
    if (!hasConsumerStoppedPropagation.value)
      event.stopPropagation()
  }
})

provideRadioContext({
  checked: toRef(props, 'checked'),
  disabled: toRef(props, 'disabled'),
  scope: props.scopeOkuRadio,
})

defineExpose({
  $el: buttonRef,
})
</script>

<template>
  <Primitive
    :is="is"
    :ref="setForwardRef"
    :as-child="asChild"
    type="button"
    role="radio"
    aria-checked="checked"
    :data-state="getState(checked)"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    :value="value"
    :required="required"
    :name="name"
    v-bind="attrs"
    @click="handleClick"
  >
    <slot />
  </Primitive>

  <BubbleInput
    v-if="isFormControl"
    :control="buttonRef"
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
