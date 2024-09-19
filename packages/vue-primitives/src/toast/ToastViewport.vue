<script setup lang="ts">
import { isClient } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, onWatcherCleanup, watchEffect } from 'vue'
import { DismissableLayerBranch } from '../dismissable-layer/index.ts'
import { useComposedElements } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { focusFirst } from '../shared/index.ts'
import { VisuallyHidden } from '../visually-hidden/index.ts'
import { Collection, useCollection } from './collection.ts'
import { useToastProviderContext } from './index.ts'
import { type ToastViewportProps, VIEWPORT_PAUSE, VIEWPORT_RESUME } from './ToastViewport.ts'
import { getTabbableCandidates } from './utils.ts'

defineOptions({
  name: 'ToastViewport',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToastViewportProps>(), {
  as: 'ol',
  hotkey: () => ['F8'],
  label: 'Notifications ({hotkey})',
})

const context = useToastProviderContext('ToastViewport')
const collеctionContext = Collection.useCollectionContext('ToastViewport')

const getItems = useCollection()

let wrapperRef: HTMLDivElement | undefined
const forwardedWrapperRef = useComposedElements<HTMLDivElement>((v) => {
  wrapperRef = v
})
let headFocusProxyRef: HTMLSpanElement | undefined
const setHeadFocusProxyRef = useComposedElements<HTMLSpanElement>((v) => {
  headFocusProxyRef = v
})
let tailFocusProxyRef: HTMLSpanElement | undefined
const setTailFocusProxyRef = useComposedElements<HTMLSpanElement>((v) => {
  tailFocusProxyRef = v
})
let viewportRef: HTMLOListElement | undefined
const forwardedRef = useComposedElements<HTMLOListElement>((v) => {
  if (viewportRef === v)
    return

  viewportRef = v
  context.onViewportChange(v)
  collеctionContext.collectionRef.current = v
})
const ariaLabel = computed(() => props.label.replace('{hotkey}', props.hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, '')))

const hasToasts = () => context.toastCount.value > 0

if (isClient) {
  function handlePause() {
    if (!context.isClosePausedRef.current) {
      const pauseEvent = new CustomEvent(VIEWPORT_PAUSE)
      viewportRef?.dispatchEvent(pauseEvent)
      context.isClosePausedRef.current = true
    }
  }

  function handleResume() {
    if (context.isClosePausedRef.current) {
      const resumeEvent = new CustomEvent(VIEWPORT_RESUME)
      viewportRef?.dispatchEvent(resumeEvent)
      context.isClosePausedRef.current = false
    }
  }

  function handleFocusOutResume(event: FocusEvent) {
    const isFocusMovingOutside = !wrapperRef?.contains(event.relatedTarget as HTMLElement)
    if (isFocusMovingOutside)
      handleResume()
  }

  function handlePointerLeaveResume() {
    const isFocusInside = wrapperRef?.contains(document.activeElement)
    if (!isFocusInside)
      handleResume()
  }

  watchEffect(() => {
    const wrapper = wrapperRef
    if (!hasToasts() || !wrapper || !viewportRef)
      return

    // Toasts are not in the viewport React tree so we need to bind DOM events
    wrapper.addEventListener('focusin', handlePause)
    wrapper.addEventListener('focusout', handleFocusOutResume)
    wrapper.addEventListener('pointermove', handlePause)
    wrapper.addEventListener('pointerleave', handlePointerLeaveResume)
    window.addEventListener('blur', handlePause)
    window.addEventListener('focus', handleResume)

    onWatcherCleanup(() => {
      wrapper.removeEventListener('focusin', handlePause)
      wrapper.removeEventListener('focusout', handleFocusOutResume)
      wrapper.removeEventListener('pointermove', handlePause)
      wrapper.removeEventListener('pointerleave', handlePointerLeaveResume)
      window.removeEventListener('blur', handlePause)
      window.removeEventListener('focus', handleResume)
    })
  })
}

function getSortedTabbableCandidates({ tabbingDirection }: { tabbingDirection: 'forwards' | 'backwards' }) {
  const toastItems = getItems()

  const tabbableCandidates: HTMLElement[][] = []

  for (const toastItem of toastItems) {
    const toastNode = toastItem
    const toastTabbableCandidates = [toastNode, ...getTabbableCandidates(toastNode)]

    tabbableCandidates.push(tabbingDirection === 'forwards' ? toastTabbableCandidates : toastTabbableCandidates.reverse())
  }

  return (tabbingDirection === 'forwards' ? tabbableCandidates.reverse() : tabbableCandidates).flat()
}

