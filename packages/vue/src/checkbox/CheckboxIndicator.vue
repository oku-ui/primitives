<script lang="ts">
import { Primitive } from '@oku-ui/primitive'
import type { PrimitiveProps } from '@oku-ui/primitive'

export interface CheckboxIndicatorProps extends PrimitiveProps {
  scopeOkuCheckbox?: any
  forceMount?: true
}

</script>

<script setup lang="ts">
import { defineOptions, withDefaults } from 'vue'
import { useComponentRef } from '@oku-ui/use-composable'
import { getState, isIndeterminate, useCheckboxInject } from './utils'
import { OkuPresence } from '@oku-ui/presence'

defineOptions({
  name: 'OkuCheckboxIndicator',
  inheritAttrs: false,

})

const props = withDefaults(defineProps<CheckboxIndicatorProps>(), {
  is: 'span',
  forceMount: undefined,
})

const { componentRef, currentElement } = useComponentRef<HTMLInputElement | null>()

const inject = useCheckboxInject('OkuCheckbox', props.scopeOkuCheckbox)

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <OkuPresence
    :present="props.forceMount || isIndeterminate(inject.state.value) || inject.state.value === true"
  >
    <Primitive
      :is="props.is"
      ref="componentRef"
      :as-child="props.asChild"
      :data-state="getState(inject.state.value)"
      :data-disabled="inject.disabled"
      :style="{
        pointerEvents: 'none', ...$attrs.style as any,
      }"
      v-bind="$attrs"
    >
      <slot />
    </Primitive>
  </OkuPresence>
</template>
