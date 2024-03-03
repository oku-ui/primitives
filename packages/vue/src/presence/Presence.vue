<script setup lang="ts">
import { defineOptions, h, ref, toRef } from 'vue'
import { unrefElement } from '@oku-ui/use-composable'
import { usePresence } from './usePresence.js'
import type { PresenceProps } from './Presence.js'
import { PRESENCE_NAME } from './Presence.js'

defineOptions({
  name: PRESENCE_NAME,
})

const props = withDefaults(defineProps<PresenceProps>(), {
  present: false,
})

const slots = defineSlots<{
  default: (props: { isPresent: boolean }) => any
}>()

const present = toRef(props, 'present')

const nodeElement = ref<HTMLElement | undefined>()
const { isPresent } = usePresence(present, nodeElement)

function Child() {
  const children = slots.default?.({ isPresent: isPresent.value })

  if (children && children?.length > 1)
    console.error(`OkuPresence can only contain a single child, but found ${children.length} children. Please use a single wrapper element.`)

  const [child] = children ?? []

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
  <Child />
</template>
