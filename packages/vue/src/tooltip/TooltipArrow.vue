<script lang="ts">
import type {
  PopperArrowElement,
  PopperArrowProps,
} from '@oku-ui/popper'

export type TooltipArrowElement = PopperArrowElement

export interface TooltipArrowProps extends PopperArrowProps {
  scopeOkuTooltip?: Scope
}

</script>

<script setup lang="ts">
import {
  useComponentRef,
} from '@oku-ui/use-composable'
import {
  OkuPopperArrow,
} from '@oku-ui/popper'
import {
  usePopperScope,
  useVisuallyHiddenContentInject,
} from './utils'
import type {
  Scope,
} from '@oku-ui/provide'

defineOptions({
  name: 'OkuTooltipArrow',
})

const props = defineProps<TooltipArrowProps>()
const popperScope = usePopperScope(props.scopeOkuTooltip)

const visuallyHiddenContentInject = useVisuallyHiddenContentInject('Tooltip', props.scopeOkuTooltip)
const { componentRef, currentElement } = useComponentRef<HTMLButtonElement | null>()

// if the arrow is inside the `VisuallyHidden`, we don't want to render it all to
// prevent issues in positioning the arrow due to the duplicate
defineExpose({
  $el: currentElement,
})
</script>

<template>
  <OkuPopperArrow
    v-if="!visuallyHiddenContentInject.isInside.value"
    ref="componentRef"
    :scope-oku-popper="popperScope"
  >
    <slot />
  </OkuPopperArrow>
</template>
