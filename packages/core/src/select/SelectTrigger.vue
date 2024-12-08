<script setup lang="ts">
import { Primitive } from '@oku-ui/primitive'
import { normalizeAttrs } from '@oku-ui/shared'
import { DEFAULT_SELECT_TRIGGER_PROPS, type SelectTriggerProps, useSelectTrigger } from './SelectTrigger'

defineOptions({
  name: 'SelectTrigger',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SelectTriggerProps>(), DEFAULT_SELECT_TRIGGER_PROPS)

const selectTrigger = useSelectTrigger({
  disabled() {
    return props.disabled
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(selectTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
