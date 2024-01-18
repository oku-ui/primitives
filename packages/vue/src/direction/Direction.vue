<script lang="ts">
import { provide, toRefs } from 'vue'
import type { Direction } from './utils'
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
