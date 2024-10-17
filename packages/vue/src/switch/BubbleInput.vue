<script lang="ts">
export interface BubbleInputProps {
  checked: boolean
  control: HTMLElement | null
  bubbles: boolean
}
</script>

<script setup lang="ts">
import { useComponentRef, usePrevious, useSize } from '@oku-ui/use-composable'
import { computed, toRefs, watchEffect } from 'vue'

defineOptions({
  name: 'OkuBubbleInput',
})

const props = defineProps<BubbleInputProps>()

const { checked, control } = toRefs(props)

const { componentRef, currentElement } = useComponentRef<HTMLInputElement | null>()
const prevChecked = usePrevious(checked)
const controlSize = computed(() => useSize(control))

// Bubble checked change to parents (e.g form change event)
watchEffect(() => {
  const input = currentElement.value!
  const inputProto = window.HTMLInputElement.prototype
  const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'checked') as PropertyDescriptor
  const setChecked = descriptor.set

  if (prevChecked.value !== props.checked && setChecked) {
    const event = new Event('click', { bubbles: props.bubbles })
    setChecked.call(input, props.checked)
    input.dispatchEvent(event)
  }
})
</script>

<template>
  <input
    ref="componentRef"
    type="checkbox"
    :aria-hidden="true"
    :defaultChecked="checked"
    :tabIndex="-1"
    :style="{
      ...$attrs.style as any,
      ...controlSize,
      position: 'absolute',
      pointerEvents: 'none',
      opacity: 0,
      margin: '0px',
    }"
  >
</template>
