<script lang="ts">
import type { CheckedState } from './Checkbox.vue'

export interface BubbleInputProps {
  checked: CheckedState
  control: HTMLElement | null
  bubbles: boolean
}

</script>

<script setup lang="ts">
import { useComponentRef, usePrevious, useSize } from '@oku-ui/use-composable'
import { computed, defineOptions, toRefs, watchEffect, withDefaults } from 'vue'

import { isIndeterminate } from './utils'

defineOptions({
  name: 'OkuBubbleInput',
})

const props = withDefaults(defineProps<BubbleInputProps>(), {
})

const { componentRef, currentElement } = useComponentRef<HTMLInputElement | null>()

const { checked, control } = toRefs(props)

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
    input.indeterminate = isIndeterminate(props.checked)
    setChecked.call(input, isIndeterminate(props.checked) ? false : props.checked)
    input.dispatchEvent(event)
  }
})

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <input
    ref="componentRef"
    type="checkbox"
    :defaultChecked="isIndeterminate(checked) ? false : checked"
    tabindex="-1"
    :style=" {
      ...$attrs.style as any,
      ...controlSize,
      position: 'absolute',
      pointerEvents: 'none',
      opacity: 0,
      margin: '0px',
    }"
  >
</template>
