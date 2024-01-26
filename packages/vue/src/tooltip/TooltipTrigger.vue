<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'

export interface TooltipTriggerProps extends PrimitiveProps {
  scopeOkuTooltip?: Scope
}

export type TooltipTriggerEmits = {
  'pointerleave': [event: PointerEvent]
  'pointerdown': [event: PointerEvent]
  'pointermove': [event: PointerEvent]
  'click': [event: MouseEvent]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}

</script>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { useComponentRef } from '@oku-ui/use-composable'
import { OkuPopperAnchor } from '@oku-ui/popper'
import { composeEventHandlers } from '@oku-ui/utils'
import type { TooltipTriggerElement } from './utils'
import { usePopperScope, useTooltipInject, useTooltipProviderInject } from './utils'
import type { Scope } from '@oku-ui/provide'

defineOptions({
  name: 'OkuTooltipTrigger',
  inheritAttrs: false,
})

const props = defineProps<TooltipTriggerProps>()
const emits = defineEmits<TooltipTriggerEmits>()

const inject = useTooltipInject('Tooltip', props.scopeOkuTooltip)
const providerInject = useTooltipProviderInject('TooltipProvider', props.scopeOkuTooltip)
const popperScope = usePopperScope(props.scopeOkuTooltip)

const { componentRef, currentElement } = useComponentRef<HTMLButtonElement | null>()

watch(currentElement, (el) => {
  if (el)
    inject.onTriggerChange(el as TooltipTriggerElement | null)
})

const isPointerDownRef = ref(false)
const hasPointerMoveOpenedRef = ref(false)
function handlePointerUp() {
  isPointerDownRef.value = false
}

watchEffect((onCleanup) => {
  onCleanup(() => {
    document.removeEventListener('pointerup', handlePointerUp)
  })
})

function pointerdown(event: PointerEvent) {
  emits('pointerdown', event)
  isPointerDownRef.value = true
  document.addEventListener('pointerup', handlePointerUp, { once: true })
}

defineExpose({
  $el: componentRef,
})
</script>

<template>
  <OkuPopperAnchor
    as-child
    v-bind="popperScope"
  >
    <Primitive
      :is="props.is"
      ref="componentRef"
      :as-child="props.asChild"
      :aria-describedby="inject.open.value ? inject.contentId.value : undefined"
      v-bind="$attrs"
      @pointermove="composeEventHandlers<PointerEvent>((el) => {
        emits('pointermove', el)
      }, (event) => {
        if (event.pointerType === 'touch')
          return
        if (
          !hasPointerMoveOpenedRef
          && !providerInject.isPointerInTransitRef.value
        ) {
          inject.onTriggerEnter()
          hasPointerMoveOpenedRef = true
        }
      })"
      @pointerleave="composeEventHandlers<PointerEvent>((el) => {
        emits('pointerleave', el)
      }, () => {
        inject.onTriggerLeave()
        hasPointerMoveOpenedRef = false
      })"
      @pointerdown="pointerdown"
      @focus="composeEventHandlers<FocusEvent>((el) => {
        emits('focus', el)
      }, () => {
        if (!isPointerDownRef)
          inject.onOpen()
      })"
      @blur="composeEventHandlers<FocusEvent>((el) => {
        emits('blur', el)
      }, inject.onClose)"
      @click="composeEventHandlers<MouseEvent>((el) => {
        emits('click', el)
      }, inject.onClose)"
    >
      <slot />
    </Primitive>
  </OkuPopperAnchor>
</template>
