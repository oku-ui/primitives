<script setup lang="ts">
import type { TabsContentProps } from './TabsContent'
import { OkuPresence } from '@oku-ui/presence'
import { Primitive } from '@oku-ui/primitive'
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { TAB_CONTENT_NAME } from './constants'
import { useTabsContext } from './Tabs'
import { makeContentId, makeTriggerId } from './utils'

defineOptions({
  name: TAB_CONTENT_NAME,
  inheritAttrs: false,
})

const props = defineProps<TabsContentProps>()

const [$el, forwardedRef] = usePrimitiveElement()
const context = useTabsContext(TAB_CONTENT_NAME, props.scopeOkuTabs)
const triggerId = makeTriggerId(context.baseId, props.value)
const contentId = makeContentId(context.baseId, props.value)

const isSelected = computed(() => props.value === context.value.value)
const isMountAnimationPreventedRef = ref(isSelected.value)
const present = computed(() => props.forceMount || isSelected.value)

const rAf = ref()

onMounted(() => {
  rAf.value = requestAnimationFrame(() => {
    isMountAnimationPreventedRef.value = false
  })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rAf.value)
})

defineExpose({
  $el,
})
</script>

<template>
  <OkuPresence :present="isSelected" force-mount>
    <template #default="{ isPresent }">
      <Primitive
        :is="is"
        :id="contentId"
        :ref="forwardedRef"
        :as-child="asChild"
        role="tabpanel"
        :data-state="isSelected ? 'active' : 'inactive'"
        :data-orientation="context.orientation.value"
        :aria-labelledby="triggerId"
        :hidden="!present"
        v-bind="$attrs"
        tabindex="0"
        :style="{
          animationDuration: isMountAnimationPreventedRef ? '0s' : undefined,
        }"
      >
        <slot v-if="isPresent" />
      </Primitive>
    </template>
  </OkuPresence>
</template>
