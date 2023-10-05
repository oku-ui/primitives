<script setup lang="ts">
import { OkuMenu, OkuMenuAnchor, OkuMenuContent, OkuMenuPortal } from '@oku-ui/menu'

defineProps({
  open: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <OkuMenu :open="open" :modal="false" @open-change="() => { }">
    <!-- inline-block allows anchor to move when rtl changes on document -->
    <OkuMenuAnchor :style="{ display: 'inline-block' }" />
    <OkuMenuPortal>
      <OkuMenuContent class="content" align="start" @close-auto-focus="(event: FocusEvent) => event.preventDefault()">
        <slot />
      </OkuMenuContent>
    </OkuMenuPortal>
  </OkuMenu>
</template>
