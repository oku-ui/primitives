<script lang="ts">
import { useComponentRef } from '@oku-ui/use-composable'
import { type DismissableLayerEmits, OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { OkuPopperContent } from '@oku-ui/popper'
import type { PopperContentEmits, PopperContentProps } from '@oku-ui/popper'
import { OkuSlottable } from '@oku-ui/slot'
import { OkuVisuallyHidden } from '@oku-ui/visually-hidden'
import { TOOLTIP_OPEN, usePopperScope, useTooltipInject } from './utils'
import type { Scope } from '@oku-ui/provide'

export interface TooltipContentImplProps extends PopperContentProps {
  scopeOkuTooltip?: Scope
  /**
   * A more descriptive label for accessibility purpose
   */
  'ariaLabel'?: string
}

export type TooltipContentImplEmits = Omit<PopperContentEmits, 'placed'> & {
  /**
   * Event handler called when the escape key is down.
   * Can be prevented.
   */
  escapeKeydown: [event: DismissableLayerEmits['escapeKeydown'][0], 'aaaaa']
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `Tooltip`.
   * Can be prevented.
   */
  pointerdownOutside: [event: DismissableLayerEmits['pointerdownOutside'][0]]
  close: []
}

</script>

<script setup lang="ts">
import { mergeProps, watchEffect } from 'vue'
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

watchEffect((onClean) => {
  document.addEventListener(TOOLTIP_OPEN, inject.onClose)
  onClean(() => {
    document.removeEventListener(TOOLTIP_OPEN, inject.onClose)
  })
})

watchEffect((onClean) => {
  if (inject.trigger.value) {
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement
      if (target?.contains(inject.trigger.value))
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
    @escape-keydown="(event) => {
      emits('escapeKeydown', event)
    }"
    @pointerdown-outside="(event: TooltipContentImplEmits['pointerdownOutside'][0]) => {
      emits('pointerdownOutside', event)
    }"
    @focus-outside="(event) => {
      event.preventDefault()
    }"
    @dismiss="() => {
      inject.onClose()
    }"
  >
    <OkuPopperContent
      v-bind="mergeProps($attrs, popperScope)"
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
          <OkuVisuallyHidden
            :id="inject.contentId.value"
            role="tooltip"
          >
            {{ ariaLabel }}
            <slot v-if="!ariaLabel" />
          </OkuVisuallyHidden>
        </VisuallyHiddenContentProvider>
      </OkuSlottable>
    </OkuPopperContent>
  </OkuDismissableLayer>
</template>
