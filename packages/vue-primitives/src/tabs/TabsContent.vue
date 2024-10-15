<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps } from '../shared/convertPropsToHookProps.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { TabsContentDefaltProps, type TabsContentProps, useTabsContent } from './TabsContent.ts'

defineOptions({
  name: 'TabsContent',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsContentProps>(), TabsContentDefaltProps)

const tabsContent = useTabsContent(convertPropsToHookProps(props, ['value']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(tabsContent.attrs([$attrs]))">
    <slot v-if="tabsContent.isPresent.value" />
  </Primitive>
</template>
