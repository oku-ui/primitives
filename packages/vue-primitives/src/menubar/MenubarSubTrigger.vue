<script setup lang="ts">
import { MenuSubTrigger } from '../menu/index.ts'

defineOptions({
  name: 'MenubarSubTrigger',
})
</script>

<template>
  <MenuSubTrigger data-radix-menubar-subtrigger="">
    <slot />
  </MenuSubTrigger>
</template>
