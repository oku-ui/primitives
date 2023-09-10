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
  template: 'Basic' | 'ContainTextSelection' |
  'AsyncUpdate' | 'CustomDurations' | 'Controlled' |
  'Layerable' | 'Animated' | 'ForcedMount' | 'Nested' |
  'NonPortal' | 'WithSlottedTrigger' | 'WithSlottedContent'
  allshow?: boolean
}

withDefaults(defineProps<OkuHoverCardProps>(), {
  template: 'Basic',
})

const templateClass = 'flex flex-col justify-center'
</script>

<template>
  <div v-if="template === 'Basic' || allshow" :class="templateClass">
    <Basic />
  </div>
  <div v-if="template === 'ContainTextSelection' || allshow" :class="templateClass">
    <ContainTextSelection />
  </div>
  <div v-if="template === 'AsyncUpdate' || allshow" :class="templateClass">
    <AsyncUpdate />
  </div>
  <div v-if="template === 'CustomDurations' || allshow" :class="templateClass">
    <CustomDurations />
  </div>
  <div v-if="template === 'Controlled' || allshow" :class="templateClass">
    <Controlled />
  </div>
  <div v-if="template === 'Layerable' || allshow" :class="templateClass">
    <Layerable />
  </div>
  <div v-if="template === 'Animated' || allshow" :class="templateClass">
    <Animated />
  </div>
  <div v-if="template === 'ForcedMount' || allshow" :class="templateClass">
    <ForcedMount />
  </div>
  <div v-if="template === 'Nested' || allshow" :class="templateClass">
    <Nested />
  </div>
  <div v-if="template === 'NonPortal' || allshow" :class="templateClass">
    <NonPortal />
  </div>
  <div v-if="template === 'WithSlottedTrigger' || allshow" :class="templateClass">
    <WithSlottedTrigger />
  </div>
  <div v-if="template === 'WithSlottedContent' || allshow" :class="templateClass">
    <WithSlottedContent />
  </div>
</template>
