<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import { usePopperInject } from './utils'

interface PopperAnchorProps extends PrimitiveProps {
  virtualRef?: any
  scopeOkuPopper?: any
}
</script>

<script setup lang="ts">
import { Primitive } from '@oku-ui/primitive'
import { useComponentRef } from '@oku-ui/use-composable'
import { defineOptions, watchEffect, withDefaults } from 'vue'

defineOptions({
  name: 'OkuPopperAnchor',
})

const props = withDefaults(
  defineProps<PopperAnchorProps>(),
  {
    virtualRef: undefined,
    is: 'div',
  },
)

const inject = usePopperInject('OkuPopper', props.scopeOkuPopper)
const { componentRef, currentElement } = useComponentRef<HTMLDivElement | null>()

watchEffect(() => {
  // Consumer can anchor the popper to something that isn't
  // a DOM node e.g. pointer position, so we override the
  // `anchorRef` with their virtual ref in this case.
  inject.onAnchorChange(props.virtualRef ?? currentElement.value)
})

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <Primitive
    :is="props.is"
    ref="componentRef"
    :as-child="props.asChild"
  >
    <slot />
  </Primitive>
</template>
