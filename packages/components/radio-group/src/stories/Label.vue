<script setup lang="ts">
import { OkuLabel } from '@oku-ui/label'
</script>

<template>
  <OkuLabel
    v-bind="$attrs"
    :style="{
      /* RECOMMENDED_CSS_LABEL */
      /* ensures it can receive vertical margins */
      display: 'inline-block',
      /* better default alignment */
      verticalAlign: 'middle',
      /* mimics default `label` tag (as we render a `span`) */
      cursor: 'default',
    }"
  >
    <slot />
  </OkuLabel>
</template>
