<script setup lang="ts">
import { convertPropsToHookProps } from '../shared/convertPropsToHookProps.ts'
import { DEFAULT_POPOVER_CONTENT_PROPS, type PopoverContentProps, usePopoverContent } from './PopoverContent.ts'
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
