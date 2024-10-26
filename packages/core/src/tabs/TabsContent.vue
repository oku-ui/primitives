<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TABS_CONTENT_PROPS, type TabsContentProps, useTabsContent } from './TabsContent.ts'

defineOptions({
  name: 'TabsContent',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsContentProps>(), DEFAULT_TABS_CONTENT_PROPS)

const tabsContent = useTabsContent(convertPropsToHookProps(props, ['value']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(tabsContent.attrs([$attrs]))">
    <slot v-if="tabsContent.isPresent.value" />
  </Primitive>
</template>
