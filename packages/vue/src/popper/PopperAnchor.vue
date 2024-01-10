<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'

interface PopperAnchorProps extends PrimitiveProps {
  virtualRef?: any
  scopeOkuPopper?: any
}
</script>

<script setup lang="ts">
import { defineExpose, defineOptions, watchEffect, withDefaults } from 'vue'
import { usePopperInject } from './Popper.vue'
import { Primitive } from '@oku-ui/primitive'
import { useComponentRef } from '@oku-ui/use-composable'

defineOptions({
  name: 'OkuPopperAnchor',
})

const props = withDefaults(
  defineProps<PopperAnchorProps>(),
  {
    virtualRef: undefined,
  },
)

const inject = usePopperInject('OkuPopper', props.scopeOkuPopper)
const { componentRef, currentElement } = useComponentRef<HTMLDivElement | null>()

defineExpose({
  $el: currentElement,
})

watchEffect(() => {
  // Consumer can anchor the popper to something that isn't
  // a DOM node e.g. pointer position, so we override the
  // `anchorRef` with their virtual ref in this case.
  inject.onAnchorChange(props.virtualRef ?? currentElement.value)
})
</script>

<template>
  <Primitive
    :is="is"
    ref="componentRef"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>
