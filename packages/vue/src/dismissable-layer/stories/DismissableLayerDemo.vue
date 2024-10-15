<script setup lang="ts">
import Basic from './Basic.vue'
import Nested from './Nested.vue'
import WithFocusScop from './WithFocusScop.vue'
import DialogExample from './DialogExample.vue'
import PopoverFullyModal from './PopoverFullyModal.vue'
import PopoverSemiModal from './PopoverSemiModal.vue'
import PopoverNonModal from './PopoverNonModal.vue'
import PopoverInDialog from './PopoverInDialog.vue'
import PopoverNested from './PopoverNested.vue'
import InPopupWindow from './InPopupWindow.vue'

withDefaults(defineProps<IDismissableLayerProps>(), {})

export interface IDismissableLayerProps {
  template?: 'Basic' | 'Nested' | 'WithFocusScope' | 'DialogExample' | 'PopoverFullyModal' | 'PopoverSemiModal' | 'PopoverNonModal' | 'PopoverInDialog' | 'PopoverNested' | 'InPopupWindow'
  allshow?: boolean
}
</script>

<template>
  <div>
    <div v-if="template === 'Basic' || allshow">
      <Basic />
    </div>

    <div v-if="template === 'Nested' || allshow">
      <Nested />
    </div>

    <div v-if="template === 'WithFocusScope' || allshow">
      <WithFocusScop />
    </div>

    <div v-if="template === 'DialogExample' || allshow">
      <DialogExample />
    </div>

    <div v-if="template === 'PopoverFullyModal' || allshow">
      <PopoverFullyModal />
    </div>

    <div v-if="template === 'PopoverSemiModal' || allshow">
      <PopoverSemiModal />
    </div>

    <div v-if="template === 'PopoverNonModal' || allshow">
      <PopoverNonModal />
    </div>

    <div v-if="template === 'PopoverInDialog' || allshow">
      <PopoverInDialog />
    </div>

    <div v-if="template === 'PopoverNested' || allshow">
      <PopoverNested />
    </div>

    <div v-if="template === 'InPopupWindow' || allshow">
      <InPopupWindow />
    </div>
  </div>
</template>
