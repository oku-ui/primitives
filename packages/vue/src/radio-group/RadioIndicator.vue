<script setup lang="ts">
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { useRadioContext } from './Radio'
import type { RadioIndicatorProps } from './RadioIndicator'
import { RADIO_INDICATOR_NAME } from './constants'
import { OkuPresence } from '@oku-ui/presence'
import { Primitive } from '@oku-ui/primitive'
import { getState } from './utils'

defineOptions({
  name: RADIO_INDICATOR_NAME,
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RadioIndicatorProps>(), {
  is: 'span',
})
const context = useRadioContext(RADIO_INDICATOR_NAME, props.scopeOkuRadio)

const [$el, setForwardRef] = usePrimitiveElement()

defineExpose({
  $el,
})
</script>

<template>
  <OkuPresence :present="forceMount || context.checked.value">
    <Primitive
      :is="is"
      :ref="setForwardRef"
      :as-child="asChild"
      :data-state="getState(context.checked.value)"
      :data-disabled="context.disabled?.value ? '' : undefined"
      v-bind="$attrs"
    >
      <slot />
    </Primitive>
  </OkuPresence>
</template>
