<script setup lang="ts">
import { normalizeAttrs } from '@oku-ui/shared'
import { useSelectGroup } from './SelectGroup'

defineOptions({
  name: 'SelectGroup',
  inheritAttrs: false,
})

const selectGroup = useSelectGroup()
</script>

<template>
  <div v-bind="normalizeAttrs(selectGroup.attrs([$attrs]))">
    <slot />
  </div>
</template>
