<script setup lang="ts">
import { useForwardElement } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
import { shallowRef } from 'vue'
import { type CollapsibleContentProps, useCollapsibleContent } from './CollapsibleContent.ts'

defineOptions({
  name: 'CollapsibleContent',
  inheritAttrs: false,
})

const props = defineProps<CollapsibleContentProps>()
const el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement(el)

const isOpen = shallowRef(false)

const collapsibleContent = useCollapsibleContent({
  el,
  isOpen,
  forceMount: props.forceMount,
})
</script>

<template>
  <Primitive :ref="forwardElement" v-bind="collapsibleContent($attrs)">
    <slot v-if="isOpen" />
  </Primitive>
</template>
