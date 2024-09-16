<script setup lang="ts">
import { MenuSubContent } from '../menu/index.ts'

defineOptions({
  name: 'DropdownMenuSubContent',
})

const style = {
  '--radix-dropdown-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
  '--radix-dropdown-menu-content-available-width': 'var(--radix-popper-available-width)',
  '--radix-dropdown-menu-content-available-height': 'var(--radix-popper-available-height)',
  '--radix-dropdown-menu-trigger-width': 'var(--radix-popper-anchor-width)',
  '--radix-dropdown-menu-trigger-height': 'var(--radix-popper-anchor-height)',
}
</script>

<template>
  <MenuSubContent :style="style">
    <slot />
  </MenuSubContent>
</template>
