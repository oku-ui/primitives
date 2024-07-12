<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { forwardRef } from '../utils/vue.ts'
import { useScrollAreaContext } from './ScrollArea.ts'
import type { ScrollAreaContentProps } from './ScrollAreaContent.ts'

defineOptions({
  name: 'ScrollAreaContent',
})

defineProps<ScrollAreaContentProps>()

const context = useScrollAreaContext('ScrollAreaContent')
const forwardedContentRef = forwardRef(context.content)
</script>

<template>
  <Primitive
    :ref="forwardedContentRef"
    :as="as"
    :as-child="asChild" style="min-width: 100%; display: table"
  >
    <slot />
  </Primitive>
</template>
