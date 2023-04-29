<script setup lang="ts">
import { OkuLabel } from '@oku-ui/label'
</script>

<template>
  <div>
    <div class="flex flex-col">
      <OkuLabel deneme class="text-black text-2xl" for="firstName">
        Label
      </OkuLabel>
      <input id="firstName" class="mt-4" type="text" defaultValue="Pedro Duarte">
    </div>
  </div>
</template>
