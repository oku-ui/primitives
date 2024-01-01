<script setup lang="ts">
import { OkuCollapsible, OkuCollapsibleContent, OkuCollapsibleTrigger } from '@oku-ui/collapsible'
</script>

<template>
  <h1>Uncontrolled</h1>
  <h2>Closed</h2>
  <OkuCollapsible class="collapsible">
    <OkuCollapsibleTrigger class="collapsible-trigger">
      Trigger
    </OkuCollapsibleTrigger>
    <OkuCollapsibleContent class="collapsible-content">
      Content 1
    </OkuCollapsibleContent>
  </OkuCollapsible>

  <h2>Open</h2>
  <OkuCollapsible class="collapsible" default-open>
    <OkuCollapsibleTrigger class="collapsible-trigger">
      Trigger
    </OkuCollapsibleTrigger>
    <OkuCollapsibleContent class="collapsible-content">
      Content 1
    </OkuCollapsibleContent>
  </OkuCollapsible>

  <h1>Controlled</h1>
  <h2>Closed</h2>
  <OkuCollapsible class="collapsible" :open="false">
    <OkuCollapsibleTrigger class="collapsible-trigger">
      Trigger
    </OkuCollapsibleTrigger>
    <OkuCollapsibleContent class="collapsible-content">
      Content 1
    </OkuCollapsibleContent>
  </OkuCollapsible>

  <h2>Open</h2>
  <OkuCollapsible class="collapsible" open>
    <OkuCollapsibleTrigger class="collapsible-trigger">
      Trigger
    </OkuCollapsibleTrigger>
    <OkuCollapsibleContent class="collapsible-content">
      Content 1
    </OkuCollapsibleContent>
  </OkuCollapsible>

  <h1>Disabled</h1>
  <OkuCollapsible class="collapsible" disabled>
    <OkuCollapsibleTrigger class="collapsible-trigger">
      Trigger
    </OkuCollapsibleTrigger>
    <OkuCollapsibleContent class="collapsible-content">
      Content 1
    </OkuCollapsibleContent>
  </OkuCollapsible>

  <h1>State attributes</h1>
  <h2>Closed</h2>
  <OkuCollapsible class="collapsible-attr-styles">
    <OkuCollapsibleTrigger class="collapsible-attr-styles">
      Trigger
    </OkuCollapsibleTrigger>
    <OkuCollapsibleContent
      class="collapsible-attr-styles"
      :style="{
        // ensure we can see the content (because it has `hidden` attribute)
        display: 'block',
      }"
    >
      Content 1
    </OkuCollapsibleContent>
  </OkuCollapsible>

  <h2>Open</h2>
  <OkuCollapsible class="collapsible-attr-styles" default-open>
    <OkuCollapsibleTrigger class="collapsible-attr-styles">
      Trigger
    </OkuCollapsibleTrigger>
    <OkuCollapsibleContent
      class="collapsible-attr-styles"
      :style="{
        // ensure we can see the content (because it has `hidden` attribute)
        display: 'block',
      }"
    >
      Content 1
    </OkuCollapsibleContent>
  </OkuCollapsible>

  <h2>Disabled</h2>
  <OkuCollapsible class="collapsible-attr-styles" default-open disabled>
    <OkuCollapsibleTrigger class="collapsible-attr-styles">
      Trigger
    </OkuCollapsibleTrigger>
    <OkuCollapsibleContent
      class="collapsible-attr-styles"
      :style="{
        // ensure we can see the content (because it has `hidden` attribute)
        display: 'block',
      }"
    >
      Content 1
    </OkuCollapsibleContent>
  </OkuCollapsible>
</template>
