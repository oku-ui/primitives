<script setup lang="ts">
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { OkuFocusGuards } from '@oku-ui/focus-guards'
import { OkuFocusScope } from '@oku-ui/focus-scope'
import { OkuPortal } from '@oku-ui/portal'
import { useComponentRef, useScrollLock } from '@oku-ui/use-composable'
import { ref } from 'vue'

withDefaults(defineProps<{ openLabel?: string, closeLabel?: string }>(), {
  openLabel: 'Open',
  closeLabel: 'Close',
})

const { componentRef, currentElement } = useComponentRef<HTMLElement | null>()

useScrollLock(currentElement, true)

const open = ref(false)
</script>

<template>
  <button type="button" @click="open = true">
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
        ref="componentRef"
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
