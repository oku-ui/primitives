<script lang="ts">
import type { ArrowProps } from '@oku-ui/arrow'
import type { Side } from './utils'

export interface PopperArrowProps extends ArrowProps {
  scopeOkuPopper?: any
}

export const OPPOSITE_SIDE: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}
</script>

<script setup lang="ts">
import { computed, defineExpose, defineOptions, defineProps } from 'vue'
import { useComponentRef } from '@oku-ui/use-composable'
import { OkuArrow } from '@oku-ui/arrow'

import { usePopperContentInject } from './PopperContent.vue'

defineOptions({
  name: 'OkuPopperArrow',
  inheritAttrs: false,
})

const props = defineProps<PopperArrowProps>()

const { componentRef, currentElement } = useComponentRef()

defineExpose({
  $el: currentElement,
})

const contentInject = usePopperContentInject('OkuPopperContent', props.scopeOkuPopper)
const baseSide = computed(() => {
  return contentInject?.placedSide.value ? OPPOSITE_SIDE[contentInject.placedSide.value] : ''
})
</script>

<template>
  <span
    :ref="(el: any) => {
      contentInject.onArrowChange(el)
      return undefined
    }"
    :style="{
      position: 'absolute',
      left: contentInject.arrowX?.value ? `${contentInject.arrowX?.value}px` : undefined,
      top: contentInject.arrowY?.value ? `${contentInject.arrowY?.value}px` : undefined,
      [baseSide]: '0',
      transformOrigin: {
        top: '',
        right: '0 0',
        bottom: 'center 0',
        left: '100% 0',
      }[contentInject.placedSide.value!],
      transform: {
        top: 'translateY(100%)',
        right: 'translateY(50%) rotate(90deg) translateX(-50%)',
        bottom: 'rotate(180deg)',
        left: 'translateY(50%) rotate(-90deg) translateX(50%)',
      }[contentInject.placedSide.value!],
      visibility: contentInject.shouldHideArrow.value
        ? 'hidden'
        : undefined,
    }"
  >
    <OkuArrow
      v-bind="$attrs"
      :is="is"
      ref="componentRef"
      :as-child="asChild"
      :style="{
        ...$attrs.style as any,
        // ensures the element can be measured correctly (mostly for if SVG)
        display: 'block',
      }"
    >
      <slot />
    </OkuArrow>
  </span>
</template>
