<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { type CollapsibleRootEmits, type CollapsibleRootProps, DEFAULT_COLLAPSIBLE_ROOT_PROPS, useCollapsibleRoot } from './CollapsibleRoot.ts'

defineOptions({
  name: 'CollapsibleRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CollapsibleRootProps>(), DEFAULT_COLLAPSIBLE_ROOT_PROPS)
const emit = defineEmits<CollapsibleRootEmits>()

const collapsibleRoot = useCollapsibleRoot(convertPropsToHookProps(
  props,
  ['disabled', 'open'],
  null as unknown as CollapsibleRootEmits,
  () => ({
    onUpdateOpen(value: boolean) {
      emit('update:open', value)
    },
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(collapsibleRoot.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
