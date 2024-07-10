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

defineExpose({
  $el: elRef,
})
</script>

<template>
  <component
    :is="asChild ? Slot : as"
    :ref="(nodeRef: any) => {
      const vnode = (nodeRef?.$el ?? nodeRef)
      const node = vnode && vnode.nodeType === ELEMENT_NODE ? vnode : undefined
      if (elRef === node) return
      elRef = node
    }"
  >
    <slot />
  </component>
</template>
