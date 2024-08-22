<script setup lang="ts">
import { Separator } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <h1>Horizontal</h1>
    <p>The following separator is horizontal and has semantic meaning.</p>
    <Separator class="separator_root" orientation="horizontal" />
    <p>
      The following separator is horizontal and is purely decorative. Assistive technology will
      ignore this element.
    </p>
    <Separator class="separator_root" orientation="horizontal" decorative />

    <h1>Vertical</h1>
    <div :style="{ display: 'flex', alignItems: 'center' }">
      <p>The following separator is vertical and has semantic meaning.</p>
      <Separator class="separator_root" orientation="vertical" />
      <p>
        The following separator is vertical and is purely decorative. Assistive technology will
        ignore this element.
      </p>
      <Separator class="separator_root" orientation="vertical" decorative />
    </div>
  </div>
</template>
