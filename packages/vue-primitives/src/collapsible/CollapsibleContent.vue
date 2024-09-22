<script setup lang="ts">
import { useForwardElement } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
import { shallowRef } from 'vue'
import { useForwardElement } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type CollapsibleContentProps, useCollapsibleContent } from './CollapsibleContent.ts'

defineOptions({
  name: 'CollapsibleContent',
  inheritAttrs: false,
})

const props = defineProps<CollapsibleContentProps>()
const el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement(el)

const collapsibleContent = useCollapsibleContent({
  el,
  forceMount: props.forceMount,
})
</script>

<template>
  <Primitive :ref="forwardElement" v-bind="normalizeAttrs(collapsibleContent.attrs(), $attrs)">
    <slot v-if="collapsibleContent.isOpen.value" />
  </Primitive>
</template>
