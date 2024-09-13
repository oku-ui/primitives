<script setup lang="ts">
import type { MenuContentProps } from './MenuContent.ts'
import { usePopperContext } from '../popper/index.ts'
import { usePresence } from '../presence/index.ts'
import { useMenuContext, useMenuRootContext } from './MenuRoot.ts'
import MenuRootContentModal from './MenuRootContentModal.vue'
import MenuRootContentNonModal from './MenuRootContentNonModal.vue'

defineOptions({
  name: 'MenuContent',
})

const props = defineProps<MenuContentProps>()

const context = useMenuContext('MenuContent')
const rootContext = useMenuRootContext('MenuContent')
const popperContext = usePopperContext('MenuContent')

const isPresent = usePresence(popperContext.content, () => props.forceMount || context.open())

const Comp = rootContext.modal ? MenuRootContentModal : MenuRootContentNonModal
</script>

<template>
  <Comp v-if="isPresent">
    <slot />
  </Comp>
</template>
