<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps } from '../shared/convertPropsToHookProps.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { TabsRootDefaltProps, type TabsRootEmits, type TabsRootProps, useTabsRoot } from './TabsRoot.ts'

defineOptions({
  name: 'TabsRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsRootProps>(), TabsRootDefaltProps)

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
