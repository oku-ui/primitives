<script setup lang="ts">
import { OkuMenuPortal, OkuMenuSub, OkuMenuSubContent, OkuMenuSubTrigger } from '@oku-ui/menu'

defineProps({
  heading: {
    type: String,
    default: 'Submenu',
  },
  open: {
    type: Boolean,
    default: true,
  },
  animated: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
})
</script>

<template>
  <OkuMenuSub :open="open" @open-change="() => open">
    <OkuMenuSubTrigger class="menu-sub-trigger menu-item" :disabled="disabled">
      {{ heading }} →
    </OkuMenuSubTrigger>
    <OkuMenuPortal>
      <OkuMenuSubContent class="menu-content" :class="{ 'menu-animated-content': animated }">
        <slot />
      </OkuMenuSubContent>
    </OkuMenuPortal>
  </OkuMenuSub>
</template>
