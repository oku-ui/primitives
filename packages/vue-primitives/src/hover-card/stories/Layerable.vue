<script setup lang="ts">
import './styles.css'
import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from '../index.ts'
import { DialogClose, DialogContent, DialogRoot, DialogTitle, DialogTrigger } from '../../dialog/index.ts'
import CardContentPlaceholder from './CardContentPlaceholder.vue'
</script>

<template>
  <div :style="{ padding: '50px', display: 'flex', justifyContent: 'center' }">
    <DialogRoot>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent
        :style="{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          border: '1px solid',
          borderRadius: '4px',
          padding: '20px',
        }"
      >
        <DialogTitle>Some dialog title</DialogTitle>
        Some dialog content with a{{ ' ' }}
        <HoverCardRoot>
          <HoverCardTrigger href="/" class="hoverCard_triggerClass">
            trigger
          </HoverCardTrigger>
          <HoverCardPortal>
            <HoverCardContent class="hoverCard_contentClass" :side-offset="5">
              <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" />
              <CardContentPlaceholder />
            </HoverCardContent>
          </HoverCardPortal>
        </HoverCardRoot>{{ ' ' }}
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </DialogRoot>
  </div>
</template>
