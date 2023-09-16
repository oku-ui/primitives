<script setup lang="ts">
import {
  OkuPopover,
  OkuPopoverArrow,
  OkuPopoverClose,
  OkuPopoverContent,
  OkuPopoverPortal,
  OkuPopoverTrigger,
} from '@oku-ui/popover'
import { ref } from 'vue'

const open = ref(false)

function toggle(event: boolean) {
  open.value = event
}
</script>

<template>
  <div
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50vh',
    }"
  >
    <OkuPopover :open="open" @open-change="toggle">
      <OkuPopoverTrigger class="triggerClass">
        {{ open ? 'close' : 'open' }}
      </OkuPopoverTrigger>
      <OkuPopoverPortal>
        <OkuPopoverContent class="contentClass">
          <OkuPopoverClose class="closeClass">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="arrowClass" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>
  </div>
</template>
