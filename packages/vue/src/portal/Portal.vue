<script setup lang="ts">
import { defineOptions, mergeProps, useAttrs } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import type { PrimitiveProps } from '@oku-ui/primitive'
import { useComponentRef } from '@oku-ui/use-composable'

export interface PortalProps extends PrimitiveProps {
  /**
   * An optional container where the portaled content should be appended.
   */
  container?: any | null
}

defineOptions({
  name: 'OkuPortal',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PortalProps>(), {
  container: globalThis?.document?.body ?? null,
})

const { componentRef, currentElement } = useComponentRef<HTMLDivElement | null>()

defineExpose({
  $el: currentElement,
})
const attrs = useAttrs()
</script>

<template>
  <Teleport v-if="props.container" :to="props.container" :disabled="!props.container">
    <Primitive
      v-bind="mergeProps(attrs)"
      is="div"
      ref="componentRef"
      :as-child="asChild"
    >
      <slot />
    </Primitive>
  </Teleport>
</template>
