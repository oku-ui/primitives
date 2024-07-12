<script setup lang="ts">
import { shallowRef } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { RovingFocusGroup } from '../roving-focus/index.ts'
import { forwardRef } from '../utils/vue.ts'
import type { TabsListProps } from './TabsList.ts'
import { useTabsContext } from './Tabs.ts'

defineOptions({
  name: 'TabsList',
  inheritAttrs: false,
})

withDefaults(defineProps<TabsListProps>(), {
  loop: true,
})
const $el = shallowRef<HTMLElement>()
const forwardedRef = forwardRef($el)

const context = useTabsContext()

defineExpose({
  $el,
})
</script>

<template>
  <RovingFocusGroup
    as-child
    :orientation="context.orientation"
    :dir="context.dir.value"
    :loop="loop"
  >
    <Primitive
      :ref="forwardedRef"
      :as="as"
      :as-child="asChild"
      v-bind="$attrs"
      role="tablist"
      :aria-orientation="context.orientation"
    >
      <slot />
    </Primitive>
  </RovingFocusGroup>
</template>
