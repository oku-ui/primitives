<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_ROVING_FOCUS_GROUP_ROOT_PROPS, type RovingFocusGroupRootEmits, type RovingFocusGroupRootProps, useRovingFocusGroupRoot } from './RovingFocusGroupRoot.ts'

defineOptions({
  name: 'RovingFocusGroupRoot',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<RovingFocusGroupRootProps>(), DEFAULT_ROVING_FOCUS_GROUP_ROOT_PROPS)
const emit = defineEmits<RovingFocusGroupRootEmits>()

const rovingFocusGroupRoot = useRovingFocusGroupRoot(convertPropsToHookProps(
  props,
  ['currentTabStopId', 'dir'],
  null as unknown as RovingFocusGroupRootEmits,
  () => ({
    onEntryFocus(entry) {
      emit('entryFocus', entry)
    },
    onUpdateCurrentTabStopId(tabStopId) {
      emit('update:currentTabStopId', tabStopId)
    },
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(rovingFocusGroupRoot.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
