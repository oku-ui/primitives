<script setup lang="ts">
import { watch } from 'vue'
import { useCheckboxContext } from './CheckboxRoot.ts'
import { isIndeterminate } from './utils.ts'

defineOptions({
  name: 'CheckboxBubbleInput',
})

const bubbleInput = useCheckboxContext('CheckboxBubbleInput').bubbleInput
bubbleInput.isFormControl.value = true

let input: HTMLInputElement | undefined
function setElRef(vNode: any) {
  input = vNode
}

// TODO: Check if this is the correct way to create a change event
// const initChecked = isIndeterminate(props.checked) ? false : props.checked

// Bubble checked change to parents (e.g form change event)
watch(bubbleInput.checked, (checked, prevChecked) => {
  if (!input)
    return

  const inputProto = window.HTMLInputElement.prototype
  const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'checked') as PropertyDescriptor
  const setChecked = descriptor.set

  if (prevChecked !== checked && setChecked) {
    // TODO: Check if this is the correct way to create a change event
    const event = new Event('change', { bubbles: bubbleInput.bubbles.value })
    input.indeterminate = isIndeterminate(checked)
    setChecked.call(input, isIndeterminate(checked) ? false : checked)
    input.dispatchEvent(event)
  }
})
</script>

<template>
  <input
    :ref="setElRef"
    type="checkbox"
    aria-hidden="true"
    :name="bubbleInput.name?.()"
    :required="bubbleInput.required()"
    tabindex="-1"
    :checked="isIndeterminate(bubbleInput.checked.value) ? false : bubbleInput.defaultChecked"
    :style="{
      position: 'absolute',
      pointerEvents: 'none',
      opacity: 0,
      margin: 0,
    }"
  >
</template>
