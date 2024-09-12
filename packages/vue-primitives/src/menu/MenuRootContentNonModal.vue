<script setup lang="ts">
import MenuContentImpl from './MenuContentImpl.vue'
import { useMenuContext } from './MenuRoot.ts'

defineOptions({
  name: 'MenuRootContentNonModal',
})

const context = useMenuContext('MenuRootContentNonModal')

function onDismiss() {
  context.onOpenChange(false)
}
</script>

<template>
  <MenuContentImpl
    :trap-focus="false"
    :disable-outside-pointer-events="false"
    :disable-outside-scroll="false"
    @dismiss="onDismiss"
  >
    <slot />
  </MenuContentImpl>
</template>
