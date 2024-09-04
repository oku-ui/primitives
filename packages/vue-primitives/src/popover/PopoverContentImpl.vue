<script setup lang="ts">
import { shallowRef } from 'vue'
import { DismissableLayer } from '../dismissable-layer/index.ts'
import { useFocusGuards } from '../focus-guards/index.ts'
import FocusScope from '../focus-scope/FocusScope.vue'
import { PopperContent } from '../popper/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import { usePopoverContext } from './PopoverRoot.ts'
import type { PopoverContentImplEmits, PopoverContentImplProps } from './PopoverContentImpl.ts'
import { getState } from './utilts.ts'

defineOptions({
  name: 'PopoverContentImpl',
  inheritAttrs: false,
})

defineProps<PopoverContentImplProps>()
const emit = defineEmits<PopoverContentImplEmits>()

const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const context = usePopoverContext('PopoverContentImpl')

// Make sure the whole tree has focus guards as our `Popover` may be
// the last element in the DOM (because of the `Portal`)
useFocusGuards()

defineExpose({
  $el,
})
</script>

<template>
  <FocusScope
    as="template"
    loop
    :trapped="trapFocus"
    @mount-auto-focus="emit('openAutoFocus', $event)"
    @unmount-auto-focus="emit('closeAutoFocus', $event)"
  >
    <DismissableLayer
      as="template"
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      @interact-outside="emit('interactOutside', $event)"
      @escape-keydown="emit('escapeKeydown', $event)"
      @pointerdown-outside="emit('pointerdownOutside', $event)"
      @focus-outside="emit('focusOutside', $event)"
      @dismiss="context.onOpenChange(false)"
    >
      <PopperContent
        :id="context.contentId"
        :ref="forwardElement"
        :data-state="getState(context.open.value)"
        role="dialog"
        v-bind="$attrs"
        style="--radix-popover-content-transform-origin: var(--radix-popper-transform-origin); --radix-popover-content-available-width: var(--radix-popper-available-width); --radix-popover-content-available-height: var(--radix-popper-available-height); --radix-popover-trigger-width: var(--radix-popper-anchor-width); --radix-popover-trigger-height: var(--radix-popper-anchor-height);"
      >
        <slot />
      </PopperContent>
    </DismissableLayer>
  </FocusScope>
</template>
