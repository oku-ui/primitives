<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'

export interface ProgressIndicatorProps extends PrimitiveProps {
  scopeOkuProgress?: Scope
}
</script>

<script setup lang="ts">
import { useComponentRef } from '@oku-ui/use-composable'
import { getProgressState, useProgressInject } from './utils'

const props = defineProps<ProgressIndicatorProps>()

const { componentRef } = useComponentRef<HTMLButtonElement | null>()
const inject = useProgressInject('OkuProgress', props.scopeOkuProgress)

defineExpose({
  $el: componentRef,
})
</script>

<template>
  <div
    ref="componentRef"
    :data-state="getProgressState(
      inject.max.value,
      inject.value.value,
    )"
    :data-value="inject.value.value ?? undefined"
    :data-max="inject.max.value"
  >
    <slot />
  </div>
</template>
