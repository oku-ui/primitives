<script setup lang="ts">
import { shallowRef } from 'vue'
import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from '../index.ts'
import CardContentPlaceholder from './CardContentPlaceholder.vue'
import './styles.css'

const open = shallowRef(false)
</script>

<template>
  <div :style="{ padding: '50px', display: 'flex', justifyContent: 'center' }">
    <HoverCardRoot v-model:open="open">
      <HoverCardTrigger href="/" class="hoverCard_triggerClass">
        trigger {{ open }}
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent class="hoverCard_contentClass" :side-offset="5">
          <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" />
          <CardContentPlaceholder />
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>
  </div>
</template>
