<script setup lang="ts">
import ToolbarExample from './ToolbarExample.vue'
</script>

<template>
  <div :style="{ padding: 50 }">
    <h1>Example</h1>
    <ToolbarExample />
    <ToolbarExample orientation="vertical" />

    <h1>Direction</h1>
    <h2>Prop</h2>
    <ToolbarExample dir="rtl" />

    <h2>Inherited: WIP</h2>
    <!-- <DirectionProvider dir="rtl"> -->
    <ToolbarExample />
    <!-- </DirectionProvider> -->
  </div>
</template>
