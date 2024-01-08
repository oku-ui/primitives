<script setup lang="ts">
import { mergeProps, toRefs, useAttrs } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import type { PrimitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'

export interface PortalProps extends PrimitiveProps {
  /**
   * An optional container where the portaled content should be appended.
   */
  container?: HTMLElement | null
}

defineOptions({
  name: 'OkuPortal',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PortalProps>(), {
  container: globalThis?.document?.body ?? null,
})

const { container, ...restProps } = toRefs(props)

const forwardedRef = useForwardRef()
const attrs = useAttrs()
</script>

<template>
  <Teleport v-if="container" :to="container" :disabled="!container">
    <Primitive
      v-bind="mergeProps(attrs, restProps)"
      is="div"
      ref="forwardedRef"
      :as-child="asChild"
    >
      <slot />
    </Primitive>
  </Teleport>
</template>
