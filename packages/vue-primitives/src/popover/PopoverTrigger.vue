<script setup lang="ts">
import { shallowRef } from 'vue'
import { PopperAnchor } from '../popper/index.ts'
import Primitive from '../primitive/Primitive.vue'
import { composeEventHandlers, forwardRef } from '../utils/vue.ts'
import { usePopoverContext } from './PopoverRoot.ts'
import type { PopoverTriggerEmits, PopoverTriggerProps } from './PopoverTrigger.ts'
import { getState } from './utilts.ts'

defineOptions({
  name: 'PopoverTrigger',
  inheritAttrs: false,
})

withDefaults(defineProps<PopoverTriggerProps>(), {
  as: 'button',
})
const emit = defineEmits<PopoverTriggerEmits>()
const context = usePopoverContext('PopoverTrigger')

const $el = shallowRef<HTMLButtonElement>()
const farwardedRef = forwardRef($el, [((v) => {
  context.triggerRef.current = v
})])

const onClick = composeEventHandlers<MouseEvent>((event) => {
  emit('click', event)
}, context.onOpenToggle)

defineExpose({
  $el,
})
</script>

<template>
  <Primitive
    v-if="context.hasCustomAnchor.value"
    :ref="farwardedRef"
    :as="as"
    type="button"
    aria-haspopup="dialog"
    :aria-expanded="context.open.value"
    :aria-controls="context.contentId"
    :data-state="getState(context.open.value)"
    v-bind="$attrs"
    @click="onClick"
  >
    <slot />
  </Primitive>
  <PopperAnchor v-else as-child>
    <Primitive
      :ref="farwardedRef"
      :as="as"
      type="button"
      aria-haspopup="dialog"
      :aria-expanded="context.open.value"
      :aria-controls="context.contentId"
      :data-state="getState(context.open.value)"
      v-bind="$attrs"
      @click="onClick"
    >
      <slot />
    </Primitive>
  </PopperAnchor>
</template>
