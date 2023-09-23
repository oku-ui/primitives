<script setup lang="ts">
import {
  OkuPopper,
  OkuPopperAnchor,
  OkuPopperArrow,
  OkuPopperContent,
} from '@oku-ui/popper'
import { OkuPortal } from '@oku-ui/portal'
import { ref } from 'vue'
import Scrollable from './Scrollable.vue'

const open = ref(false)
</script>

<template>
  <Scrollable>
    <OkuPopper>
      <OkuPopperAnchor class="popper-anchor" @click="open = true">
        open
      </OkuPopperAnchor>

      <OkuPortal v-if="open" as-child>
        <OkuPopperContent class="popper-content" :side-offset="5">
          <button @click="open = false">
            close
          </button>
          <OkuPopperArrow class="popper-arrow" :width="20" :height="10" />
        </OkuPopperContent>
      </OkuPortal>
    </OkuPopper>
  </Scrollable>
</template>
