<script setup lang="ts">
import { computed, onWatcherCleanup, shallowRef, watch } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useEscapeKeydown } from '../hooks/useEscapeKeydown.ts'
import { useForwardElement } from '../hooks/index.ts'
import { type DismissableLayerElement, type DismissableLayerEmits, type DismissableLayerProps, context } from './DismissableLayer.ts'
import { useFocusOutside, usePointerdownOutside } from './utils.ts'

defineOptions({
  name: 'DismissableLayer',
})

const props = withDefaults(defineProps<DismissableLayerProps>(), {
  disableOutsidePointerEvents: false,
})
const emit = defineEmits<DismissableLayerEmits>()

const node = shallowRef<DismissableLayerElement>()
const forwardElement = useForwardElement(node)

const ownerDocument = () => node.value?.ownerDocument ?? globalThis?.document

const index = computed(() => node.value ? Array.from(context.layers).indexOf(node.value) : -1)

const isBodyPointerEventsDisabled = computed(() => context.layersWithOutsidePointerEventsDisabled.size > 0)

const isPointerEventsEnabled = computed(() => {
  const layers = Array.from(context.layers)
  const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1)
  const highestLayerWithOutsidePointerEventsDisabledIndex = highestLayerWithOutsidePointerEventsDisabled ? layers.indexOf(highestLayerWithOutsidePointerEventsDisabled) : -1

  return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex
})

const pointerdownOutside = usePointerdownOutside((event) => {
  if (!isPointerEventsEnabled.value)
    return

  const target = event.target as HTMLElement

  const isPointerdownOnBranch = [...context.branches].some(branch => branch.contains(target))
  if (isPointerdownOnBranch)
    return

  emit('pointerdownOutside', event)
  emit('interactOutside', event)

  if (!event.defaultPrevented)
    emit('dismiss')
}, node)

const focusOutside = useFocusOutside((event) => {
  const target = event.target as HTMLElement

  const isFocusInBranch = [...context.branches].some(branch => branch.contains(target))
  if (isFocusInBranch)
    return

  emit('focusOutside', event)
  emit('interactOutside', event)

  if (!event.defaultPrevented)
    emit('dismiss')
}, node)

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

watch(node, (nodeVal) => {
  if (!nodeVal)
    return

  const ownerDocumentVal = ownerDocument()

  if (props.disableOutsidePointerEvents) {
    if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
      originalBodyPointerEvents = ownerDocumentVal.body.style.pointerEvents
      ownerDocumentVal.body.style.pointerEvents = 'none'
    }
    context.layersWithOutsidePointerEventsDisabled.add(nodeVal)
  }

  context.layers.add(nodeVal)

  onWatcherCleanup(() => {
    if (
      props.disableOutsidePointerEvents
      && context.layersWithOutsidePointerEventsDisabled.size === 1
    ) {
      if (!originalBodyPointerEvents) {
        const syles = ownerDocumentVal.body.style
        syles.removeProperty('pointer-events')
      }
      else {
        ownerDocumentVal.body.style.pointerEvents = originalBodyPointerEvents
      }
    }

    /**
     * We purposefully prevent combining this effect with the `disableOutsidePointerEvents` effect
     * because a change to `disableOutsidePointerEvents` would remove this layer from the stack
     * and add it to the end again so the layering order wouldn't be _creation order_.
     * We only want them to be removed from context stacks when unmounted.
     */
    context.layers.delete(nodeVal)
    context.layersWithOutsidePointerEventsDisabled.delete(nodeVal)
  })
})

const onFocusCapture = composeEventHandlers<FocusEvent>((event) => {
  emit('focusCapture', event)
}, focusOutside.onFocusCapture)

const onBlurCapture = composeEventHandlers<FocusEvent>((event) => {
  emit('blurCapture', event)
}, focusOutside.onBlurCapture)

const onPointerdownCapture = composeEventHandlers<FocusEvent>((event) => {
  emit('pointerdownCapture', event)
}, pointerdownOutside.onPointerdownCapture)
</script>

<script lang="ts">
let originalBodyPointerEvents: string | undefined
</script>

<template>
  <Primitive
    :ref="forwardElement"
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
