<script setup lang="ts">
import { OkuCollapsible, OkuCollapsibleContent, OkuCollapsibleTrigger } from '@oku-ui/collapsible'
</script>

<template>
  <h1>Closed by default</h1>
  <OkuCollapsible class="collapsible">
    <OkuCollapsibleTrigger class="collapsible-trigger">
      Trigger
    </OkuCollapsibleTrigger>
    <OkuCollapsibleContent class="collapsible-animated-content">
      <div :style="{ padding: '10px' }">
        Content 1
      </div>
    </OkuCollapsibleContent>
  </OkuCollapsible>

  <h1>Open by default</h1>
  <OkuCollapsible default-open class="collapsible">
    <OkuCollapsibleTrigger class="collapsible-trigger">
      Trigger
    </OkuCollapsibleTrigger>
    <OkuCollapsibleContent class="collapsible-animated-content">
      <div :style="{ padding: '10px' }">
        Content 1
      </div>
    </OkuCollapsibleContent>
  </OkuCollapsible>
</template>
