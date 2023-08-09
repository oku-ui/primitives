<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, inject, useAttrs } from 'vue'
import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { composeEventHandlers } from '@oku-ui/utils'

defineOptions({
  inheritAttrs: false,

})
const props = defineProps<{
  value: string
  disabled?: boolean
  onFocus?: (e: any) => void
}>()
const data = inject<Ref<string>>('value')

function click() {
  if (data)
    data.value = props.value
}

const isSelected = computed(() => {
  const dd = data && data.value !== undefined && props.value !== undefined && data.value === props.value
  return dd
})

const onFocus = composeEventHandlers(props.onFocus, (event: any) => {
  if (data && data.value !== undefined)
    event.target.click()
})
const useAttras = useAttrs()
</script>

<template>
  <OkuRovingFocusGroupItem
    as-child
    :focusable="!disabled"
    :active="isSelected"
    @focus="onFocus"
    @click="click"
  >
    <button
      v-bind="useAttras"
      :disabled="disabled"
      class="w-40 h-6 text-white rounded-sm disabled:opacity-50"
      :class="{
        'bg-blue-500': isSelected,
        'bg-gray-500': !isSelected,
      }"
    >
      <slot />
    </button>
  </OkuRovingFocusGroupItem>
</template>
