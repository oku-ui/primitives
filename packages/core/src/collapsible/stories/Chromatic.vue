<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <h1>Uncontrolled</h1>
    <h2>Closed</h2>
    <CollapsibleRoot class="collapsible_root">
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_content">
        Content 1
      </CollapsibleContent>
    </CollapsibleRoot>

    <h2>Open</h2>
    <CollapsibleRoot class="collapsible_root" default-open>
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_content">
        Content 1
      </CollapsibleContent>
    </CollapsibleRoot>

    <h1>Controlled</h1>
    <h2>Closed</h2>
    <CollapsibleRoot class="collapsible_root" :open="false">
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_content">
        Content 1
      </CollapsibleContent>
    </CollapsibleRoot>

    <h2>Open</h2>
    <CollapsibleRoot class="collapsible_root" open>
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_content">
        Content 1
      </CollapsibleContent>
    </CollapsibleRoot>

    <h1>Disabled</h1>
    <CollapsibleRoot class="collapsible_root" disabled>
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_content">
        Content 1
      </CollapsibleContent>
    </CollapsibleRoot>

    <h1>State attributes</h1>
    <h2>Closed</h2>
    <CollapsibleRoot class="collapsible_rootAttr">
      <CollapsibleTrigger class="collapsible_triggerAttr">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_contentAttr">
        Content 1
      </CollapsibleContent>
    </CollapsibleRoot>

    <h2>Open</h2>
    <CollapsibleRoot class="collapsible_rootAttr" default-open>
      <CollapsibleTrigger class="collapsible_triggerAttr">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_contentAttr">
        Content 1
      </CollapsibleContent>
    </CollapsibleRoot>

    <h2>Disabled</h2>
    <CollapsibleRoot class="collapsible_rootAttr" default-open disabled>
      <CollapsibleTrigger class="collapsible_triggerAttr">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_contentAttr">
        Content 1
      </CollapsibleContent>
    </CollapsibleRoot>
  </div>
</template>
