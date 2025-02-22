<script setup lang="ts">
import type { PopoverContentProps } from './PopoverContent.ts'
import { convertPropsToHookProps } from '../shared/index.ts'
import { DEFAULT_POPOVER_CONTENT_PROPS, usePopoverContent } from './PopoverContent.ts'
import PopoverContentImpl from './PopoverContentImpl.vue'

defineOptions({
  name: 'PopoverContent',
})

const props = withDefaults(defineProps<PopoverContentProps>(), DEFAULT_POPOVER_CONTENT_PROPS)

const popoverContent = usePopoverContent(convertPropsToHookProps(props))
</script>

<template>
  <PopoverContentImpl v-if="popoverContent.isPresent.value">
    <slot />
  </PopoverContentImpl>
</template>
