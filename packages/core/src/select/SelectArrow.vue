<script setup lang="ts">
import { PopperAnchor } from '@oku-ui/popper'
import { useSelectContentContext } from './SelectContent'
import { useSelectContext } from './SelectRoot'

defineOptions({
  name: 'SelectArrow',
  inheritAttrs: false,
})

const context = useSelectContext('SelectArrow')
const contentContext = useSelectContentContext('SelectArrow')
</script>

<template>
  <PopperAnchor
    v-if="context.open.value && contentContext.position === 'popper'" v-bind="$attrs"
  >
    <slot />
  </PopperAnchor>
</template>
