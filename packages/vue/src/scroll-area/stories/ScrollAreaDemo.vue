<script setup lang="ts">
import Animated from './Animated.vue'
import Basic from './Basic.vue'
import Chromatic from './Chromatic.vue'
import ChromaticDynamicContent from './ChromaticDynamicContent.vue'
import ContentChange from './ContentChange.vue'
import Resizable from './Resizable.vue'

withDefaults(defineProps<IScrollAreaProps>(), {})

export interface IScrollAreaProps {
  template?: 'Basic' | 'Resizable' | 'ContentChange' | 'Animated' | 'Chromatic' | 'ChromaticDynamicContentBeforeLoaded' | 'ChromaticDynamicContentAfterLoaded'
  allshow?: boolean
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
