<script setup lang="ts">
import { OkuAspectRatio } from '@oku-ui/aspect-ratio'
</script>

<template>
  <div :style="{ display: 'flex', gap: '20px' }">
    <div :style="{ width: '200px' }">
      <OkuAspectRatio :ratio="1 / 2">
        <img
          src="https://images.unsplash.com/photo-1605030753481-bb38b08c384a?&auto=format&fit=crop&w=400&q=80"
          alt="A house in a forest"
          :style="{ objectFit: 'cover', width: '100%', height: '100%' }"
        >
      </OkuAspectRatio>
    </div>
    <div :style="{ width: '200px' }">
      <OkuAspectRatio>
        <img
          src="https://images.unsplash.com/photo-1605030753481-bb38b08c384a?&auto=format&fit=crop&w=400&q=80"
          alt="A house in a forest"
          :style="{ objectFit: 'cover', width: '100%', height: '100%' }"
        >
      </OkuAspectRatio>
    </div>
    <div :style="{ width: '200px' }">
      <OkuAspectRatio :ratio="16 / 9">
        <img
          src="https://images.unsplash.com/photo-1605030753481-bb38b08c384a?&auto=format&fit=crop&w=400&q=80"
          alt="A house in a forest"
          :style="{ objectFit: 'cover', width: '100%', height: '100%' }"
        >
      </OkuAspectRatio>
    </div>
    <div :style="{ width: '200px' }">
      <OkuAspectRatio :ratio="2 / 1">
        <img
          src="https://images.unsplash.com/photo-1605030753481-bb38b08c384a?&auto=format&fit=crop&w=400&q=80"
          alt="A house in a forest"
          :style="{ objectFit: 'cover', width: '100%', height: '100%' }"
        >
      </OkuAspectRatio>
    </div>
  </div>
</template>
