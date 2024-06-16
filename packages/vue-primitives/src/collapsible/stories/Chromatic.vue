<script setup lang="ts">
import './styles.css'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../index.ts'
</script>

<template>
  <div>
    <h1>Uncontrolled</h1>
    <h2>Closed</h2>
    <Collapsible class="collapsible_root">
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_content">
        Content 1
      </CollapsibleContent>
    </Collapsible>

    <h2>Open</h2>
    <Collapsible class="collapsible_root" default-open>
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_content">
        Content 1
      </CollapsibleContent>
    </Collapsible>

    <h1>Controlled</h1>
    <h2>Closed</h2>
    <Collapsible class="collapsible_root" :open="false">
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_content">
        Content 1
      </CollapsibleContent>
    </Collapsible>

    <h2>Open</h2>
    <Collapsible class="collapsible_root" open>
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_content">
        Content 1
      </CollapsibleContent>
    </Collapsible>

    <h1>Disabled</h1>
    <Collapsible class="collapsible_root" disabled>
      <CollapsibleTrigger class="collapsible_trigger">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_content">
        Content 1
      </CollapsibleContent>
    </Collapsible>

    <h1>State attributes</h1>
    <h2>Closed</h2>
    <Collapsible class="collapsible_rootAttr">
      <CollapsibleTrigger class="collapsible_triggerAttr">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_contentAttr">
        Content 1
      </CollapsibleContent>
    </Collapsible>

    <h2>Open</h2>
    <Collapsible class="collapsible_rootAttr" default-open>
      <CollapsibleTrigger class="collapsible_triggerAttr">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_contentAttr">
        Content 1
      </CollapsibleContent>
    </Collapsible>

    <h2>Disabled</h2>
    <Collapsible class="collapsible_rootAttr" default-open disabled>
      <CollapsibleTrigger class="collapsible_triggerAttr">
        Trigger
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible_contentAttr">
        Content 1
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>
