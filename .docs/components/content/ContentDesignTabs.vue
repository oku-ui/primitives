<script lang="ts" setup>
const useGlobal = useGlobalStore()
</script>

<template>
  <div class="w-full">
    <slot v-if="useGlobal.design === 'oku'" name="oku" />
    <slot v-else name="radix" />
  </div>
</template>
