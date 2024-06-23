<script setup lang="ts">
import { Label } from '../index.ts'
import Control from './Control.vue'
import './styles.css'
</script>

<template>
  <div>
    <h1>Wrapping control</h1>
    <Label>
      <Control class="label_controlClass" /> Label
    </Label>

    <h1>Referencing control</h1>
    <Control id="control" class="label_controlClass" />
    <Label for="control">Label</Label>
  </div>
</template>
