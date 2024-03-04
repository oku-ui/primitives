<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import { ARROW_KEYS, PAGE_KEYS, useSliderInject } from './utils'
import type { Scope } from '@oku-ui/provide'

export type SliderImplElement = HTMLSpanElement

export type SliderImplPrivateEmits = {
  slideStart: [event: PointerEvent]
  slideMove: [event: PointerEvent]
  slideEnd: [event: PointerEvent]
  homeKeyDown: [event: KeyboardEvent]
  endKeyDown: [event: KeyboardEvent]
  stepKeyDown: [event: KeyboardEvent]
  keydown: [event: KeyboardEvent]
  pointerdown: [event: PointerEvent]
  pointermove: [event: PointerEvent]
  pointerup: [event: PointerEvent]
}

export interface SliderImplProps extends PrimitiveProps {
  scopeOkuSlider?: Scope
}

</script>

<script setup lang="ts">
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'

import { useComponentRef } from '@oku-ui/use-composable'

defineOptions({
  name: 'OkuSliderImpl',
})

const props = withDefaults(defineProps<SliderImplProps>(), {
  is: 'span',
})
const emits = defineEmits<SliderImplPrivateEmits>()

const { componentRef, currentElement } = useComponentRef()

const inject = useSliderInject('OkuSlider', props.scopeOkuSlider)

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <Primitive
    :is="props.is"
    ref="componentRef"
    :as-child="props.asChild"
    @keydown="composeEventHandlers<SliderImplPrivateEmits['keydown'][0]>((event) => {
      emits('keydown', event)
    }, (event) => {
      if (event.key === 'Home') {
        emits('homeKeyDown', event)
        // Prevent scrolling to page start
        event.preventDefault()
      }
      else if (event.key === 'End') {
        emits('endKeyDown', event)
        // Prevent scrolling to page end
        event.preventDefault()
      }
      else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
        emits('stepKeyDown', event)
        // Prevent scrolling for directional key presses
        event.preventDefault()
      }
    })($event)"
    @pointerdown="composeEventHandlers<SliderImplPrivateEmits['pointerdown'][0]>((event) => {
      emits('pointerdown', event)
    }, (event) => {
      const target = event.target as HTMLElement
      target.setPointerCapture(event.pointerId)
      // Prevent browser focus behaviour because we focus a thumb manually when values change.
      event.preventDefault()
      // Touch devices have a delay before focusing so won't focus if touch immediately moves
      // away from target (sliding). We want thumb to focus regardless.
      if (inject.thumbs.value.has(target))
        target.focus()
      else
        emits('slideStart', event)
    })($event)"
    @pointermove="composeEventHandlers<SliderImplPrivateEmits['pointermove'][0]>((event) => {
      emits('pointermove', event)
    }, (event) => {
      const target = event.target as HTMLElement
      if (target.hasPointerCapture(event.pointerId))
        emits('slideMove', event)
    })($event)"
    @pointerup="composeEventHandlers<SliderImplPrivateEmits['pointerup'][0]>((event) => {
      emits('pointerup', event)
    }, (event) => {
      const target = event.target as HTMLElement
      if (target.hasPointerCapture(event.pointerId)) {
        target.releasePointerCapture(event.pointerId)
        emits('slideEnd', event)
      }
    })($event)"
  >
    <slot />
  </Primitive>
</template>
