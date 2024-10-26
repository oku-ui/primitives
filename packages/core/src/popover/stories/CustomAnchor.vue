<script setup lang="ts">
import { PopoverAnchor, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from '../index.ts'
import './styles.css'
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
        <PopoverTrigger class="popover_triggerClass">
          open
        </PopoverTrigger>
        Item
      </PopoverAnchor>

      <PopoverPortal>
        <PopoverContent
          class="popover_contentClass"
          side="right"
          align="start"
          :style="{ borderRadius: 0, width: '200px', height: '100px' }"
        >
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>
