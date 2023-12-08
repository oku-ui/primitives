<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import type { NavItem } from '@nuxt/content/dist/runtime/types'

definePageMeta({
  layout: 'primitives',
})

const navigation = inject<Ref<NavItem[]>>('navigation')

const route = useRoute()
const { navKeyFromPath } = useContentHelpers()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

const { data: surround } = await useAsyncData(`${route.path}-surround`, async () => {
  if (page.value.surround === false)
    return []

  return queryContent('/primitives')
    .where({ _extension: 'md', navigation: { $ne: false } })
    .without(['body', 'excerpt'])
    .findSurround(withoutTrailingSlash(route.path))
})

const breadcrumb = computed(() => {
  const links = mapContentNavigation(findPageBreadcrumb(navigation.value, page.value)).map(link => ({
    label: link.label,
    to: link.to,
  }))

  return links
})

const titleTemplate = computed(() => {
  if (page.value.titleTemplate)
    return page.value.titleTemplate
  const titleTemplate = navKeyFromPath(route.path, 'titleTemplate', navigation.value)
  if (titleTemplate)
    return titleTemplate
  return '%s · Primitives · Oku'
})

const communityLinks = computed(() => [{
  icon: 'i-ph-pen-duotone',
  label: 'Edit this page',
  to: `https://github.com/oku-ui/primitives/edit/main/.docs/content/primitives/${page?.value?._file?.split('/').slice(1).join('/')}`,
  target: '_blank',
}, {
  icon: 'i-ph-shooting-star-duotone',
  label: 'Star on GitHub',
  to: 'https://github.com/oku-ui/primitives',
  target: '_blank',
}, {
  icon: 'i-ph-chat-centered-text-duotone',
  label: 'Chat on Discord',
  to: 'https://chat.productdevbook.com',
  target: '_blank',
}, {
  icon: 'i-ph-hand-heart-duotone',
  label: 'Become a Sponsor',
  to: 'https://github.com/sponsors/productdevbook',
  target: '_blank',
}])

const ecosystemLinks = [{
  icon: 'i-ph-graduation-cap-duotone',
  label: 'Video Courses',
  to: 'https://masteringnuxt.com/nuxt3?ref=oku-ui.com',
  target: '_blank',
}]

const title = page.value.head?.title || page.value.title
const description = page.value.head?.description || page.value.description

useSeoMeta({
  titleTemplate,
  title,
  description,
  ogDescription: description,
  ogTitle: titleTemplate.value?.includes('%s') ? titleTemplate.value.replace('%s', title) : title,
})

// defineOgImage({
//   component: 'Pergel',
//   title,
//   description,
//   headline: breadcrumb.value.length ? breadcrumb.value[breadcrumb.value.length - 1].label : '',
// })
</script>

<template>
  <UPage
    :ui="{
      right: 'sticky top-[--header-height] bg-background/75 backdrop-blur group -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-4 lg:-mx-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))]',
    }"
  >
    <UPageHeader v-bind="page">
      <template #headline>
        <UBreadcrumb :links="breadcrumb" />
      </template>
    </UPageHeader>

    <UPageBody prose>
      <ContentRenderer v-if="page && page.body" :value="page" />

      <hr v-if="surround?.length">

      <UDocsSurround :surround="surround" />
    </UPageBody>

    <template v-if="page.toc !== false" #right>
      <UDocsToc :links="page.body?.toc?.links" :ui="{ wrapper: '' }">
        <template #bottom>
          <div class="hidden lg:block space-y-6" :class="{ '!mt-6': page.body?.toc?.links?.length }">
            <UDivider v-if="page.body?.toc?.links?.length" type="dashed" />

            <UPageLinks title="Community" :links="communityLinks" />

            <UDivider type="dashed" />

            <UPageLinks title="Ecosystem" :links="ecosystemLinks" />

            <UDivider type="dashed" />
          </div>
        </template>
      </UDocsToc>
    </template>
  </UPage>
</template>
