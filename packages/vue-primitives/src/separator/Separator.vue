<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import type { SeparatorProps } from './Separator.ts'

defineOptions({
  name: 'Separator',
})

withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
})
</script>

<template>
  <Primitive
    :data-orientation="orientation"
    v-bind="{
      ...(
        decorative ? {
          role: 'none',
        } : {
          'aria-orientation': orientation === 'vertical' ? orientation : undefined,
          'role': 'separator',
        }
      ),
    }"
  >
    <slot />
  </Primitive>
</template>
