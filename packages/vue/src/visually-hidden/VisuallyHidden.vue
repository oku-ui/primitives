<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'

export interface VisuallyHiddenProps extends PrimitiveProps { }
</script>

<script setup lang="ts">
import { defineOptions } from 'vue'
import { useComponentRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'

defineOptions({
  name: 'OkuVisuallyHidden',
})

const props = withDefaults(defineProps<VisuallyHiddenProps>(), {
  is: 'span',
})

const { componentRef, currentElement } = useComponentRef<HTMLSpanElement | null>()

defineExpose({
  $el: currentElement,
})

</script>

<template>
  <Primitive
    :is="props.is"
    ref="componentRef"
    :as-child="props.asChild"
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
    }"
    v-bind="$attrs"
  >
    <slot />
  </Primitive>
</template>
