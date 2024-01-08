<script setup lang="ts">
import {
  OkuPopper,
  OkuPopperAnchor,
  OkuPopperArrow,
  OkuPopperContent,
} from '@oku-ui/popper'
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

      <OkuPopperContent v-if="open" class="popper-content" :side-offset="5">
        <button @click="open = false">
          close
        </button>
        <OkuPopperArrow class="popper-arrow" :width="20" :height="10" />
      </OkuPopperContent>
    </OkuPopper>
  </Scrollable>
</template>
