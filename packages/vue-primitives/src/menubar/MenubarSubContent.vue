<script setup lang="ts">
import { MenuSubContent } from '../menu/index.ts'

defineOptions({
  name: 'MenubarSubContent',
})

const style = {
  '--radix-menubar-content-transform-origin': 'var(--radix-popper-transform-origin)',
  '--radix-menubar-content-available-width': 'var(--radix-popper-available-width)',
  '--radix-menubar-content-available-height': 'var(--radix-popper-available-height)',
  '--radix-menubar-trigger-width': 'var(--radix-popper-anchor-width)',
  '--radix-menubar-trigger-height': 'var(--radix-popper-anchor-height)',
}
</script>

<template>
  <MenuSubContent data-radix-menubar-content="" :style="style">
    <slot />
  </MenuSubContent>
</template>
