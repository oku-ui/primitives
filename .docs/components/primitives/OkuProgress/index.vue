<script setup lang="ts">
import { OkuProgress, OkuProgressIndicator } from '@oku-ui/progress'

const progress = ref<number | null>(10)

onMounted(() => {
  const timer = setTimeout(() => progress.value = 66, 500)
  return () => clearTimeout(timer)
})
</script>

<template>
  <div class="flex items-center justify-center">
    <OkuProgress
      class="relative overflow-hidden rounded-full w-[300px] h-[25px] bg-white transform"
      style="
      /* Fix overflow clipping in Safari */
      /* https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0 */
      transform: translateZ(0);
    "
      :value="progress"
    >
      <OkuProgressIndicator
        class="bg-oku-500 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        :style="{ transform: `translateX(-${100 - progress}%)` }"
      />
    </OkuProgress>
  </div>
</template>
