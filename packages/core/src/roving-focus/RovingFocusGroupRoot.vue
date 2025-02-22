<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { RovingFocusGroupRootEmits, RovingFocusGroupRootProps } from './RovingFocusGroupRoot.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_ROVING_FOCUS_GROUP_ROOT_PROPS, useRovingFocusGroupRoot } from './RovingFocusGroupRoot.ts'

defineOptions({
  name: 'RovingFocusGroupRoot',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<RovingFocusGroupRootProps>(), DEFAULT_ROVING_FOCUS_GROUP_ROOT_PROPS)
const emit = defineEmits<RovingFocusGroupRootEmits>()

const rovingFocusGroupRoot = useRovingFocusGroupRoot(convertPropsToHookProps(
  props,
  ['currentTabStopId', 'dir'],
  (): Required<EmitsToHookProps<RovingFocusGroupRootEmits>> => ({
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
