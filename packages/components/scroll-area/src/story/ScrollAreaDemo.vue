<script setup lang="ts">
import Basic from './Basic.vue'
import Resizable from './Resizable.vue'
import ContentChange from './ContentChange.vue'
import Animated from './Animated.vue'
import Chromatic from './Chromatic.vue'
import ChromaticDynamicContent from './ChromaticDynamicContent.vue'

withDefaults(defineProps<IScrollAreaProps>(), {})

export interface IScrollAreaProps {
  template?: 'Basic' | 'Resizable' | 'ContentChange' | 'Animated' | 'Chromatic' | 'ChromaticDynamicContentBeforeLoaded' | 'ChromaticDynamicContentAfterLoaded'
  allshow?: boolean
}

const SCROLLBAR_SIZE = '8px'

const RECOMMENDED_CSS__SCROLLAREA = {
  width: '100%',
  height: '100%',
}

const RECOMMENDED_CSS__SCROLLAREA__VIEWPORT = {
  width: '100%',
  height: '100%',
}

const RECOMMENDED_CSS__SCROLLBAR = {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
}

const RECOMMENDED_CSS__SCROLLBAR__THUMB = {
  flex: 1,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  before: {
    content: '',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: '44px',
    minHeight: '44px',
  },
}
</script>

<template>
  <div>
    <template v-if="template === 'Basic' || allshow">
      <Basic />
    </template>

    <template v-if="template === 'Resizable' || allshow">
      <Resizable />
    </template>

    <template v-if="template === 'ContentChange' || allshow">
      <ContentChange />
    </template>

    <template v-if="template === 'Animated' || allshow">
      <Animated />
    </template>

    <template v-if="template === 'Chromatic' || allshow">
      <Chromatic />
    </template>

    <template v-if="template === 'ChromaticDynamicContentBeforeLoaded' || allshow">
      <ChromaticDynamicContent />
    </template>

    <template v-if="template === 'ChromaticDynamicContentAfterLoaded' || allshow">
      <ChromaticDynamicContent />
    </template>
  </div>
</template>

<style>
.scroll-area {
  width: v-bind('RECOMMENDED_CSS__SCROLLAREA.width');
  height: v-bind('RECOMMENDED_CSS__SCROLLAREA.height');
  border: 1px solid black;
}

.scroll-area-viewport {
  width: v-bind('RECOMMENDED_CSS__SCROLLAREA__VIEWPORT.width');
  height: v-bind('RECOMMENDED_CSS__SCROLLAREA__VIEWPORT.height');
}

.scrollbar {
  display: v-bind('RECOMMENDED_CSS__SCROLLBAR.display');
  user-select: v-bind('RECOMMENDED_CSS__SCROLLBAR.userSelect');
  touch-action: v-bind('RECOMMENDED_CSS__SCROLLBAR.touchAction');
  transition: background 160ms ease-out;
  padding: 2px;
  background: rgba(0, 0, 0, 0.3);
}

.scrollbar:hover {
  background: rgba(0, 0, 0, 0.5);
}

.scrollbar[data-orientation="vertical"] {
  width: v-bind(SCROLLBAR_SIZE);
}

.scrollbar[data-orientation="horizontal"] {
  flex-direction: column;
  height: v-bind(SCROLLBAR_SIZE);
}

.thumb {
  flex: v-bind('RECOMMENDED_CSS__SCROLLBAR__THUMB.flex');
  position: v-bind('RECOMMENDED_CSS__SCROLLBAR__THUMB.position');
  background: black;
  border-radius: v-bind(SCROLLBAR_SIZE);
}

.thumb::before {
  content: v-bind('RECOMMENDED_CSS__SCROLLBAR__THUMB.before.content');
  position: v-bind('RECOMMENDED_CSS__SCROLLBAR__THUMB.before.position');
  top: v-bind('RECOMMENDED_CSS__SCROLLBAR__THUMB.before.top');
  left: v-bind('RECOMMENDED_CSS__SCROLLBAR__THUMB.before.left');
  transform: v-bind('RECOMMENDED_CSS__SCROLLBAR__THUMB.before.transform');
  width: v-bind('RECOMMENDED_CSS__SCROLLBAR__THUMB.before.width');
  height: v-bind('RECOMMENDED_CSS__SCROLLBAR__THUMB.before.height');
  min-width: v-bind('RECOMMENDED_CSS__SCROLLBAR__THUMB.before.minWidth');
  min-height: v-bind('RECOMMENDED_CSS__SCROLLBAR__THUMB.before.minHeight');
}

.corner {
  background: rgba(0, 0, 0, 0.3);
  position: relative;
}

.corner::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: black;
  width: v-bind(SCROLLBAR_SIZE);
  height: v-bind(SCROLLBAR_SIZE);
  border-radius: v-bind(SCROLLBAR_SIZE);
}

@keyframes fadeIn {
  from {
    transform: scale(0.2);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(0.2);
    opacity: 0;
  }
}

.animated-thumb[data-state="visible"] {
  animation: fadeIn 300ms ease;
}

.animated-thumb[data-state="hidden"] {
  animation: fadeOut 300ms ease;
}
</style>
