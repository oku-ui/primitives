<script setup lang="ts">
import './styles.css'
import { TooltipTrigger, useTooltipProvider } from '../index.ts'
import SimpleTooltip from './SimpleTooltip.vue'

useTooltipProvider()
</script>

<template>
  <div>
    <p>
      Hello this is a test with{{ ' ' }}
      <SimpleTooltip label="This is a tooltip">
        <TooltipTrigger as="template">
          <a href="https://workos.com">TooltipRoot</a>
        </TooltipTrigger>
      </SimpleTooltip>{{ ' ' }}
      inside a Text Component{{ ' ' }}
      <SimpleTooltip label="This is a tooltip" side="top">
        <TooltipTrigger as="template">
          <a href="https://workos.com">TooltipRoot</a>
        </TooltipTrigger>
      </SimpleTooltip>{{ ' ' }}
      some more text{{ ' ' }}
      <SimpleTooltip label="This is a tooltip" side="right" align="center">
        <TooltipTrigger as="template">
          <a href="https://workos.com">TooltipRoot</a>
        </TooltipTrigger>
      </SimpleTooltip>{{ ' ' }}
    </p>
  </div>
</template>
