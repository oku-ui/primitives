<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { Primitive } from '@oku-ui/primitive'

export interface ProgressIndicatorProps extends PrimitiveProps {
  scopeOkuProgress?: Scope
}
</script>

<script setup lang="ts">
import { useComponentRef } from '@oku-ui/use-composable'
import { getProgressState, useProgressInject } from './utils'

defineOptions({
  name: 'OkuProgressIndicator',
})

const props = defineProps<ProgressIndicatorProps>()

const { componentRef } = useComponentRef<HTMLButtonElement | null>()
const inject = useProgressInject('OkuProgress', props.scopeOkuProgress)

defineExpose({
  $el: componentRef,
})
</script>

<template>
  <Primitive
    :is="props.is"
    ref="componentRef"
    :as-child="props.asChild"
    :data-state="getProgressState(
      inject.max.value,
      inject.value.value,
    )"
    :data-value="inject.value.value ?? undefined"
    :data-max="inject.max.value"
  >
    <slot />
  </Primitive>
</template>
