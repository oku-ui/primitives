<script lang="ts">
import type { Direction } from './utils'
import { provide, toRefs } from 'vue'
import { DirectionContextSymbol } from './utils'

export interface DirectionProps {
  dir: Direction
}
</script>

<script setup lang="ts">
const props = defineProps<DirectionProps>()
const { dir } = toRefs(props)

provide(DirectionContextSymbol, dir)
</script>

<template>
  <slot />
</template>
