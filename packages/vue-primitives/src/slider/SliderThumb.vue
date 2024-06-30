<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useCollection } from './Slider.ts'
import type { SliderThumbProps } from './SliderThumb.ts'
import SliderThumbImpl from './SliderThumbImpl.vue'

defineOptions({
  name: 'SliderThumb',
})

withDefaults(defineProps<SliderThumbProps>(), {
  as: 'span',
})

const thumbRef = shallowRef<HTMLSpanElement>()

const getItems = useCollection()

const index = computed(() => thumbRef.value ? getItems().findIndex(item => item.ref === thumbRef.value) : -1)
</script>

<template>
  <SliderThumbImpl
    :ref="(el: any) => thumbRef = el?.$el"
    :as="as"
    :as-child="asChild"
    :name="name"
    :index="index"
  >
    <slot />
  </SliderThumbImpl>
</template>
