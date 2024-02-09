<script lang="ts">
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { TOOLTIP_OPEN, usePopperScope, useTooltipInject } from './utils'
import type { TooltipContentImplEmits, TooltipContentImplProps } from './utils'
</script>

<script setup lang="ts">
import { useComponentRef } from '@oku-ui/use-composable'
import { OkuPopperContent } from '@oku-ui/popper'
import { OkuSlottable } from '@oku-ui/slot'
import { OkuVisuallyHidden } from '@oku-ui/visually-hidden'
import { computed, onMounted, onUnmounted, watch } from 'vue'
import VisuallyHiddenContentProvider from './VisuallyHiddenContentProvider.vue'

defineOptions({
  name: 'OkuTooltipArrow',
})

const props = withDefaults(defineProps<TooltipContentImplProps>(), {
  ariaLabel: undefined,
})
const emits = defineEmits<TooltipContentImplEmits>()

const popperScope = usePopperScope(props.scopeOkuTooltip)
const { componentRef, currentElement } = useComponentRef<HTMLButtonElement | null>()
const inject = useTooltipInject('Tooltip', props.scopeOkuTooltip)
const popperContentProps = computed(() => {
  const { ariaLabel: _, ...propsAttr } = props
  return propsAttr
})

onMounted(() => {
  document.addEventListener(TOOLTIP_OPEN, inject.onClose)
})

onUnmounted(() => {
  document.removeEventListener(TOOLTIP_OPEN, inject.onClose)
})

watch(inject.trigger, (newValue, _oldValue, onClean) => {
  if (newValue) {
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement
      if (target?.contains(newValue))
        inject.onClose()
    }
    window.addEventListener('scroll', handleScroll, { capture: true })
    onClean(() => {
      window.removeEventListener('scroll', handleScroll, { capture: true })
    })
  }
})

defineExpose({
  $el: currentElement,
})

</script>

<template>
  <OkuDismissableLayer
    :as-child="true"
    :disable-outside-pointer-events="false"
    @escape-key-down="(event) => {
      emits('escapeKeyDown', event)
    }"
    @pointer-down-outside="(event: TooltipContentImplEmits['pointerDownOutside'][0]) => {
      emits('pointerDownOutside', event)
    }"
    @focus-outside="(event) => {
      event.preventDefault()
    }"
    @dismiss="() => {
      inject.onClose()
    }"
  >
    <OkuPopperContent
      v-bind="{
        ...$attrs,
        ...popperContentProps,
        ...popperScope,
      }"
      ref="componentRef"
      :data-state="inject.stateAttribute.value"
      :style="{
        ...$attrs.style as any,
        ...{
          '--oku-tooltip-content-transform-origin': 'var(--oku-popper-transform-origin)',
          '--oku-tooltip-content-available-width': 'var(--oku-popper-available-width)',
          '--oku-tooltip-content-available-height': 'var(--oku-popper-available-height)',
          '--oku-tooltip-trigger-width': 'var(--oku-popper-anchor-width)',
          '--oku-tooltip-trigger-height': 'var(--oku-popper-anchor-height)',
        },
      }"
    >
      <OkuSlottable>
        <VisuallyHiddenContentProvider
          :scope="props.scopeOkuTooltip"
          :is-inside="true"
        >
          <slot />
          <OkuVisuallyHidden
            :id="inject.contentId.value"
            role="tooltip"
          >
            {{ ariaLabel }}
          </OkuVisuallyHidden>
        </VisuallyHiddenContentProvider>
      </OkuSlottable>
    </OkuPopperContent>
  </OkuDismissableLayer>
</template>
