<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps } from '../shared/convertPropsToHookProps.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { TabsTriggerDefaltProps, type TabsTriggerProps, useTabsTrigger } from './TabsTrigger.ts'

defineOptions({
  name: 'TabsTrigger',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsTriggerProps>(), TabsTriggerDefaltProps)

const tabsTrigger = useTabsTrigger(convertPropsToHookProps(props, ['value', 'disabled']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(tabsTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
