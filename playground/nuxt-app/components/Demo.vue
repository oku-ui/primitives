<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <section class="demo-box">
    <header class="demo-box__header">
      <h2>{{ title }}</h2>
    </header>
    <div class="demo-box__content">
      <slot />
    </div>
  </section>
</template>

<style>
.demo-box__content {
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  box-shadow: var(--shadow-2);
  max-width: 1000px;
}

.demo-box__content>*:first-child {
  margin-top: 0;
}
</style>
