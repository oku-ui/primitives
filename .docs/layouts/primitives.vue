<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<NavItem[]>('navigation')
</script>

<template>
  <HeaderPrimitives />
  <UMain>
    <UContainer>
      <UPage>
        <template #left>
          <UAside>
            <UNavigationTree
              :links="
                mapContentNavigation(navigation.find((item) => item._path === '/primitives')?.children || [])
              "
            />
          </UAside>
        </template>
        <slot />
      </UPage>
    </UContainer>
  </UMain>
</template>
