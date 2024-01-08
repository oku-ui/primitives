<script lang="ts">
import { computed, nextTick, reactive, ref, useAttrs, watchEffect } from 'vue'
import type { DismissableLayerBranchElement, DismissableLayerElement, FocusBlurCaptureEvent, FocusCaptureEvent, FocusOutsideEvent, PointerdownCaptureEvent, PointerdownOutsideEvent } from './props'

export const context = reactive({
  layers: new Set<DismissableLayerElement>(),
  layersWithOutsidePointerEventsDisabled: new Set<DismissableLayerElement>(),
  branches: new Set<DismissableLayerBranchElement>(),
})
</script>

<script setup lang="ts">
import { useComposedRefs, useEscapeKeydown, useForwardRef } from '@oku-ui/use-composable'
import type { PrimitiveProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { useFocusOutside, usePointerdownOutside } from './util'

export interface DismissableLayerProps extends PrimitiveProps {
  /**
   * When `true`, hover/focus/click interactions will be disabled on elements outside
   * the `DismissableLayer`. Users will need to click twice on outside elements to
   * interact with them: once to close the `DismissableLayer`, and again to trigger the element.
   */
  disableOutsidePointerEvents?: boolean
}

export type DismissableLayerEmits = {
  /**
   * Event handler called when the escape key is down.
   * Can be prevented.
   */
  escapeKeydown: [event: KeyboardEvent]
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`.
   * Can be prevented.
   */
  pointerdownOutside: [event: PointerdownOutsideEvent]
  /**
   * Event handler called when the focus moves outside of the `DismissableLayer`.
   * Can be prevented.
   */
  focusOutside: [event: FocusOutsideEvent]
  /**
   * Event handler called when an interaction happens outside the `DismissableLayer`.
   * Specifically, when a `pointerdown` event happens outside or focus moves outside of it.
   * Can be prevented.
   */
  interactOutside: [event: PointerdownOutsideEvent | FocusOutsideEvent]
  /**
   * Handler called when the `DismissableLayer` should be dismissed
   */
  dismiss: []

  focusCapture: [event: FocusCaptureEvent]
  blurCapture: [event: FocusBlurCaptureEvent]
  pointerdownCapture: [event: PointerdownCaptureEvent]
}

defineOptions({
  name: 'DismissableLayer',
})

const props = withDefaults(defineProps<DismissableLayerProps>(), {
  disableOutsidePointerEvents: false,
})

const emit = defineEmits<DismissableLayerEmits>()

const node = ref<DismissableLayerElement | null>(null)
const ownerDocument = computed(() => node.value?.ownerDocument ?? globalThis?.document)

const forwardedRef = useForwardRef()
const composedRefs = useComposedRefs(node, forwardedRef)

const layers = computed(() => Array.from(context.layers))

const index = computed(() => node.value ? layers.value.indexOf(node.value) : -1)
const isBodyPointerEventsDisabled = computed(() => context.layersWithOutsidePointerEventsDisabled.size > 0)
const isPointerEventsEnabled = computed(() => {
  const [highestLayerWithOutsidePointerEventsDisabled] = [
    ...context.layersWithOutsidePointerEventsDisabled,
  ].slice(-1)

  const highestLayerWithOutsidePointerEventsDisabledIndex = layers.value.indexOf(highestLayerWithOutsidePointerEventsDisabled)

  return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex
})

const pointerdownOutside = usePointerdownOutside(async (event) => {
  const target = event.target as HTMLElement
  const isPointerdownOnBranch = [...context.branches].some(branch => branch.contains(target))
  if (!isPointerEventsEnabled.value || isPointerdownOnBranch)
    return

  emit('pointerdownOutside', event)
  emit('interactOutside', event)

  await nextTick()

  if (!event.defaultPrevented)
    emit('dismiss')
}, ownerDocument)

const focusOutside = useFocusOutside(async (event) => {
  const target = event.target as HTMLElement
  const isFocusInBranch = [...context.branches].some(branch => branch.contains(target))
  if (isFocusInBranch)
    return

  emit('focusOutside', event)
  emit('interactOutside', event)
  await nextTick()

  if (!event.defaultPrevented)
    emit('dismiss')
}, ownerDocument)

useEscapeKeydown((event) => {
  const isHighestLayer = index.value === context.layers.size - 1
  if (!isHighestLayer)
    return

  emit('escapeKeydown', event)

  if (!event.defaultPrevented) {
    event.preventDefault()
    emit('dismiss')
  }
}, ownerDocument)

let originalBodyPointerEvents: string

watchEffect(async (onCleanup) => {
  if (!node.value)
    return

  if (props.disableOutsidePointerEvents) {
    if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
      originalBodyPointerEvents = ownerDocument.value.body.style.pointerEvents
      ownerDocument.value.body.style.pointerEvents = 'none'
    }

    context.layersWithOutsidePointerEventsDisabled.add(node.value)
  }

  context.layers.add(node.value)

  onCleanup(() => {
    if (
      props.disableOutsidePointerEvents
      && context.layersWithOutsidePointerEventsDisabled.size === 1
    ) {
      ownerDocument.value.body.style.pointerEvents
                = originalBodyPointerEvents
    }
  })
})

/**
 * We purposefully prevent combining this effect with the `disableOutsidePointerEvents` effect
 * because a change to `disableOutsidePointerEvents` would remove this layer from the stack
 * and add it to the end again so the layering order wouldn't be _creation order_.
 * We only want them to be removed from inject stacks when unmounted.
 */
watchEffect((onCleanup) => {
  onCleanup(() => {
    if (!node.value)
      return

    context.layers.delete(node.value)
    context.layersWithOutsidePointerEventsDisabled.delete(node.value)
  })
})

const attrs = useAttrs()
</script>

<template>
  <Primitive
    :is="is"
    :ref="composedRefs"
    :as-child="asChild"
    :style="{
      pointerEvents: isBodyPointerEventsDisabled
        ? isPointerEventsEnabled
          ? 'auto'
          : 'none'
        : undefined,
      ...(attrs.style as any),
    }"
    @focus.capture="composeEventHandlers<FocusCaptureEvent>((event) => {
      emit('focusCapture', event)
    }, focusOutside.onFocusCapture)($event)"
    @blur.capture="composeEventHandlers<FocusBlurCaptureEvent>((event) => {
      emit('blurCapture', event)
    }, focusOutside.onBlurCapture)($event)"
    @pointerdown.capture="composeEventHandlers<PointerdownCaptureEvent>((event) => {
      emit('pointerdownCapture', event)
    }, pointerdownOutside.onPointerdownCapture)($event)"
  >
    <slot />
  </Primitive>
</template>
