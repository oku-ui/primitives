<script setup lang="ts">
const dark = useColorMode()

const isDark = ref('dark')

watch(dark, () => {
  isDark.value = dark.value
})

onMounted(() => {
  isDark.value = dark.value
})

const logo = computed(() => {
  return isDark.value === 'dark' ? 'https://raw.githubusercontent.com/oku-ui/static/main/logo/icon-white.svg' : 'https://raw.githubusercontent.com/oku-ui/static/main/logo/icon-dark.svg'
})
</script>

<template>
  <img width="120" :src="logo">
</template>
