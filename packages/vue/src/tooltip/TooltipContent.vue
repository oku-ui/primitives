<script lang="ts">
import type { TooltipContentImplEmits, TooltipContentImplProps } from './utils'

export interface TooltipContentProps extends TooltipContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

</script>

<script setup lang="ts">
import { OkuPresence } from '@oku-ui/presence'
import { useComponentRef, useMergePropsEmits } from '@oku-ui/use-composable'
import { useTooltipInject, useTooltipPortalInject } from './utils'
import { computed, withDefaults } from 'vue'
import OkuTooltipContentHoverable from './TooltipContentHoverable.vue'
import OkuTooltipContentImpl from './TooltipContentImpl.vue'

defineOptions({
  name: 'OkuTooltipContent',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipContentProps>(), {
  forceMount: undefined,
  side: 'top',
})
const emits = defineEmits<TooltipContentImplEmits>()

const { componentRef, currentElement } = useComponentRef<HTMLButtonElement | null>()

const portalInject = useTooltipPortalInject('Tooltip', props.scopeOkuTooltip)
const forceMount = computed(() => props.forceMount || portalInject.forceMount?.value)

const inject = useTooltipInject('Tooltip', props.scopeOkuTooltip)

const merge = useMergePropsEmits(props, emits)

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <OkuPresence
    :present="forceMount || inject.open.value"
  >
    <component
      :is="inject.disableHoverableContent.value
        ? OkuTooltipContentImpl
        : OkuTooltipContentHoverable
      "
      v-bind="merge"
      ref="componentRef"
    >
      <slot />
    </component>
  </OkuPresence>
</template>
