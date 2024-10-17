<script setup lang="ts">
import { useForwardElement } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
import { shallowRef } from 'vue'
import { type CollapsibleContentProps, useCollapsibleContent } from './CollapsibleContent.ts'
import { getState } from './utils.ts'

defineOptions({
  name: 'CollapsibleContent',
})

const props = defineProps<CollapsibleContentProps>()
const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const collapsibleContent = useCollapsibleContent($el, props)
</script>

<template>
  <Primitive
    :id="collapsibleContent.context.contentId"
    :ref="forwardElement"
    :data-state="getState(collapsibleContent.context.open.value)"
    :data-disabled="collapsibleContent.context.disabled() ? '' : undefined"
    :hidden="!collapsibleContent.isOpen.value"
    :style="{
      '--radix-collapsible-content-height': '0px',
      '--radix-collapsible-content-width': '0px',
      ...collapsibleContent.blockAnimationStyles.value,
    }"
  >
    <slot v-if="collapsibleContent.isOpen.value" />
  </Primitive>
</template>
