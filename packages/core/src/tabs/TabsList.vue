<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TABS_LIST_PROPS, type TabsListProps, useTabsList } from './TabsList.ts'

defineOptions({
  name: 'TabsList',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsListProps>(), DEFAULT_TABS_LIST_PROPS)

const tabsList = useTabsList(convertPropsToHookProps(props))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(tabsList.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
