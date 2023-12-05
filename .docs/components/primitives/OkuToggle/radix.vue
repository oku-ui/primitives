<script setup lang="ts">
import { OkuToggle } from '@oku-ui/toggle'
</script>

<template>
  <OkuToggle
    aria-label="Toggle italic"
    class="hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 shadow-blackA7 flex h-[35px] w-[35px] items-center justify-center rounded bg-white text-base leading-4 shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black"
  >
    <span class="i-ic-baseline-format-italic text-violet11 w-5 h-5" />
  </OkuToggle>
</template>
