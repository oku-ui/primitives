<script setup lang="ts">
import { defineOptions, h, ref, toRefs, useSlots } from 'vue'
import { unrefElement } from '@oku-ui/use-composable'
import { usePresence } from './usePresence'

export interface PresenceProps {
  present: boolean
}

defineOptions({
  name: 'OkuPresence',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PresenceProps>(), {
  present: false,
})

const { present } = toRefs(props)

const nodeElement = ref<HTMLElement | undefined>()
const { isPresent } = usePresence(present, nodeElement)

const slots = useSlots()

function Comp() {
  const slot = slots.default?.({
    isPresent,
  })

  if (slot && slot?.length > 1)
    console.error(`OkuPresence can only contain a single child, but found ${slot.length} children. Please use a single wrapper element.`)

  const [child] = slot ?? []

  return isPresent.value
    ? h(child, {
      ref: (element: any) => {
        const el = unrefElement(element as HTMLElement)
        if (typeof el?.hasAttribute === 'undefined')
          return el

        nodeElement.value = el

        return el
      },
    })
    : null
}

defineExpose({
  $el: nodeElement,
})
</script>

<template>
  <Comp />
</template>
