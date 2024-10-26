<script setup lang="ts">
import { ScrollAreaContent, ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '../index.ts'
import './styles.css'

withDefaults(defineProps<{
  animated?: boolean
  vertical?: boolean
  horizontal?: boolean
}>(), {
  animated: false,
  vertical: true,
  horizontal: true,
})
</script>

<template>
  <ScrollAreaRoot
    class="scrollArea_scrollAreaClass"
    :style="{
      width: '200px',
      height: '200px',
    }"
  >
    <ScrollAreaViewport class="scrollArea_scrollAreaViewportClass">
      <ScrollAreaContent>
        <slot />
      </ScrollAreaContent>
    </ScrollAreaViewport>

    <ScrollAreaScrollbar v-if="vertical" class="scrollArea_scrollbarClass" orientation="vertical">
      <ScrollAreaThumb class="scrollArea_thumbClass" :class="animated ? 'scrollArea_animatedThumbClass' : undefined" />
    </ScrollAreaScrollbar>

    <ScrollAreaScrollbar v-if="horizontal" class="scrollArea_scrollbarClass" orientation="horizontal">
      <ScrollAreaThumb class="scrollArea_thumbClass" :class="animated ? 'scrollArea_animatedThumbClass' : undefined" />
    </ScrollAreaScrollbar>

    <ScrollAreaCorner class="scrollArea_cornerClass" />
  </ScrollAreaRoot>
</template>

<style>
[data-radix-scroll-area-viewport] {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}
[data-radix-scroll-area-viewport]::-webkit-scrollbar {
  display: none;
}
:where([data-radix-scroll-area-viewport]) {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
:where([data-radix-scroll-area-content]) {
  flex-grow: 1;
}
</style>
