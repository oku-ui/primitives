<script setup lang="ts">
import { DismissableLayer } from '../dismissable-layer/index.ts'
import { useFocusGuards } from '../focus-guards/index.ts'
import { FocusScope } from '../focus-scope/index.ts'
import { useDialogContext } from './DialogRoot.ts'
import type { DialogContentImplEmits, DialogContentImplProps } from './DialogContentImpl.ts'
import { getState } from './utils.ts'

defineOptions({
  name: 'DialogContentImpl',
  inheritAttrs: false,
})

defineProps<DialogContentImplProps>()
const emit = defineEmits<DialogContentImplEmits>()

const context = useDialogContext('DialogContentImpl')

// Make sure the whole tree has focus guards as our `Dialog` will be
// the last element in the DOM (because of the `Portal`)
useFocusGuards()
</script>

<template>
  <FocusScope
    as="template"
    loop
    :trapped="trapFocus"
    @mount-auto-focus="emit('openAutoFocus', $event)"
    @unmount-auto-focus="emit('closeAutoFocus', $event)"
  >
    <DismissableLayer
      :id="context.contentId"
      role="dialog"
      :aria-describedby="context.descriptionId"
      :aria-labelledby="context.titleId"
      :data-state="getState(context.open.value)"
      v-bind="$attrs"
      @dismiss="context.onOpenChange(false)"
    >
      <slot />
    </DismissableLayer>
  </FocusScope>
</template>
