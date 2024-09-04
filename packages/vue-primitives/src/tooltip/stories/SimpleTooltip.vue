<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot } from '../index.ts'
import TooltipContentAriaLabel from '../TooltipContentAriaLabel.vue'

defineOptions({
  inheritAttrs: false,
})

withDefaults(defineProps<{
  label?: string
  ariaLabel?: string
  open?: boolean
}>(), {
  open: undefined,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

function onChanges(value: boolean) {
  emit('update:open', value)
}
</script>

<template>
  <TooltipRoot :open="open" @update:open="onChanges">
    <slot />

    <TooltipPortal>
      <TooltipContent
        class="tooltip_contentClass"
        :side-offset="5"
        :aria-label="ariaLabel"
        v-bind="$attrs"
      >
        {{ label }}

        <TooltipContentAriaLabel />

        <TooltipArrow class="tooltip_arrowClass" :offset="10" />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>
