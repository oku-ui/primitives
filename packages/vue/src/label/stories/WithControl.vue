<script setup lang="ts">
import { OkuLabel } from '@oku-ui/label'
import Control from './Control.vue'
</script>

<template>
  <h1>Wrapping control</h1>
  <OkuLabel>
    <Control class="label-control" /> Label
  </OkuLabel>

  <h1>Referencing control</h1>
  <Control id="control" class="label-control" />
  <OkuLabel for="control">
    Label
  </OkuLabel>
</template>
