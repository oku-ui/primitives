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

const hookProps = convertPropsToHookProps(props, ['value', 'disabled'])
const tabsTrigger = useTabsTrigger(hookProps)
</script>

<template>
  <Primitive v-bind="normalizeAttrs(tabsTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
