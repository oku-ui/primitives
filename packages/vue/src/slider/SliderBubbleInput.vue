<script lang="ts">
export interface BubbleInputProps {
  value: number
}

</script>

<script setup lang="ts">
import { useComponentRef, usePrevious } from '@oku-ui/use-composable'

import { defineOptions, toRef, watchEffect, withDefaults } from 'vue'

defineOptions({
  name: 'OkuSliderBubbleInput',
})

const props = withDefaults(defineProps<BubbleInputProps>(), {
  value: undefined,
})

const { componentRef, currentElement } = useComponentRef<HTMLInputElement | null>()

const prevValue = usePrevious(toRef(props, 'value'))

watchEffect(() => {
  const input = currentElement.value
  const inputProto = window.HTMLInputElement.prototype
  const descriptor = Object.getOwnPropertyDescriptor(inputProto, 'value') as PropertyDescriptor
  const setValue = descriptor.set
  if (prevValue.value !== props.value && setValue) {
    const event = new Event('input', { bubbles: true })
    setValue.call(input, props.value)
    input?.dispatchEvent(event)
  }
})

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <input
    ref="componentRef"
    :style="{
      display: 'none',
    }"
    defaultValue="props.value"
  >
</template>
