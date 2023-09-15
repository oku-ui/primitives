<script setup lang="ts">
import {
  OkuPopper,
  OkuPopperAnchor,
  OkuPopperArrow,
  OkuPopperContent,
} from '@oku-ui/popper'
import { ref } from 'vue'
import Scrollable from './Scrollable.vue'
import CustomArrow from './CustomArrow.vue'

const open = ref(false)
</script>

<template>
  <Scrollable>
    <OkuPopper>
      <OkuPopperAnchor class="anchorClass" @click="open = true">
        open
      </OkuPopperAnchor>

      <OkuPopperContent v-if="open" class="contentClass" :side-offset="5" side="right">
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
