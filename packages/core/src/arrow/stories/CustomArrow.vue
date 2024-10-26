<script setup lang="ts">
import { Arrow } from '../index.ts'
</script>

<template>
  <div>
    <Arrow as="template">
      <div
        :style="{
          width: '20px',
          height: '10px',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          backgroundColor: 'tomato',
        }"
      />
    </Arrow>
  </div>
</template>
