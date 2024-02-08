<script lang="ts">
import {
  computed,
  defineOptions,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  useAttrs,
  watch,
  watchEffect,
} from 'vue'
import type {
  DismissableLayerBranchElement,
  DismissableLayerElement,
  FocusBlurCaptureEvent,
  FocusCaptureEvent,
  FocusOutsideEvent,
  PointerdownCaptureEvent,
  PointerdownOutsideEvent,
} from './props'
import { CONTEXT_UPDATE } from './props'

export const context = reactive({
  layers: new Set<DismissableLayerElement>(),
  layersWithOutsidePointerEventsDisabled: new Set<DismissableLayerElement>(),
  branches: new Set<DismissableLayerBranchElement>(),
})

let originalBodyPointerEvents: string
</script>

<script setup lang="ts">
import { useComponentRef, useEscapeKeydown } from '@oku-ui/use-composable'
import type { PrimitiveProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { dispatchUpdate, useFocusOutside, usePointerdownOutside } from './util'
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
  escapeKeyDown: [event: KeyboardEvent]
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`.
   * Can be prevented.
   */
  pointerDownOutside: [event: PointerdownOutsideEvent]
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

const { componentRef, currentElement } = useComponentRef<HTMLDivElement | null>()
const ownerDocument = computed(() => currentElement.value?.ownerDocument ?? globalThis?.document)

const layers = computed(() => context.layers)

const index = computed(() => currentElement.value
  ? Array.from(layers.value).indexOf(currentElement.value)
  : -1)

const isBodyPointerEventsDisabled = computed(() => context.layersWithOutsidePointerEventsDisabled.size > 0)
const isPointerEventsEnabled = computed(() => {
  const [highestLayerWithOutsidePointerEventsDisabled] = [
    ...context.layersWithOutsidePointerEventsDisabled,
  ].slice(-1)

  const highestLayerWithOutsidePointerEventsDisabledIndex = Array.from(layers.value).indexOf(highestLayerWithOutsidePointerEventsDisabled)

  return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex
})

const focusOutside = useFocusOutside(async (event) => {
  const target = event.target as HTMLElement

  const isFocusInBranch = [...context.branches].some(branch => branch.contains(target))
  if (isFocusInBranch)
    return

  emit('focusOutside', event)
  emit('interactOutside', event)
  if (!event.defaultPrevented)
    emit('dismiss')
}, currentElement)

const pointerdownOutside = usePointerdownOutside(async (event) => {
  const target = event.target as HTMLElement

  const isPointerdownOnBranch = [...context.branches].some(branch => branch.contains(target))
  if (!isPointerEventsEnabled.value || isPointerdownOnBranch)
    return

  emit('pointerDownOutside', event)
  emit('interactOutside', event)

  if (!event.defaultPrevented)
    emit('dismiss')
}, currentElement)

useEscapeKeydown((event) => {
  const isHighestLayer = index.value === layers.value.size - 1
  if (!isHighestLayer)
    return

  emit('escapeKeyDown', event)

  if (!event.defaultPrevented) {
    event.preventDefault()
    emit('dismiss')
  }
}, ownerDocument)

watch([componentRef, context], (_newValue, _oldValue, onCleanup) => {
  if (!currentElement.value)
    return

  if (props.disableOutsidePointerEvents) {
    if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
      originalBodyPointerEvents = ownerDocument.value.body.style.pointerEvents
      ownerDocument.value.body.style.pointerEvents = 'none'
    }

    context.layersWithOutsidePointerEventsDisabled.add(currentElement.value)
  }

  context.layers.add(currentElement.value)
  dispatchUpdate()

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
    if (!currentElement.value)
      return

    context.layers.delete(currentElement.value)
    context.layersWithOutsidePointerEventsDisabled.delete(currentElement.value)
    dispatchUpdate()
  })
})

const force = ref({})

function handleUpdate() {
  force.value = {}
}

onMounted(() => {
  document.addEventListener(CONTEXT_UPDATE, handleUpdate)
})

onBeforeUnmount(() => {
  document.removeEventListener(CONTEXT_UPDATE, handleUpdate)
})

const attrs = useAttrs()

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <Primitive
    :is="is"
    ref="componentRef"
    :as-child="props.asChild"
    :style="{
      pointerEvents: isBodyPointerEventsDisabled
        ? isPointerEventsEnabled
          ? 'auto'
          : 'none'
        : undefined,
      ...(attrs.style as any),
    }"
    data-dismissable-layer
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
