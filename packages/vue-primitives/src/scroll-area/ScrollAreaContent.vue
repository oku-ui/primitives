<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'

defineOptions({
  name: 'ScrollAreaContent',
})

const context = useScrollAreaContext('ScrollAreaContent')
const forwardedContentRef = useForwardElement(context.content)
</script>

<template>
  <Primitive
    :ref="forwardedContentRef"
    style="min-width: 100%; display: table"
  >
    <slot />
  </Primitive>
</template>
