<script setup lang="ts">
import './styles.css'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../index.ts'
</script>

<template>
  <div>
    <h1>Closed by default</h1>
    <Collapsible class="collapsible_root">
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_animatedContent">
        <div :style="{ padding: '10px' }">
          Content 1
        </div>
      </CollapsibleContent>
    </Collapsible>

    <h1>Open by default</h1>
    <Collapsible default-open class="collapsible_root">
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_animatedContent">
        <div :style="{ padding: '10px' }">
          Content 1
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>
