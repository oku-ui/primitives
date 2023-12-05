<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const route = useRoute()

definePageMeta({
  layout: 'primitives',
})

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryContent()
    .where({
      _extension: 'md',
      navigation: {
        $ne: false,
      },
    })
    .only(['title', 'description', '_path'])
    .findSurround(withoutTrailingSlash(route.path))
})

useSeoMeta({
  titleTemplate: '%s - Primitives',
  title: page.value.title,
  ogTitle: `${page.value.title} - Primitives`,
  description: page.value.description,
  ogDescription: page.value.description,
  ogImage: page.value.image,
  twitterTitle: `${page.value.title} - Primitives`,
  twitterDescription: page.value.description,
  twitterImage: page.value.image,
  twitterCard: 'summary_large_image',
  twitterSite: '@oku_ui',
})

defineOgImage({
  component: 'OGImagePrimitives',
  title: page.value.title,
  description: page.value.description,
})

const headline = computed(() => findPageHeadline(page.value))

const links = computed(() => [
  {
    icon: 'i-ph-pencil-duotone',
    label: 'Edit this page',
    to: `https://github.com/oku-ui/primitives/edit/main/.docs/content/primitives/${page?.value?._file.split('/').slice(1).join('/')}`,
    target: '_blank',
  },
  {
    icon: 'i-ph-star-duotone',
    label: 'Star on GitHub',
    to: 'https://github.com/oku-ui/primitives',
    target: '_blank',
  },
  {
    // discord
    icon: 'i-ic-twotone-discord',
    label: 'Chat on Discord',
    to: 'https://chat.oku-ui.com',
    target: '_blank',
  },
  {
    // sponsors
    icon: 'i-ph-heart-duotone',
    label: 'Sponsor on GitHub',
    to: 'https://github.com/sponsors/productdevbook',
    target: '_blank',
  },
])
</script>

<template>
  <UPage>
    <UPageHeader :title="page.title" :description="page.description" :links="page.links" :headline="headline" />

    <UPageBody prose>
      <RadixOku v-if="page.componentName" />
      <ContentRenderer v-if="page.body" :value="page" />

      <UDivider v-if="surround?.length" />

      <UDocsSurround :surround="surround as ParsedContent[]" />
    </UPageBody>

    <template v-if="page.body?.toc?.links?.length" #right>
      <UDocsToc :links="page.body.toc.links">
        <template #bottom>
          <div class="hidden lg:block space-y-6 !mt-6">
            <UDivider v-if="page.body?.toc?.links?.length" dashed />

            <UPageLinks title="Community" :links="links" />
          </div>
        </template>
      </UDocsToc>
    </template>
  </UPage>
</template>
