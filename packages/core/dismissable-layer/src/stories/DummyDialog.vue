<script setup lang="ts">
import { ref } from 'vue'
import { OkuFocusGuards } from '@oku-ui/focus-guards'
import { OkuPortal } from '@oku-ui/portal'
import { OkuFocusScope } from '@oku-ui/focus-scope'
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { useScrollLock } from '@oku-ui/use-composable'

withDefaults(defineProps<{ openLabel?: string; closeLabel?: string }>(), {
  openLabel: 'Open',
  closeLabel: 'Close',
})

const dismissableLayerRef = ref<HTMLElement | null>(null)
useScrollLock(dismissableLayerRef, true)

const open = ref(false)
</script>

<template>
  <button type="button" @click="open = !open">
    {{ openLabel }}
  </button>

  <OkuFocusGuards v-if="open">
    <OkuPortal as-child>
      <div
        :style="{
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
          pointerEvents: 'none',
          backgroundColor: 'black',
          opacity: 0.2,
        }"
      />
    </OkuPortal>

    <OkuPortal as-child>
      <OkuDismissableLayer
        ref="dismissableLayerRef"
        as-child
        disable-outside-pointer-events
        @dismiss="open = false"
      >
        <OkuFocusScope
          trapped
          :style="{
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'start',
            gap: '10px',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            minWidth: '300px',
            minHeight: '200px',
            padding: '40px',
            borderRadius: '10px',
            backgroundColor: 'white',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
          }"
        >
          <slot />

          <button type="button" @click="open = false">
            {{ closeLabel }}
          </button>

          <input type="text" defaultValue="hello world" class="border">
        </OkuFocusScope>
      </OkuDismissableLayer>
    </OkuPortal>
  </OkuFocusGuards>
</template>
