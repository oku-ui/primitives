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
import type {
  Scope,
} from '@oku-ui/provide'
import {
  OkuPopperArrow,
} from '@oku-ui/popper'
import {
  useComponentRef,
} from '@oku-ui/use-composable'
import {
  usePopperScope,
  useVisuallyHiddenContentInject,
} from './utils'

defineOptions({
  name: 'OkuTooltipArrow',
})

const props = defineProps<TooltipArrowProps>()
const popperScope = usePopperScope(props.scopeOkuTooltip)

const visuallyHiddenContentInject = useVisuallyHiddenContentInject('TooltipVisuallyHiddenContent', props.scopeOkuTooltip)
const { componentRef, currentElement } = useComponentRef<HTMLButtonElement | null>()

// if the arrow is inside the `VisuallyHidden`, we don't want to render it all to
// prevent issues in positioning the arrow due to the duplicate
defineExpose({
  $el: currentElement,
})
</script>

<template>
  <OkuPopperArrow
    v-if="visuallyHiddenContentInject.isInside.value"
    ref="componentRef"
    v-bind="popperScope"
  >
    <slot />
  </OkuPopperArrow>
</template>
