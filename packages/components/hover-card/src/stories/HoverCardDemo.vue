<script setup lang="ts">
import Basic from './Basic.vue'
import ContainTextSelection from './ContainTextSelection.vue'
import AsyncUpdate from './AsyncUpdate.vue'
import CustomDurations from './CustomDurations.vue'
import Controlled from './Controlled.vue'
import Layerable from './Layerable.vue'
import Animated from './Animated.vue'
import ForcedMount from './ForcedMount.vue'
import Nested from './Nested.vue'
import NonPortal from './NonPortal.vue'
import WithSlottedTrigger from './WithSlottedTrigger.vue'
import WithSlottedContent from './WithSlottedContent.vue'

export interface OkuHoverCardProps {
  template: 'basic' | 'ContainTextSelection' |
  'AsyncUpdate' | 'CustomDurations' | 'Controlled' |
  'Layerable' | 'Animated' | 'ForcedMount' | 'Nested' |
  'NonPortal' | 'WithSlottedTrigger' | 'WithSlottedContent'
  allshow?: boolean
}

withDefaults(defineProps<OkuHoverCardProps>(), {
  template: 'basic',
})
</script>

<template>
  <div v-if="template === 'basic' || allshow" class="flex flex-col justify-center">
    <Basic />
  </div>
  <div v-if="template === 'ContainTextSelection' || allshow" class="flex flex-col justify-center">
    <ContainTextSelection />
  </div>
  <div v-if="template === 'AsyncUpdate' || allshow" class="flex flex-col justify-center">
    <AsyncUpdate />
  </div>
  <div v-if="template === 'CustomDurations' || allshow" class="flex flex-col justify-center">
    <CustomDurations />
  </div>
  <div v-if="template === 'Controlled' || allshow" class="flex flex-col justify-center">
    <Controlled />
  </div>
  <div v-if="template === 'Layerable' || allshow" class="flex flex-col justify-center">
    <Layerable />
  </div>
  <div v-if="template === 'Animated' || allshow" class="flex flex-col justify-center">
    <Animated />
  </div>
  <div v-if="template === 'ForcedMount' || allshow" class="flex flex-col justify-center">
    <ForcedMount />
  </div>
  <div v-if="template === 'Nested' || allshow" class="flex flex-col justify-center">
    <Nested />
  </div>
  <div v-if="template === 'NonPortal' || allshow" class="flex flex-col justify-center">
    <NonPortal />
  </div>
  <div v-if="template === 'WithSlottedTrigger' || allshow" class="flex flex-col justify-center">
    <WithSlottedTrigger />
  </div>
  <div v-if="template === 'WithSlottedContent' || allshow" class="flex flex-col justify-center">
    <WithSlottedContent />
  </div>
</template>
