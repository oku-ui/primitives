<script setup lang="ts">
import { type ComponentPublicInstance, shallowRef } from 'vue'
import type { PrimitiveProps } from './Primitive.model'
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
