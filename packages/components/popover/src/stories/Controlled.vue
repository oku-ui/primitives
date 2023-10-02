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
      <OkuPopoverTrigger class="popover-trigger">
        {{ open ? 'close' : 'open' }}
      </OkuPopoverTrigger>
      <OkuPopoverPortal>
        <OkuPopoverContent class="popover-content">
          <OkuPopoverClose class="popover-close">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>
  </div>
</template>
