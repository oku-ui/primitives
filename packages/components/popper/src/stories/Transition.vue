<script setup lang="ts">
import {
  OkuPopper,
  OkuPopperAnchor,
  OkuPopperArrow,
  OkuPopperContent,
} from '@oku-ui/popper'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <OkuPopper>
    <OkuPopperAnchor class="anchorClass" @click="open = true">
      Open
    </OkuPopperAnchor>
    <Teleport to="body">
      <Transition name="fade">
        <OkuPopperContent
          v-show="open"
          :side-offset="5"
          side="right"
          align="start"
          class="animatedContentClass"
        >
          <button @click="open = false">
            close
          </button>
          <OkuPopperArrow class="arrowClass" :width="20" :height="10" :offset="25" />
        </OkuPopperContent>
      </Transition>
    </Teleport>
  </OkuPopper>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
