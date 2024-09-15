<script setup lang="ts">
import { MenuSubContent } from '../menu/index.ts'

defineOptions({
  name: 'ContextMenuSubContent',
})

const style = {
  '--radix-context-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
  '--radix-context-menu-content-available-width': 'var(--radix-popper-available-width)',
  '--radix-context-menu-content-available-height': 'var(--radix-popper-available-height)',
  '--radix-context-menu-trigger-width': 'var(--radix-popper-anchor-width)',
  '--radix-context-menu-trigger-height': 'var(--radix-popper-anchor-height)',
}
</script>

<template>
  <MenuSubContent :style="style">
    <slot />
  </MenuSubContent>
</template>
