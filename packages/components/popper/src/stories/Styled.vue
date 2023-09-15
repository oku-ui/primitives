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
      <OkuPopperAnchor class="anchorClass" @click="open = true">
        open
      </OkuPopperAnchor>

      <OkuPopperContent v-if="open" class="contentClass" :side-offset="5">
        <button @click="open = false">
          close
        </button>
        <OkuPopperArrow class="arrowClass" :width="20" :height="10" />
      </OkuPopperContent>
    </OkuPopper>
  </Scrollable>
</template>
