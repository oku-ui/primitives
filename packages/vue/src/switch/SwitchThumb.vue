<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

export interface SwitchThumbProps extends PrimitiveProps {
  scopeOkuSwitch?: any
}
</script>

<script setup lang="ts">
import { useComponentRef } from '@oku-ui/use-composable'
import { useInject } from './Switch.vue'
import { getState } from './utils.ts'

defineOptions({
  name: 'OkuSwitchThumb',
})

const props = defineProps<SwitchThumbProps>()

const inject = useInject('OkuSwitch', props.scopeOkuSwitch)

const { componentRef } = useComponentRef<HTMLInputElement | null>()
</script>

<template>
  <Primitive
    is="span"
    v-bind="$attrs"
    ref="componentRef"
    :data-state="getState(inject.checked.value)"
    :data-disabled="inject.disabled ? '' : undefined"
  />
</template>
