<script setup lang="ts">
import { OkuCollapsible, OkuCollapsibleContent, OkuCollapsibleTrigger } from '@oku-ui/collapsible'
</script>

<template>
  <OkuCollapsible class="collapsible">
    <OkuCollapsibleTrigger class="collapsible-trigger">
      Trigger
    </OkuCollapsibleTrigger>
    <OkuCollapsibleContent class="collapsible-animated-width-content">
      <div :style="{ padding: '10px' }">
        Content
      </div>
    </OkuCollapsibleContent>
  </OkuCollapsible>
</template>
