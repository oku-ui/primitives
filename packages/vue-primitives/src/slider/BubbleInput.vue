<script setup lang="ts">
import type { BubbleInputProps } from './BubbleInput.ts'
import { watch } from 'vue'

defineOptions({
  name: 'BubbleInput',
})

const props = defineProps<BubbleInputProps>()

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
    const event = new Event('change', { bubbles: true })
    setValue.call(input, value)
    input.dispatchEvent(event)
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
