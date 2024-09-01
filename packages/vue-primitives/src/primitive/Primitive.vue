<script setup lang="ts">
import { shallowRef } from 'vue'
import { Slot } from '../slot/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import type { PrimitiveProps } from './Primitive.ts'

defineOptions({
  name: 'Primitive',
})

withDefaults(
  defineProps<PrimitiveProps>(),
  {
    as: 'div',
    asChild: false,
  },
)

const $el = shallowRef<HTMLElement>()

const forwardElement = useForwardElement($el)

defineExpose({
  $el,
})
</script>

<template>
  <component :is="asChild ? Slot : as" :ref="forwardElement">
    <slot />
  </component>
</template>
