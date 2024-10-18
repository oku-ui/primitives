<script setup lang="ts">
import { convertPropsToHookProps } from '../shared/convertPropsToHookProps.ts'
import { DEFAULT_HOVER_CARD_CONTENT_PROPS, type HoverCardContentProps, useHoverCardConten } from './HoverCardContent.ts'
import HoverCardContentImpl from './HoverCardContentImpl.vue'

defineOptions({
  name: 'HoverCardContent',
})

const props = withDefaults(defineProps<HoverCardContentProps>(), DEFAULT_HOVER_CARD_CONTENT_PROPS)

const hoverCardConten = useHoverCardConten(convertPropsToHookProps(props))
</script>

<template>
  <HoverCardContentImpl v-if="hoverCardConten.isPresent.value">
    <slot />
  </HoverCardContentImpl>
</template>
