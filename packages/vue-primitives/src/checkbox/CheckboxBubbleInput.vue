<script setup lang="ts">
import { watch } from 'vue'
import { useSize } from '../hooks/index.ts'
import { useCheckboxContext } from './CheckboxRoot.ts'
import { isIndeterminate } from './utils.ts'

defineOptions({
  name: 'CheckboxBubbleInput',
})

const bubbleInput = useCheckboxContext('CheckboxBubbleInput').bubbleInput
bubbleInput.isFormControl.current = true

let input: HTMLInputElement | undefined
function setElRef(vNode: any) {
  input = vNode
}

const controlSize = useSize(() => bubbleInput.control.value)
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
    const event = new Event('change', { bubbles: bubbleInput.bubbles.current })
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
    tabindex="-1"
    :checked="isIndeterminate(bubbleInput.checked.value) ? false : bubbleInput.defaultChecked"
    :style="{
      width: `${controlSize?.width || 0}px`,
      height: `${controlSize?.height || 0}px`,
      position: 'absolute',
      pointerEvents: 'none',
      opacity: 0,
      margin: 0,
      // We transform because the input is absolutely positioned but we have
      // rendered it **after** the button. This pulls it back to sit on top
      // of the button.
      transform: 'translateX(-50%) translateY(-50%)',
    }"
  >
</template>
