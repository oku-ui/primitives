<script setup lang="ts">
import { type ComponentPublicInstance, shallowRef } from 'vue'
import { Slot } from '../slot/index.ts'
import type { PrimitiveProps } from './Primitive.model'

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

defineExpose({
  $el,
})
</script>

<template>
  <component
    :is="asChild ? Slot : as" :ref="(el: Element | ComponentPublicInstance | null) => {
      $el = ((el as ComponentPublicInstance)?.$el ?? el) || undefined
    }"
  >
    <slot />
  </component>
</template>
