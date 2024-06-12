<script setup lang="ts">
import { type ComponentPublicInstance, shallowRef } from 'vue'
import type { PrimitiveProps } from './Primitive.ts'
import { Slot } from '~/slot/index.ts'

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
  <component :is="asChild ? Slot : as" :ref="(el: any) => elRef = (el?.$el ?? el) || undefined">
    <slot />
  </component>
</template>
