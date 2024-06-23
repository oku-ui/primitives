<script setup lang="ts">
import { computed, onBeforeUnmount, shallowRef, useAttrs, watchEffect } from 'vue'
import { composeEventHandlers } from '../utils/composeEventHandlers.ts'
import { Primitive } from '../primitive/index.ts'
import { type DismissableLayerEmits, type DismissableLayerProps, context, originalBodyPointerEvents } from './DismissableLayer.ts'
import { useEscapeKeydown, useFocusOutside, usePointerdownOutside } from './utils.ts'

defineOptions({
  name: 'DismissableLayer',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DismissableLayerProps>(), {
  disableOutsidePointerEvents: false,
})
const emit = defineEmits<DismissableLayerEmits>()
const attrs = useAttrs()
const elRef = shallowRef<HTMLElement>()

const index = computed(() => elRef.value ? Array.from(context.layers).indexOf(elRef.value) : -1)

const isBodyPointerEventsDisabled = computed(() => context.layersWithOutsidePointerEventsDisabled.size > 0)
const isPointerEventsEnabled = computed(() => {
  const localLayers = Array.from(context.layers)
  const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1)
  const highestLayerWithOutsidePointerEventsDisabledIndex = highestLayerWithOutsidePointerEventsDisabled ? localLayers.indexOf(highestLayerWithOutsidePointerEventsDisabled) : -1

  return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex
})

const pointerdownOutside = usePointerdownOutside((event) => {
  const target = event.target as HTMLElement
  const isPointerdownOnBranch = [...context.branches].some(branch => branch.contains(target))

  if (!isPointerEventsEnabled.value || isPointerdownOnBranch)
    return

  emit('pointerdownOutside', event)
  emit('interactOutside', event)

  if (!event.defaultPrevented)
    emit('dismiss')
}, elRef)

const focusOutside = useFocusOutside((event) => {
  const target = event.target as HTMLElement
  const isFocusInBranch = [...context.branches].some(branch => branch.contains(target))

  if (isFocusInBranch)
    return

  emit('focusOutside', event)
  emit('interactOutside', event)

  if (!event.defaultPrevented)
    emit('dismiss')
}, elRef)

useEscapeKeydown((event) => {
  const isHighestLayer = index.value === context.layers.size - 1

  if (!isHighestLayer)
    return

  emit('escapeKeyDown', event)

  if (!event.defaultPrevented) {
    event.preventDefault()
    emit('dismiss')
  }
}, elRef)

watchEffect((onCleanup) => {
  const node = elRef.value
  if (!node)
    return

  const ownerDocument = node.ownerDocument

  if (props.disableOutsidePointerEvents) {
    if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
      originalBodyPointerEvents.value = ownerDocument.body.style.pointerEvents
      ownerDocument.body.style.pointerEvents = 'none'
    }
    context.layersWithOutsidePointerEventsDisabled.add(node)
  }

  context.layers.add(node)

  onCleanup(() => {
    if (
      props.disableOutsidePointerEvents
      && context.layersWithOutsidePointerEventsDisabled.size === 1
    ) {
      ownerDocument.body.style.pointerEvents = originalBodyPointerEvents.value || undefined as any
    }
  })
})

/**
 * We purposefully prevent combining this effect with the `disableOutsidePointerEvents` effect
 * because a change to `disableOutsidePointerEvents` would remove this layer from the stack
 * and add it to the end again so the layering order wouldn't be _creation order_.
 * We only want them to be removed from context stacks when unmounted.
 */
onBeforeUnmount(() => {
  return () => {
    const node = elRef.value
    if (!node)
      return

    context.layers.delete(node)
    context.layersWithOutsidePointerEventsDisabled.delete(node)
  }
})
const onFocusCapture = composeEventHandlers<FocusEvent>((event) => {
  (attrs.onFocusCapture as Function | undefined)?.(event)
}, focusOutside.onFocusCapture)

const onBlurCapture = composeEventHandlers<FocusEvent>((event) => {
  (attrs.onBlurCapture as Function | undefined)?.(event)
}, focusOutside.onBlurCapture)

const onPointerdownCapture = composeEventHandlers<FocusEvent>((event) => {
  (attrs.onPointerdownCapture as Function | undefined)?.(event)
}, pointerdownOutside.onPointerdownCapture)
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    data-dismissable-layer
    :style="{
      pointerEvents: isBodyPointerEventsDisabled
        ? isPointerEventsEnabled
          ? 'auto'
          : 'none'
        : undefined,
    }"
    @focus.capture="onFocusCapture"
    @blur.capture="onBlurCapture"
    @pointerdown.capture="onPointerdownCapture"
  >
    <slot />
  </Primitive>
</template>
