<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { forwardRef } from '../utils/vue.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'

defineOptions({
  name: 'ScrollAreaContent',
})

const context = useScrollAreaContext('ScrollAreaContent')
const forwardedContentRef = forwardRef(context.content)
</script>

<template>
  <Primitive
    :ref="forwardedContentRef"
    style="min-width: 100%; display: table"
  >
    <slot />
  </Primitive>
</template>
