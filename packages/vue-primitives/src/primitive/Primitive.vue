<script setup lang="ts">
import { shallowRef } from 'vue'
import { Slot } from '../slot/index.ts'
import { ELEMENT_NODE, type PrimitiveProps } from './Primitive.ts'

defineOptions({
  name: 'Primitive',
})

withDefaults(
  defineProps<PrimitiveProps>(),
  {
    as: 'div',
    asChild: false,
  },
)

const elRef = shallowRef<HTMLElement>()

function forwardRef(nodeRef: any) {
  const vnode = (nodeRef?.$el ?? nodeRef)
  elRef.value = vnode && vnode.nodeType === ELEMENT_NODE ? vnode : undefined
}

defineExpose({
  $el: elRef,
})
</script>

<template>
  <component :is="asChild ? Slot : as" :ref="forwardRef">
    <slot />
  </component>
</template>
