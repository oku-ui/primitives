<script lang="ts">
import { OkuPortal } from '@oku-ui/portal'
import type { PortalProps } from '@oku-ui/portal'
import { OkuPresence } from '@oku-ui/presence'
import { useTooltipInject, useTooltipPortalProvider } from './utils'
import type { Scope } from '@oku-ui/provide'

export interface TooltipPortalProps {
  scopeOkuTooltip?: Scope

  /**
   * Specify a container element to portal the content into.
   */
  container?: PortalProps['container']
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

</script>

<script setup lang="ts">
import { toRef, withDefaults } from 'vue'

defineOptions({
  name: 'OkuTooltipArrow',
})

const props = withDefaults(defineProps<TooltipPortalProps>(), {
  container: undefined,
  forceMount: undefined,
})
const inject = useTooltipInject('Tooltip', props.scopeOkuTooltip)
useTooltipPortalProvider({
  scope: props.scopeOkuTooltip,
  forceMount: toRef(props, 'forceMount'),
})
</script>

<template>
  <OkuPresence
    :present="props.forceMount || inject.open.value"
  >
    <OkuPortal
      :as-child="true"
      :container="props.container"
    >
      <slot />
    </OkuPortal>
  </OkuPresence>
</template>
