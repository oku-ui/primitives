<script setup lang="ts">
import type { SeparatorProps } from '@oku-ui/separator'
import { OkuSeparator } from '@oku-ui/separator'

export interface ISeparatorProps extends SeparatorProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

withDefaults(defineProps<ISeparatorProps>(), {

})
</script>

<template>
  <div>
    <div v-if="template === '#1' || allshow" class="w-[300px] rounded-sm overflow-hidden">
      <OkuSeparator class="my-4 h-[1px] bg-slate-500" />
      <h1>Horizontal</h1>
      <p>The following separator is horizontal and has semantic meaning.</p>

      <OkuSeparator class="border-0 bg-gray-300 my-4 h-[1px]" orientation="horizontal" />
      <p>
        The following separator is horizontal and is purely decorative. Assistive technology will
        ignore this element.
      </p>

      <OkuSeparator orientation="horizontal" class="border-0 my-4 bg-gray-500 w-full h-[1px]" decorative />
      <h1>Vertical</h1>
      <div class="flex items-center h-full">
        <p>The following separator is vertical and has semantic meaning.</p>
        <OkuSeparator class="w-[1px] mx-4 bg-slate-500 h-12" orientation="vertical" />
        <p>
          The following separator is vertical and is purely decorative. Assistive technology will
          ignore this element.
        </p>
        <OkuSeparator class="w-[1px] mr-4 bg-slate-400 h-12" orientation="vertical" decorative />
      </div>
    </div>
  </div>
</template>
