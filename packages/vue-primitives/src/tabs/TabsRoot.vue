<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TABS_ROOT_PROPS, type TabsRootEmits, type TabsRootProps, useTabsRoot } from './TabsRoot.ts'

defineOptions({
  name: 'TabsRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsRootProps>(), DEFAULT_TABS_ROOT_PROPS)

const emit = defineEmits<TabsRootEmits>()

const tabsRoot = useTabsRoot(convertPropsToHookProps(
  props,
  ['value'],
  null as unknown as TabsRootEmits,
  () => ({
    onUpdateValue(value) {
      emit('update:value', value)
    },
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(tabsRoot.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
