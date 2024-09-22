<script setup lang="ts">
import { useForwardElement } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
import { shallowRef } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'
import { type ScrollAreaRootProps, useScrollAreaRoot } from './ScrollAreaRoot.ts'

defineOptions({
  name: 'ScrollAreaRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ScrollAreaRootProps>(), {
  type: 'hover',
  scrollHideDelay: 600,
})

const el = shallowRef<HTMLElement>()
function setEl(value: HTMLElement | undefined) {
  el.value = value
}

const scrollAreaRoot = useScrollAreaRoot({
  el,
  type: props.type,
  dir() {
    return props.dir
  },
  scrollHideDelay: props.scrollHideDelay,
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(scrollAreaRoot.attrs([{ ref: setEl }]), $attrs)">
    <slot />
  </Primitive>
</template>
