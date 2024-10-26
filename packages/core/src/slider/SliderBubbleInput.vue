<script setup lang="ts">
import type { SliderBubbleInputProps } from './SliderBubbleInput.ts'
import { watch } from 'vue'

defineOptions({
  name: 'SliderBubbleInput',
  inheritAttrs: false,
})

const props = defineProps<SliderBubbleInputProps>()

let input: HTMLInputElement | undefined
function setElRef(vNode: any) {
  input = vNode
}

// TODO: Check if this is the correct way to create a change event
// const initValue = props.value

// Bubble checked change to parents (e.g form change event)
watch(() => props.value, (value, prevValue) => {
  if (!input)
    return

  const inputProto = window.HTMLInputElement.prototype
  const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'value') as PropertyDescriptor
  const setValue = descriptor.set

  if (prevValue !== value && setValue) {
    // TODO: Check if this is the correct way to create a change event
    const inputEvent = new Event('input', { bubbles: true })
    const changeEvent = new Event('change', { bubbles: true })
    setValue.call(input, value)
    input.dispatchEvent(inputEvent)
    input.dispatchEvent(changeEvent)
  }
})

/**
 * We purposefully do not use `type="hidden"` here otherwise forms that
 * wrap it will not be able to access its value via the FormData API.
 *
 * We purposefully do not add the `value` attribute here to allow the value
 * to be set programatically and bubble to any parent form `onChange` event.
 * Adding the `value` will cause React to consider the programatic
 * dispatch a duplicate and it will get swallowed.
 */
</script>

<template>
  <input :ref="setElRef" :name="name" type="number" style="display: none" :value="value">
</template>
