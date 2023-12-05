<script setup lang="ts">
import { OkuToggleGroup, OkuToggleGroupItem } from '@oku-ui/toggle-group'

const useGlobal = useGlobalStore()

onMounted(() => {
  localStorage.getItem('oku-design')
})
</script>

<template>
  <div class="w-full">
    <div class="w-full px-2 mb-10">
      <OkuToggleGroup
        v-model="useGlobal.design"
        class="inline-flex rounded w-full"
        type="single"
        default-value="center"
        aria-label="Text alignment"
        @value-change="useGlobal.setDesign"
      >
        <OkuToggleGroupItem class="toggle-group-item" value="oku" aria-label="Left aligned">
          Oku
        </OkuToggleGroupItem>
        <OkuToggleGroupItem class="toggle-group-item" value="radix" aria-label="Center aligned">
          Radix
        </OkuToggleGroupItem>
      </OkuToggleGroup>
    </div>
    <DocsAsideLinks />
  </div>
</template>

<style lang="postcss">
.toggle-group-item {
  @apply hover:bg-yellow-500 dark:hover:bg-yellow-500 text-oku-900 dark:text-oku-50 data-[state=on]:bg-oku-500 data-[state=on]:text-white dark:data-[state=on]:bg-oku-400 dark:data-[state=on]:text-white flex h-[35px] w-full items-center justify-center bg-oku-200 dark:bg-oku-800 text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black dark:focus:shadow-white focus:outline-none
}
</style>
