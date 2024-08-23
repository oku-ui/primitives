<script setup lang="ts">
import { shallowRef } from 'vue'
import { Arrow } from '../arrow/index.ts'
import { forwardRef } from '../utils/vue.ts'
import type { PopperArrowProps } from './PopperArrow.ts'
import { useContentContext } from './PopperContent.ts'
import { OPPOSITE_SIDE } from './PopperContentArrow.ts'

defineOptions({
  name: 'PopperArrow',
})

defineProps<PopperArrowProps>()

const $el = shallowRef<HTMLElement>()
const forwardedRef = forwardRef($el)

const contentContext = useContentContext('PopperArrow')

defineExpose({
  $el,
})
</script>

<template>
  <span
    :ref="(el: HTMLElement) => {
      contentContext.onArrowChange(el)
      return undefined
    }"
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
      :ref="forwardedRef"
      :as="as"
      :as-child="asChild"
      v-bind="$attrs"
      :style="{
        display: 'block',
      }"
      :width="width"
      :height="height"
    >
      <slot />
    </Arrow>
  </span>
</template>
