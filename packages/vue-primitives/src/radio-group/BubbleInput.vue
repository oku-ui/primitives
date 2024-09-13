<script setup lang="ts">
import type { BubbleInputProps } from './BubbleInput.ts'
import { watch } from 'vue'
import { useSize } from '../hooks/index.ts'

defineOptions({
  name: 'BubbleInput',
})

const props = withDefaults(defineProps<BubbleInputProps>(), {
  checked: undefined,
  control: undefined,
  bubbles: true,
})
let input: HTMLInputElement | undefined
function setElRef(vNode: any) {
  input = vNode
}

const controlSize = useSize(() => props.control)
// TODO: Check if this is the correct way to create a change event
// const initChecked = isIndeterminate(props.checked) ? false : props.checked

// Bubble checked change to parents (e.g form change event)
watch(() => props.checked, (checked) => {
  if (!input)
    return

  const inputProto = window.HTMLInputElement.prototype
  const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'checked') as PropertyDescriptor
  const setChecked = descriptor.set

  if (checked && setChecked) {
    // TODO: Check if this is the correct way to create a change event
    const event = new Event('change', { bubbles: props.bubbles })
    setChecked.call(input, checked)
    input.dispatchEvent(event)
  }
})
</script>

<template>
  <input
    :ref="setElRef"
    type="radio"
    aria-hidden="true"
    tabindex="-1"
    :checked="checked"
    :style="{
      width: `${controlSize?.width || 0}px`,
      height: `${controlSize?.height || 0}px`,
      position: 'absolute',
      pointerEvents: 'none',
      opacity: 0,
      margin: 0,
      transform: 'translateX(-100%)',
    }"
  >
</template>
