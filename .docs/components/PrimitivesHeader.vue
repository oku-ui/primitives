<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'
import type { Link } from '#ui-pro/types'

defineProps<{
  links?: Link[]
}>()

const navigation = inject<Ref<NavItem[]>>('navigation')

const { metaSymbol } = useShortcuts()

const mobileNav = computed(() => {
  const links = mapContentNavigation(navigation.value)
  // Show Migration and Bridge on mobile only when user is reading them
  const docsLink = links.find(link => link.to === '/primitives')
  if (docsLink)
    docsLink.children = docsLink.children.filter(link => !['/docs/bridge', '/docs/migration'].includes(link.to as string))

  return links
})
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <NuxtLink to="/" class="flex items-center gap-1.5 font-bold text-xl text-gray-900 dark:text-white" aria-label="Oku">
        <PrimitivesLogo class="w-auto h-6" />
        Primitives
      </NuxtLink>
    </template>

    <template #right>
      <UTooltip text="Search" :shortcuts="[metaSymbol, 'K']">
        <UDocsSearchButton :label="null" />
      </UTooltip>

      <UTooltip :text="$colorMode.preference === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
        <UColorModeButton />
      </UTooltip>

      <UTooltip text="GitHub Stars">
        <UButton
          icon="i-simple-icons-github" to="https://github.com/oku-ui/primitives" target="_blank"
          label="700+"
        />
      </UTooltip>
    </template>

    <template #panel>
      <UNavigationTree :links="mobileNav" default-open :multiple="false" />
    </template>
  </UHeader>
</template>
