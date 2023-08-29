<script setup lang="ts">
import { ref } from 'vue'
import { OkuFocusGuards } from '@oku-ui/focus-guards'
import { OkuPortal } from '@oku-ui/portal'
import { OkuFocusScope } from '@oku-ui/focus-scope'
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { OkuSlot } from '@oku-ui/slot'

withDefaults(defineProps<{ openLabel?: string; closeLabel?: string }>(), {
  openLabel: 'Open',
  closeLabel: 'Close',
})

const open = ref(false)

function toggleOpen() {
  open.value = !open.value
}

function closeLayer() {
  open.value = false
}
</script>

<template>
  <button type="button" @click="toggleOpen">
    {{ openLabel }}
  </button>

  <OkuFocusGuards v-if="open">
    <OkuPortal as-child>
      <div
        :style="{
          'position': 'fixed',
          'top': 0,
          'right': 0,
          'bottom': 0,
          'left': 0,
          'pointer-events': 'none',
          'background': 'black',
          'opacity': 0.2,
        }"
      />
    </OkuPortal>

    <OkuPortal as-child>
      <OkuSlot>
        <OkuDismissableLayer
          as-child
          disable-outside-pointer-events
          @dismiss="closeLayer"
        >
          <OkuFocusScope
            trapped
            :style="{
              'box-sizing': 'border-box',
              'display': 'flex',
              'align-items': 'start',
              'gap': '10px',
              'position': 'fixed',
              'top': '50%',
              'left': '50%',
              'transform': 'translate(-50%, -50%)',
              'min-width': '300px',
              'min-height': '200px',
              'padding': '40px',
              'border-radius': '10px',
              'background': 'white',
              'box-shadow': '0 2px 10px rgba(0, 0, 0, 0.12)',
            }"
          >
            <slot />

            <button type="button" @click="closeLayer">
              {{ closeLabel }}
            </button>

            <input type="text" defaultValue="hello world" class="border">
          </OkuFocusScope>
        </OkuDismissableLayer>
      </OkuSlot>
    </OkuPortal>
  </OkuFocusGuards>
</template>