function handleViewportKeydown(event: KeyboardEvent) {
  const isMetaKey = event.altKey || event.ctrlKey || event.metaKey
  const isTabKey = event.key === 'Tab' && !isMetaKey

  if (!isTabKey)
    return

  const focusedElement = document.activeElement
  const isTabbingBackwards = event.shiftKey
  const targetIsViewport = event.target === viewportRef

  // If we're back tabbing after jumping to the viewport then we simply
  // proxy focus out to the preceding document
  if (targetIsViewport && isTabbingBackwards) {
    headFocusProxyRef?.focus()
    return
  }

  const tabbingDirection = isTabbingBackwards ? 'backwards' : 'forwards'
  const sortedCandidates = getSortedTabbableCandidates({ tabbingDirection })
  const index = sortedCandidates.findIndex(candidate => candidate === focusedElement)

  if (focusFirst(sortedCandidates.slice(index + 1))) {
    event.preventDefault()
  }
  else {
    // If we can't focus that means we're at the edges so we
    // proxy to the corresponding exit point and let the browser handle
    // tab/shift+tab keypress and implicitly pass focus to the next valid element in the document
    if (isTabbingBackwards)
      headFocusProxyRef?.focus()
    else
      tailFocusProxyRef?.focus()
  }
}

function handleDocumentKeydown(event: KeyboardEvent) {
  // we use `event.code` as it is consistent regardless of meta keys that were pressed.
  // for example, `event.key` for `Control+Alt+t` is `†` and `t !== †`
  const isHotkeyPressed = props.hotkey.every(key => (event as any)[key] || event.code === key)
  if (isHotkeyPressed)
    viewportRef?.focus()
}

onMounted(() => {
  // We programmatically manage tabbing as we are unable to influence
  // the source order with portals, this allows us to reverse the
  // tab order so that it runs from most recent toast to least

  // Toasts are not in the viewport React tree so we need to bind DOM events
  viewportRef?.addEventListener('keydown', handleViewportKeydown)

  document.addEventListener('keydown', handleDocumentKeydown)
})

onBeforeUnmount(() => {
  viewportRef?.removeEventListener('keydown', handleViewportKeydown)

  document.removeEventListener('keydown', handleDocumentKeydown)
})

function useFocusProxyHandler(cb: () => void) {
  return (event: FocusEvent) => {
    const prevFocusedElement = event.relatedTarget as HTMLElement | null
    const isFocusFromOutsideViewport = !context.viewport.value?.contains(prevFocusedElement)
    if (!isFocusFromOutsideViewport)
      return
    cb()
  }
}

const beforeFocusHandler = useFocusProxyHandler(() => {
  const tabbableCandidates = getSortedTabbableCandidates({
    tabbingDirection: 'forwards',
  })
  focusFirst(tabbableCandidates)
})

const afterFocusHandler = useFocusProxyHandler(() => {
  const tabbableCandidates = getSortedTabbableCandidates({
    tabbingDirection: 'backwards',
  })
  focusFirst(tabbableCandidates)
})
</script>

<template>
  <DismissableLayerBranch
    :ref="forwardedWrapperRef"
    role="region"
    :aria-label="ariaLabel"
    tabindex="-1"
    :style="{
      // incase list has size when empty (e.g. padding), we remove pointer events so
      // it doesn't prevent interactions with page elements that it overlays
      pointerEvents: hasToasts() ? undefined : 'none',
    }"
  >
    <VisuallyHidden
      v-if="hasToasts()"
      :ref="setHeadFocusProxyRef"
      aria-hidden="true"
      tabindex="0"
      style="position: fixed"
      @focus="beforeFocusHandler"
    />
    <Primitive
      :ref="forwardedRef"
      :as="as"
      tabindex="-1"
      v-bind="$attrs"
    >
      <slot />
    </Primitive>
    <VisuallyHidden
      v-if="hasToasts()"
      :ref="setTailFocusProxyRef"
      aria-hidden="true"
      tabindex="0"
      style="position: fixed"
      @focus="afterFocusHandler"
    />
  </DismissableLayerBranch>
</template>
