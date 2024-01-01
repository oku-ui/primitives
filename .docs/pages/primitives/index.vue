<script setup lang="ts">
const title = '1:1 Radix UI components for Vue'
const desc = 'Unstyled, accessible components for building high‑quality design systems and web apps in React.Unstyled, accessible components for building high‑quality design systems and web apps in Vue.'

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description: desc,
  ogDescription: desc,
  ogImage: 'https://oku-ui.com/primitives-og-image.png',
  twitterImage: 'https://oku-ui.com/primitives-og-image.png',
})
</script>

<template>
  <div>
    <span class="gradient" />

    <ULandingHero orientation="horizontal" class="!py-18 md:py-0 md:!pt-32 relative" :ui="{ container: 'flex lg:gap-4' }">
      <div class="hidden lg:block relative w-[500px]">
        <Illustration class="h-[480px]" />
      </div>
      <template #title>
        <span class="text-primary-400">1:1 </span> Radix UI / Primitives components for Vue
      </template>
      <template #description>
        Unstyled, accessible components for building high‑quality design systems and web apps in React.Unstyled, accessible components for building high‑quality design systems and web apps in Vue.
      </template>
      <template #links>
        <UButton to="/primitives/getting-started" icon="i-ph-rocket-launch-duotone" size="xl">
          Get started
        </UButton>
        <!-- <UInput aria-label="Copy code to get started" :model-value="source" name="get-started" disabled autocomplete="off"
          size="xl" :ui="{ base: 'disabled:cursor-default', icon: { trailing: { pointer: '' } } }">
          <template #leading>
            <UIcon name="i-ph-terminal" />
          </template>
          <template #trailing>
            <UButton aria-label="Copy Code" :color="copied ? 'green' : 'gray'" variant="ghost" :padded="false"
              :icon="copied ? 'i-ph-check-square-duotone' : 'i-ph-copy-duotone'" @click="copy(source)" />
          </template>
        </UInput> -->
      </template>
    </ULandingHero>

    <ULandingSection>
      <template #title>
        1:1 Radix Primitives components for Vue

        <br><span class="text-primary-400">Vue, Nuxt Support</span>
      </template>
      <PrimitivesShow />
    </ULandingSection>
  </div>
</template>

<style scoped>
.gradient {
  position: fixed;
  top: 25vh;
  width: 100%;
  height: 30vh;
  background: radial-gradient(50% 50% at 50% 50%, #03445e 0%, rgba(0, 220, 130, 0) 100%);
  filter: blur(180px);
  opacity: 0.6;
  z-index: -1;
}
</style>
