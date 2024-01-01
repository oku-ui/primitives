<script setup lang="ts">
import { OkuProgress, OkuProgressIndicator } from '@oku-ui/progress'

const progress = ref(13)
const timerRef = ref(0)

onMounted(() => {
  timerRef.value = window.setTimeout(() => progress.value = 66, 500)
})

onBeforeUnmount(() => {
  clearTimeout(timerRef.value)
})
</script>

<template>
  <OkuProgress
    class="relative overflow-hidden bg-blackA9 rounded-full w-[300px] h-[25px]"
    style="
      /* Fix overflow clipping in Safari */
      /* https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0 */
      transform: translateZ(0);
    "
    :value="progress"
  >
    <OkuProgressIndicator
      class="bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
      :style="{ transform: `translateX(-${100 - progress}%)` }"
    />
  </OkuProgress>
</template>
