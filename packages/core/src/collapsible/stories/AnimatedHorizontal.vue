<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <CollapsibleRoot class="collapsible_root">
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_animatedWidthContent">
        <div :style="{ padding: '10px' }">
          Content
        </div>
      </CollapsibleContent>
    </CollapsibleRoot>
  </div>
</template>
