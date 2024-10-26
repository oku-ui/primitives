<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <h1>Closed by default</h1>
    <CollapsibleRoot class="collapsible_root">
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_animatedContent">
        <div :style="{ padding: '10px' }">
          Content 1
        </div>
      </CollapsibleContent>
    </CollapsibleRoot>

    <h1>Open by default</h1>
    <CollapsibleRoot default-open class="collapsible_root">
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_animatedContent">
        <div :style="{ padding: '10px' }">
          Content 1
        </div>
      </CollapsibleContent>
    </CollapsibleRoot>
  </div>
</template>
