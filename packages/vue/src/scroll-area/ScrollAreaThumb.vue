<script setup lang="ts">
import type { ScrollAreaThumbProps } from './ScrollAreaThumb'
import { OkuPresence } from '@oku-ui/presence'
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { SCROLL_AREA_THUMB_NAME } from './constants'
import { useScrollbarContext } from './ScrollAreaScrollbarImpl'
import ScrollAreaThumbImpl from './ScrollAreaThumbImpl.vue'

defineOptions({
  name: SCROLL_AREA_THUMB_NAME,
  inheritAttrs: false,
})

const props = defineProps<ScrollAreaThumbProps>()

const scrollbarContext = useScrollbarContext(SCROLL_AREA_THUMB_NAME, props.scopeOkuScrollArea)

const [$el, forwardRef] = usePrimitiveElement()

defineExpose({
  $el,
})
</script>

<template>
  <OkuPresence :present="forceMount || scrollbarContext.hasThumb.value">
    <ScrollAreaThumbImpl
      :is="is"
      :ref="forwardRef"
      :as-child="asChild"
      v-bind="$attrs"
    >
      <slot />
    </ScrollAreaThumbImpl>
  </OkuPresence>
</template>
