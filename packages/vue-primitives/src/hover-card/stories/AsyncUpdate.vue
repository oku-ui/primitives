<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue'
import { useRef } from '../../hooks/index.ts'
import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from '../index.ts'
import CardContentPlaceholder from './CardContentPlaceholder.vue'
import './styles.css'

const open = shallowRef(false)
const contentLoaded = shallowRef(false)
const timerRef = useRef(0)

function handleOpenChange(v: boolean) {
  clearTimeout(timerRef.current)

  if (v) {
    timerRef.current = window.setTimeout(() => {
      contentLoaded.value = true
    }, 500)
  }
  else {
    contentLoaded.value = false
  }

  open.value = v
}

onBeforeUnmount(() => {
  clearTimeout(timerRef.current)
})
</script>

<template>
  <div :style="{ padding: '50px', display: 'flex', justifyContent: 'center' }">
    <HoverCardRoot :open="open" @update:open="handleOpenChange">
      <HoverCardTrigger href="/" class="hoverCard_triggerClass">
        trigger
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent class="hoverCard_contentClass" :side-offset="5">
          <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" />
          <CardContentPlaceholder v-if="contentLoaded" />
          <span v-else>Loading...</span>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>
  </div>
</template>
