<script setup lang="ts">
import { useForwardElement } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
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
