<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

export interface SwitchThumbProps extends PrimitiveProps {
  scopeOkuSwitch?: any
}
</script>

<script setup lang="ts">
import { useComponentRef } from '@oku-ui/use-composable'
import { getState, useSwitchInject } from './utils.ts'

defineOptions({
  name: 'OkuSwitchThumb',
})

const props = withDefaults(defineProps<SwitchThumbProps>(), {
  is: 'span',
})

const inject = useSwitchInject('OkuSwitch', props.scopeOkuSwitch)

const { componentRef } = useComponentRef<HTMLInputElement | null>()
</script>

<template>
  <Primitive
    :is="props.is"
    v-bind="$attrs"
    ref="componentRef"
    :as-child="props.asChild"
    :data-state="getState(inject.checked.value)"
    :data-disabled="inject.disabled?.value ? '' : undefined"
  />
</template>
