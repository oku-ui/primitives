<script setup lang="ts">
import { OkuRovingFocusGroup } from '@oku-ui/roving-focus'
import { useRovingFocusGroupScope, useTabsContext } from './Tabs'
import type { TabsListProps } from './TabsList'
import { TAB_LIST_NAME } from './constants'
import { Primitive } from '@oku-ui/primitive'
import { usePrimitiveElement } from '@oku-ui/use-composable'

defineOptions({
  name: TAB_LIST_NAME,
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TabsListProps>(), {
  loop: true,
})

const [$el, forwardedRef] = usePrimitiveElement()
const context = useTabsContext(TAB_LIST_NAME, props.scopeOkuTabs)
const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeOkuTabs)

defineExpose({
  $el,
})
</script>

<template>
  <OkuRovingFocusGroup
    v-bind="rovingFocusGroupScope"
    as-child
    :dir="context.dir.value"
    :loop="loop"
    :orientation="context.orientation.value"
  >
    <Primitive
      :is="is"
      :ref="forwardedRef"
      :aria-orientation="context.orientation.value"
      role="tablist"
      :as-child="asChild"
      v-bind="$attrs"
    >
      <slot />
    </Primitive>
  </OkuRovingFocusGroup>
</template>
