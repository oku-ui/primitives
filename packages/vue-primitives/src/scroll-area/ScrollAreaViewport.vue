<script setup lang="ts">
import { useForwardElement, useRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { useScrollAreaViewport } from './ScrollAreaViewport.ts'

defineOptions({
  name: 'ScrollAreaViewport',
  inheritAttrs: false,
})

const el = useRef<HTMLElement>()
const forwardElement = useForwardElement(el)

const scrollAreaViewport = useScrollAreaViewport({ el })
</script>

<template>
  <Primitive v-bind="normalizeAttrs(scrollAreaViewport.attrs(), $attrs, { ref: forwardElement })">
    <slot />
  </Primitive>
</template>
