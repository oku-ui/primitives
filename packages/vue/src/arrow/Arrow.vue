<script setup lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { useComponentRef } from '@oku-ui/use-composable'

export interface ArrowProps extends PrimitiveProps {
  width?: number
  height?: number
}

const props = withDefaults(
  defineProps<ArrowProps>(),
  {
    width: 30,
    height: 10,
    is: 'svg',
  },
)

const { componentRef, currentElement } = useComponentRef<HTMLDivElement | null>()

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <Primitive
    :is="props.is"
    ref="componentRef"
    viewBox="0 0 30 10"
    :as-child="props.asChild"
    :width="props.width"
    :height="props.height"
    :preserveAspectRatio="props.asChild ? undefined : 'none'"
  >
    <slot v-if="props.asChild" />
    <polygon
      v-else
      points="0,0 30,0 15,10"
    />
  </Primitive>
</template>
