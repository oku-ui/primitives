<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type SeparatorProps, useSeparator } from './Separator.ts'

defineOptions({
  name: 'Separator',
})

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
})

const separator = useSeparator({
  orientation: props.orientation,
  decorative: props.decorative,
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(separator.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
