<script setup lang="ts">
import { shallowRef } from 'vue'
import { Slot } from '../slot/index.ts'
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

const elRef = shallowRef<HTMLElement>()

defineExpose({
  $el: elRef,
})
</script>

<template>
  <component
    :is="asChild ? Slot : as"
    :ref="(el: any) => {
      const node = (el?.$el ?? el)
      elRef = node?.hasAttribute ? node : undefined
    }"
  >
    <slot />
  </component>
</template>
