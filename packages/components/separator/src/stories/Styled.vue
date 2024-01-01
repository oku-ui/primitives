<script setup lang="ts">
import { OkuSeparator } from '@oku-ui/separator'
</script>

<template>
  <h1>Horizontal</h1>
  <p>The following separator is horizontal and has semantic meaning.</p>
  <OkuSeparator class="separator" orientation="horizontal" />
  <p>
    The following separator is horizontal and is purely decorative. Assistive technology will
    ignore this element.
  </p>
  <OkuSeparator class="separator" orientation="horizontal" decorative />

  <h1>Vertical</h1>
  <div :style="{ display: 'flex', alignItems: 'center' }">
    <p>The following separator is vertical and has semantic meaning.</p>
    <OkuSeparator class="separator" orientation="vertical" />
    <p>
      The following separator is vertical and is purely decorative. Assistive technology will
      ignore this element.
    </p>
    <OkuSeparator class="separator" orientation="vertical" decorative />
  </div>
</template>
