<script setup lang="ts">
import './styles.css'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../index.ts'
</script>

<template>
  <div>
    <Collapsible class="collapsible_root">
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_animatedWidthContent">
        <div :style="{ padding: '10px' }">
          Content
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>
