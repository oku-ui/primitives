import { createSharedComposable } from '@vueuse/core'

function _usePrimitivesNavigation() {
  const headerLinksPrimitive = computed(() => {
    const route = useRoute()

    return [
      {
        label: 'Primitives',
        icon: 'i-ph-book-bookmark-duotone',
        to: '/primitives',
        search: false,
        children: [
          {
            label: 'Get Started',
            description: 'Learn how to get started with Nuxt.',
            icon: 'i-ph-rocket-launch-duotone',
            to: '/primitives/getting-started',
            active: route.path.startsWith('/primitives/getting-started'),
          },
          {
            label: 'Components',
            description: 'Components',
            icon: 'i-ph-squares-four-bold',
            to: '/primitives/components',
            active: route.path.startsWith('/primitives/components'),
          },
          {
            label: 'Nuxt Modules',
            description: 'Primitives modules for Nuxt.',
            icon: 'i-simple-icons-nuxtdotjs',
            to: '/primitives/getting-started/nuxt',
            active: route.path.startsWith('/primitives/getting-started/nuxt'),
          },
          {
            label: 'Figma',
            description: 'Learn how to use the primitives CLI.',
            icon: 'i-simple-icons-figma',
            to: '/primitives/getting-started/figma',
            active: route.path.startsWith('/primitives/getting-started/figma'),
          },
          {
            label: 'Community',
            description: 'Find answers and support from the community.',
            icon: 'i-ph-chats-teardrop-duotone',
            to: '/primitives/community',
            active: route.path.startsWith('/primitives/community'),
          },
        ],
      },
      {
        label: 'Projects',
        icon: 'i-ph-folder-open-duotone',
        to: '/',
        search: false,
      },
    ]
  })

  return {
    headerLinksPrimitive,

  }
}

export const usePrimitivesNavigation = createSharedComposable(_usePrimitivesNavigation)
