<script setup lang="ts">
import { shallowRef, useAttrs } from 'vue'
import { PopperAnchor } from '../popper/index.ts'
import Primitive from '../primitive/Primitive.vue'
import { composeEventHandlers, forwardRef } from '../utils/vue.ts'
import { isFunction } from '../utils/is.ts'
import { usePopoverContext } from './Popover.ts'
import type { PopoverTriggerProps } from './PopoverTrigger.ts'
import { getState } from './utilts.ts'

defineOptions({
  name: 'PopoverTrigger',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopoverTriggerProps>(), {
  as: 'button',
})
const attrs = useAttrs()
const context = usePopoverContext()

const $el = shallowRef<HTMLButtonElement>()
const farwardedRef = forwardRef($el, [((v) => {
  context.triggerRef.current = v
})])

const onClick = composeEventHandlers((event) => {
  if (isFunction(attrs.onClick))
    attrs.onClick(event)
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
    :as-child="props.asChild"
    type="button"
    aria-haspopup="dialog"
    :aria-expanded="context.open.value"
    :aria-controls="context.contentId"
    :data-state="getState(context.open.value)"
    v-bind="{
      ...attrs,
      onClick,
    }"
  >
    <slot />
  </Primitive>
  <PopperAnchor v-else as-child>
    <Primitive
      :ref="farwardedRef"
      :as="as"
      :as-child="props.asChild"
      type="button"
      aria-haspopup="dialog"
      :aria-expanded="context.open.value"
      :aria-controls="context.contentId"
      :data-state="getState(context.open.value)"
      v-bind="{
        ...attrs,
        onClick,
      }"
    >
      <slot />
    </Primitive>
  </PopperAnchor>
</template>
