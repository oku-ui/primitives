<script setup lang="ts">
import { ref } from 'vue'
import { OkuCollapsible, OkuCollapsibleContent, OkuCollapsibleTrigger } from '@oku-ui/collapsible'

const open = ref(false)
</script>

<template>
  <OkuCollapsible :open="open" class="collapsible" @open-change="open = $event">
    <OkuCollapsibleTrigger class="collapsible-trigger">
      {{ open ? 'close' : 'open' }}
    </OkuCollapsibleTrigger>
    <OkuCollapsibleContent class="collapsible-content" as-child>
      <article>Content 1</article>
    </OkuCollapsibleContent>
  </OkuCollapsible>
</template>
