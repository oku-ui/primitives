<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface CardProps {
  data: {
    link: string
    version: string
    title: string
    description: string
    componentName: string
  } & ParsedContent
  radix?: boolean
}

const props = defineProps<CardProps>()
const dynamicComponent = shallowRef<Component | undefined>(() =>
  h(
    'div',
    {
      class: 'content-preview-loader',
    },
    h('div', {}, 'Loading...'),
  ),
)

onMounted(async () => {
  try {
    dynamicComponent.value = defineAsyncComponent(() => {
      return import(`./../primitives/${props.data.componentName}/index.vue`)
    })
  }
  catch (error) {
    dynamicComponent.value = () => h('div', {}, 'Not found')
  }
})
</script>

<template>
  <div class="relative overflow-hidden group w-full">
    <div
      class="w-full p-4 rounded-2xl flex-col gap-2 backdrop-blur-sm bg-[#575757]/10 border border-[#DEDEDE] dark:border-[#303030] inline-flex min-h-[138px] sm:min-h-[146px]"
    >
      <div class="relative w-full">
        <component :is="dynamicComponent" v-if="!radix" class="py-10" />
        <component :is="`${data.componentName}Radix`" v-else class="py-10" />
      </div>
      <div>
        <span class="text-xs px-2 py-1 border border-[#DEDEDE] dark:border-[#222] rounded-full text-[#676767] inline">{{ data.version }}</span>
      </div>
      <NuxtLink :to="data._path" class="text-[#111] group-hover:text-oku-500 dark:text-white font-medium">
        {{ data.title }}
      </NuxtLink>
      <p class="text-[#6D6D6D] text-sm md:text-base line-clamp-2">
        {{ data.description }}
      </p>
      <div class="card-light" />
    </div>
  </div>
</template>

<style>
.card-light {
  @apply absolute w-[220px] h-[220px] transition-all duration-300;
  right: -1px;
  top: -93px;
  background: radial-gradient(50% 50.00% at 50% 50.00%, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 100%);
  opacity: 0.3;
  z-index: -1;

}

.group:hover {
  .card-light {
    opacity: 0.5;
    transform: scale(1.5);

  }
}
</style>
