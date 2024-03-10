<script setup lang="ts">
import { computed } from 'vue'
import { useScrollAreaContext } from './ScrollArea'
import { SCROLL_AREA_CORNER_NAME } from './constants'
import type { ScrollAreaCornerImplProps } from './ScrollAreaCornerImpl'
import ScrollAreaCornerImpl from './ScrollAreaCornerImpl.vue'

defineOptions({
  name: SCROLL_AREA_CORNER_NAME,
})

const props = defineProps<ScrollAreaCornerImplProps>()

const context = useScrollAreaContext(SCROLL_AREA_CORNER_NAME, props.scopeOkuScrollArea)

const hasBothScrollbarsVisible = computed(() => Boolean(context.scrollbarX.value && context.scrollbarY.value))
const hasCorner = computed(() => context.type.value !== 'scroll' && hasBothScrollbarsVisible.value)
</script>

<template>
  <ScrollAreaCornerImpl v-if="hasCorner">
    <slot />
  </ScrollAreaCornerImpl>
</template>
