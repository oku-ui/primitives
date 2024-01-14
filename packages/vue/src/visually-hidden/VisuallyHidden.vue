<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'

export interface VisuallyHiddenProps extends PrimitiveProps { }
</script>

<script setup lang="ts">
import { defineOptions } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'

defineOptions({
  name: 'OkuVisuallyHidden',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<VisuallyHiddenProps>(), {
  is: 'span',
})

const forwardedRef = useForwardRef()
</script>

<template>
  <Primitive
    v-bind="props"
    ref="forwardedRef"
    :style="{
      // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
      position: 'absolute',
      border: '0px',
      width: '1px',
      height: '1px',
      padding: '0px',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0px, 0px, 0px, 0px)',
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
      ...$attrs.style as any,
    }"
  >
    <slot />
  </Primitive>
</template>
