<script setup lang="ts">
import { OkuScrollArea, OkuScrollAreaCorner, OkuScrollAreaScrollbar, OkuScrollAreaThumb, OkuScrollAreaViewport } from '@oku-ui/scroll-area'

defineProps({
  animated: {
    type: Boolean,
    default: false,
  },
  vertical: {
    type: Boolean,
    default: true,
  },
  horizontal: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <OkuScrollArea class="scroll-area" :style="{ width: '200px', height: '200px' }">
    <OkuScrollAreaViewport class="scroll-area-viewport">
      <slot />
    </OkuScrollAreaViewport>

    <OkuScrollAreaScrollbar v-if="vertical" class="scrollbar" orientation="vertical">
      <OkuScrollAreaThumb :class="animated ? 'animated-thumb' : 'thumb'" />
    </OkuScrollAreaScrollbar>

    <OkuScrollAreaScrollbar v-if="horizontal" class="scrollbar" orientation="horizontal">
      <OkuScrollAreaThumb :class="animated ? 'animated-thumb' : 'thumb'" />
    </OkuScrollAreaScrollbar>

    <OkuScrollAreaCorner class="corner" />
  </OkuScrollArea>
</template>
