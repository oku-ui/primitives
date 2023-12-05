<script setup lang="ts">
import {
  OkuToggleGroup,
  OkuToggleGroupItem,
} from '@oku-ui/toggle-group'
import { ref } from 'vue'

const toggleGroupItemClasses = ref('hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 flex h-[35px] w-[35px] items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none')
</script>

<template>
  <OkuToggleGroup
    class="inline-flex bg-mauve6 rounded shadow-[0_2px_10px] shadow-blackA7 space-x-px"
    type="single"
    default-value="center"
    aria-label="Text alignment"
  >
    <OkuToggleGroupItem :class="toggleGroupItemClasses" value="left" aria-label="Left aligned">
      <span class="i-ic-baseline-format-align-left text-violet11 w-5 h-5" />
    </OkuToggleGroupItem>
    <OkuToggleGroupItem :class="toggleGroupItemClasses" value="center" aria-label="Center aligned">
      <span class="i-ic-baseline-format-align-center text-violet11 w-5 h-5" />
    </OkuToggleGroupItem>
    <OkuToggleGroupItem :class="toggleGroupItemClasses" value="right" aria-label="Right aligned">
      <span class="i-ic-baseline-format-align-right text-violet11 w-5 h-5" />
    </OkuToggleGroupItem>
  </OkuToggleGroup>
</template>
