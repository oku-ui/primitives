<script setup lang="ts">
import './styles.css'
import { PopoverAnchor, PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from '../index.ts'
</script>

<template>
  <div>
    <PopoverRoot>
      <PopoverAnchor
        :style="{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '250px',
          padding: '20px',
          margin: '100px',
          backgroundColor: '#eee',
        }"
      >
        Item  <PopoverTrigger class="popover_triggerClass">
          open
        </PopoverTrigger>
      </PopoverAnchor>

      <PopoverPortal>
        <PopoverContent
          class="popover_contentClass"
          side="right"
          :side-offset="1"
          align="start"
          :style="{ borderRadius: 0, width: '200px', height: '100px' }"
        >
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>
