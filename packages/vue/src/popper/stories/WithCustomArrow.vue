<script setup lang="ts">
import {
  OkuPopper,
  OkuPopperAnchor,
  OkuPopperArrow,
  OkuPopperContent,
} from '@oku-ui/popper'
import { ref } from 'vue'
import CustomArrow from './CustomArrow.vue'
import Scrollable from './Scrollable.vue'

const open = ref(false)
</script>

<template>
  <Scrollable>
    <OkuPopper>
      <OkuPopperAnchor class="popper-anchor" @click="open = true">
        open
      </OkuPopperAnchor>

      <OkuPopperContent v-if="open" class="popper-content" :side-offset="5" side="right">
        <button @click="open = false">
          close
        </button>
        <OkuPopperArrow as-child :offset="20">
          <CustomArrow :width="20" :height="10" />
        </OkuPopperArrow>
      </OkuPopperContent>
    </OkuPopper>
  </Scrollable>
</template>
