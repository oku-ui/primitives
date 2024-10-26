<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_SCROLL_AREA_PROPS, type ScrollAreaRootProps, useScrollAreaRoot } from './ScrollAreaRoot.ts'

defineOptions({
  name: 'ScrollAreaRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ScrollAreaRootProps>(), DEFAULT_SCROLL_AREA_PROPS)

const scrollAreaRoot = useScrollAreaRoot(convertPropsToHookProps(props, ['dir']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(scrollAreaRoot.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
