<script setup lang="ts">
import Contributors from './Contributors.vue'
</script>

<template>
  <div class="content px-6 sm:px-[48px] lg:px-[64px]">
    <div class="mx-auto w-full container max-w-[1152px]">
      <main class="w-full">
        <div class="vp-doc flex flex-col items-center mt-10">
          <h2
            id="the-team"
            class="font-medium pt-5 pb-2"
          >
            Crafted with passion by Vue enthusiasts 💚
          </h2>
          <p class="text-lg max-w-200 text-center leading-7">
            <Contributors />
            <br>
            <a
              href="https://chat.oku-ui.com"
              rel="noopener noreferrer"
            >Join the community</a> and get involved!
          </p>
        </div>
      </main>
    </div>
  </div>
</template>
