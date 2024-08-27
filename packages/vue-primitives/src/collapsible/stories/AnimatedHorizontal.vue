<script setup lang="ts">
import './styles.css'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from '../index.ts'
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
