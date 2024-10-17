<script setup lang="ts">
import type { ToolbarSeparatorProps } from './ToolbarSeparator.ts'
import { Primitive } from '@oku-ui/primitive'
import { useToolbarContext } from './ToolbarRoot.ts'

defineOptions({
  name: 'ToolbarSeparator',
})

const props = defineProps<ToolbarSeparatorProps>()

const context = useToolbarContext('ToolbarSeparator')

const decorativeAttrs = { role: 'none' }

const orientation = () => context.orientation() === 'horizontal' ? 'vertical' : 'horizontal'

function attrs() {
  if (props.decorative)
    return decorativeAttrs

  const orientation = context.orientation()

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
