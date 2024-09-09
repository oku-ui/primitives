<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { useToolbarContext } from './ToolbarRoot.ts'
import type { ToolbarSeparatorProps } from './ToolbarSeparator.ts'

defineOptions({
  name: 'ToolbarSeparator',
})

defineProps<ToolbarSeparatorProps>()

const context = useToolbarContext('ToolbarSeparator')

const decorativeAttrs = { role: 'none' }

const orientation = () => context.orientation() === 'horizontal' ? 'vertical' : 'horizontal'

function attrs() {
  const orientation = context.orientation()
  if (orientation)
    return decorativeAttrs

  return {
    'aria-orientation': orientation === 'vertical' ? orientation : undefined,
    'role': 'separator',
  }
}
</script>

<template>
  <Primitive
    :data-orientation="orientation()"
    v-bind="attrs()"
  >
    <slot />
  </Primitive>
</template>
