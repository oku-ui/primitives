<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps } from '../shared/convertPropsToHookProps.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { TabsListDefaltProps, type TabsListProps, useTabsList } from './TabsList.ts'

defineOptions({
  name: 'TabsList',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsListProps>(), TabsListDefaltProps)

const hookProps = convertPropsToHookProps(props)
const tabsList = useTabsList(hookProps)
</script>

<template>
  <Primitive v-bind="normalizeAttrs(tabsList.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
