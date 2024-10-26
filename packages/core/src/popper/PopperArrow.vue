<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { DEFAULT_ARROW_PROPS, OPPOSITE_SIDE, type PopperArrowProps } from './PopperArrow.ts'
import { useContentContext } from './PopperContent.ts'

defineOptions({
  name: 'PopperArrow',
  inheritAttrs: false,
})

withDefaults(defineProps<PopperArrowProps>(), DEFAULT_ARROW_PROPS)

const contentContext = useContentContext('PopperArrow')
</script>

<template>
  <span
    :ref="(contentContext.onArrowChange as any)"
    :style="{
      position: 'absolute',
      left: contentContext.arrowX() ? `${contentContext.arrowX()}px` : undefined,
      top: contentContext.arrowY() ? `${contentContext.arrowY()}px` : undefined,
      [OPPOSITE_SIDE[contentContext.placedSide.value]]: 0,
      transformOrigin: {
        top: '',
        right: '0 0',
        bottom: 'center 0',
        left: '100% 0',
      }[contentContext.placedSide.value],
      transform: {
        top: 'translateY(100%)',
        right: 'translateY(50%) rotate(90deg) translateX(-50%)',
        bottom: `rotate(180deg)`,
        left: 'translateY(50%) rotate(-90deg) translateX(50%)',
      }[contentContext.placedSide.value],
      visibility: contentContext.shouldHideArrow() ? 'hidden' : undefined,
    }"
  >
    <Primitive
      :as="as"
      v-bind="$attrs"
      :width="width"
      :height="height"
      :viewBox="as === 'template' ? undefined : '0 0 30 10'"
      :preserveAspectRatio="as === 'template' ? undefined : 'none'"
      style="display: block"
    >
      <slot><polygon points="0,0 30,0 15,10" /></slot>
    </Primitive>
  </span>
</template>
