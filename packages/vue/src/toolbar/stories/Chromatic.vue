<script setup lang="ts">
import { OkuDirectionProvider } from '@oku-ui/direction'
import ToolbarExample from './ToolbarExample.vue'
</script>

<template>
  <div>
    <div class="p-10">
      <h1>Example</h1>
      <ToolbarExample />
      <ToolbarExample orientation="vertical" />

      <h1>Direction</h1>
      <h2>Prop</h2>
      <ToolbarExample dir="rtl" />

      <h2>Inherited</h2>
      <OkuDirectionProvider dir="rtl">
        <ToolbarExample />
      </OkuDirectionProvider>
    </div>
  </div>
</template>
