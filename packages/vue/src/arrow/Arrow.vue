<script setup lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { useComponentRef } from '@oku-ui/use-composable'

export interface ArrowProps extends PrimitiveProps {
  width?: number
  height?: number
}

withDefaults(
  defineProps<ArrowProps>(),
  {
    width: 30,
    height: 10,
  },
)

const { componentRef } = useComponentRef<HTMLDivElement | null>()
</script>

<template>
  <Primitive
    is="svg"
    ref="componentRef"
    viewBox="0 0 30 10"
    :as-child="asChild"
    :width="width"
    :height="height"
    :preserveAspectRatio="asChild ? undefined : 'none'"
  >
    <slot v-if="asChild" />
    <polygon
      v-else
      points="0,0 30,0 15,10"
    />
  </Primitive>
</template>
