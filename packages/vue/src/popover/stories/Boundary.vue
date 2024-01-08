<script setup lang="ts">
import {
  OkuPopover,
  OkuPopoverContent,
  OkuPopoverPortal,
  OkuPopoverTrigger,
} from '@oku-ui/popover'
import { ref } from 'vue'

const boundary = ref<HTMLDivElement | null>(null)
</script>

<template>
  <div
    ref="boundary"
    :style="{
      border: '3px dashed red',
      width: '200px',
      height: '200px',
    }"
  >
    <OkuPopover>
      <OkuPopoverTrigger as-child>
        <button>open</button>
      </OkuPopoverTrigger>
      <OkuPopoverPortal>
        <OkuPopoverContent
          :style="{
            boxSizing: 'border-box',
            borderRadius: '8px',
            padding: '8px',
            color: 'white',
            backgroundColor: 'black',
            width: 'var(--oku-popper-available-width)',
            height: 'var(--oku-popper-available-height)',
          }"
          :side-offset="5"
          :collision-boundary="boundary"
        >
          out of bound out of bound out of bound out of bound out of bound out of bound out of
          bound out of bound out of bound
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>
  </div>
</template>
