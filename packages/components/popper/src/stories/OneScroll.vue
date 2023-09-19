<script setup lang="ts">
import {
  OkuPopper,
  OkuPopperAnchor,
  OkuPopperArrow,
  OkuPopperContent,
} from '@oku-ui/popper'
import { ref } from 'vue'

const scrollContainer1 = ref<HTMLDivElement | null>(null)
</script>

<template>
  <div
    :style="{
      display: 'flex',
      gap: '100px',
    }"
  >
    <div>
      <h1>In scrolling container</h1>
      <div
        ref="scrollContainer1" :style="{
          width: '400px',
          height: '600px',
          overflow: 'auto',
          border: '1px solid black',
        }"
      >
        <div
          :style="{
            height: '2000px',
          }"
        >
          <OkuPopper>
            <OkuPopperAnchor class="anchorClass small">
              9
            </OkuPopperAnchor>
            <OkuPopperContent
              class="contentClass small" :side-offset="5" hide-when-detached
              :collision-boundary="scrollContainer1"
            >
              <OkuPopperArrow class="arrowClass" :width="10" :height="5" />
              9
            </OkuPopperContent>
          </OkuPopper>
        </div>
      </div>
    </div>
  </div>
</template>
