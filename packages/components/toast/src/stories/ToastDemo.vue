<script setup lang="ts">
import Styled from './Styled.vue'
import Controlled from './Controlled.vue'
import Promise from './Promise.vue'
import KeyChange from './KeyChange.vue'
import PauseResumeProps from './PauseResumeProps.vue'
import Animated from './Animated.vue'
import Cypress from './Cypress.vue'
import Chromatic from './Chromatic.vue'

export interface IToastProps {
  template?: 'Styled' | 'Controlled' | 'FromDialog' | 'Promise' | 'KeyChange' | 'PauseResumeProps' | 'Animated' | 'Cypress' | 'Chromatic'
  allShow?: boolean
}

withDefaults(defineProps<IToastProps>(), {})
</script>

<template>
  <div>
    <template v-if="template === 'Styled' || allShow">
      <Styled />
    </template>

    <template v-if="template === 'Controlled' || allShow">
      <Controlled />
    </template>
    <!-- TODO: Needs OkuDialog Component -->
    <!-- <template v-if="template === 'FromDialog' || allShow">
      <FromDialog />
    </template> -->

    <template v-if="template === 'Promise' || allShow">
      <Promise />
    </template>

    <template v-if="template === 'KeyChange' || allShow">
      <KeyChange />
    </template>

    <template v-if="template === 'PauseResumeProps' || allShow">
      <PauseResumeProps />
    </template>

    <template v-if="template === 'Animated' || allShow">
      <Animated />
    </template>

    <template v-if="template === 'Cypress' || allShow">
      <Cypress />
    </template>

    <template v-if="template === 'Chromatic' || allShow">
      <Chromatic />
    </template>
  </div>
</template>

<style lang="postcss">
@import './toast.css'
</style>
