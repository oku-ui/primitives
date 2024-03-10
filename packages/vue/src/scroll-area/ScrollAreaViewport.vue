<script setup lang="ts">
import type { ScrollAreaViewportProps } from './ScrollAreaViewport'
import { useScrollAreaContext } from './ScrollArea'
import { SCROLL_AREA_VIEWPORT } from './constants'
import { usePrimitiveElement } from '@oku-ui/use-composable'
import type { ScrollAreaViewportElement } from './types'
import { Primitive } from '@oku-ui/primitive'

defineOptions({
  name: SCROLL_AREA_VIEWPORT,
  inheritAttrs: false,
})

const props = defineProps<ScrollAreaViewportProps>()

const context = useScrollAreaContext(SCROLL_AREA_VIEWPORT, props.scopeOkuScrollArea)
const [$el, forwardRef] = usePrimitiveElement<ScrollAreaViewportElement>((el) => {
  context.onViewportChange(el)
})

defineExpose({
  $el,
})
</script>

<template>
  <Primitive
    :is="is"
    :ref="forwardRef"
    :as-child="asChild"
    data-oku-scroll-area-viewport=""
    :style="{
      /**
       * We don't support `visible` because the intention is to have at least one scrollbar
       * if this component is used and `visible` will behave like `auto` in that case
       * https://developer.mozilla.org/en-US/docs/Web/CSS/overflowed#description
       *
       * We don't handle `auto` because the intention is for the native implementation
       * to be hidden if using this component. We just want to ensure the node is scrollable
       * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
       * the browser from having to work out whether to render native scrollbars or not,
       * we tell it to with the intention of hiding them in CSS.
       */
      overflowX: context.scrollbarXEnabled.value ? 'scroll' : 'hidden',
      overflowY: context.scrollbarYEnabled.value ? 'scroll' : 'hidden',
    }"
    v-bind="$attrs"
  >
    <div
      :ref="(el) => context.onContentChange(el as HTMLDivElement)"
      :style="{ minWidth: '100%', display: 'table' }"
    >
      <slot />
    </div>
  </Primitive>
  <!-- eslint-disable-next-line vue/require-component-is -->
  <component is="style">
    /* Hide scrollbars cross-browser and enable momentum scroll for touch
    devices */
    [data-oku-scroll-area-viewport] {
    scrollbar-width:none;
    -ms-overflow-style:none;
    -webkit-overflow-scrolling:touch;
    }
    [data-oku-scroll-area-viewport]::-webkit-scrollbar{
    display:none
    }
  </component>
</template>
