<script setup lang="ts">
import { shallowRef, toRef, watch } from 'vue'
import type { BubbleInputProps } from './BubbleInput'
import { BUBBLE_INPUT_NAME } from './constants'
import { usePrevious, useSize } from '@oku-ui/use-composable'

defineOptions({
  name: BUBBLE_INPUT_NAME,
})

const props = withDefaults(defineProps<BubbleInputProps>(), {
  bubbles: true,
})

const inputRef = shallowRef<HTMLInputElement>()
const prevChecked = usePrevious(toRef(props, 'checked'))
const controlSize = useSize(() => props.control)

watch([prevChecked, () => props.checked, () => props.bubbles], () => {
  if (!inputRef.value)
    return

  const input = inputRef.value
  const inputProto = window.HTMLInputElement.prototype
  const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'checked')
  const setChecked = descriptor?.set

  if (prevChecked.value !== props.checked && setChecked) {
    const event = new Event('change', { bubbles: props.bubbles })
    setChecked.call(input, props.checked)
    input.dispatchEvent(event)
  }
})
</script>

<template>
  <input
    ref="inputRef"
    type="radio"
    aria-hidden="true"
    :aria-checked="checked"
    :checked="checked"
    tabindex="-1"
    :style="{
      ...controlSize,
      position: 'absolute',
      pointerEvents: 'none',
      opacity: 0,
      margin: '0px',
    }"
  >
</template>
