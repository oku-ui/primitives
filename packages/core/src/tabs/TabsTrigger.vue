<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TABS_TRIGGER_PROPS, type TabsTriggerProps, useTabsTrigger } from './TabsTrigger.ts'

defineOptions({
  name: 'TabsTrigger',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsTriggerProps>(), DEFAULT_TABS_TRIGGER_PROPS)

const tabsTrigger = useTabsTrigger(convertPropsToHookProps(props, ['value', 'disabled']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(tabsTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
