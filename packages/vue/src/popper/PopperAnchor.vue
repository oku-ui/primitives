<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'

interface PopperAnchorProps extends PrimitiveProps {
  virtualRef?: any
  scopeOkuPopper?: any
}
</script>

<script setup lang="ts">
import { defineOptions, ref, watchEffect, withDefaults } from 'vue'
import { usePopperInject } from './Popper.vue'
import { Primitive } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'

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
const anchorRef = ref<HTMLDivElement | null>(null)

const forwardedRef = useForwardRef()
const composedRefs = useComposedRefs(forwardedRef, anchorRef)

watchEffect(() => {
  // Consumer can anchor the popper to something that isn't
  // a DOM node e.g. pointer position, so we override the
  // `anchorRef` with their virtual ref in this case.
  inject.onAnchorChange(props.virtualRef ?? anchorRef.value)
})
</script>

<template>
  <Primitive
    :is="is"
    :ref="composedRefs"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>
