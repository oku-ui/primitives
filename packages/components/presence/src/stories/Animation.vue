<script setup lang="ts">
import type { VNodeRef } from 'vue'
import { ref } from 'vue'
import { OkuPresence } from '../presence'
import Toggles from './Toggles.vue'

const open = ref(false)
const elementRef = ref<VNodeRef>()
</script>

<template>
  <Toggles v-model:open="open" :node-ref="elementRef" />
  <Transition name="bounce">
    <OkuPresence v-show="open" :present="open">
      <div ref="elementRef" class="inner" :data-state="open ? 'open' : 'closed'">
        Content
      </div>
    </OkuPresence>
  </Transition>
</template>

<style scoped lang="postcss">
.bounce-enter-active{
  animation: bounce-in 0.5s;
}
.bounce-leave-active{
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
