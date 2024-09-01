<script setup lang="ts">
import { shallowRef } from 'vue'
import { Arrow } from '../arrow/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import { useContentContext } from './PopperContent.ts'
import { OPPOSITE_SIDE } from './PopperArrow.ts'

defineOptions({
  name: 'PopperArrow',
  inheritAttrs: false,
})

const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const contentContext = useContentContext('PopperArrow')

defineExpose({
  $el,
})
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
    <Arrow
      :ref="forwardElement"
      v-bind="$attrs"
      :style="{
        display: 'block',
      }"
    >
      <slot />
    </Arrow>
  </span>
</template>
