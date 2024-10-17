<script setup lang="ts">
import { OkuDirectionProvider } from '@oku-ui/direction'
import { OkuToggleGroup, OkuToggleGroupItem } from '@oku-ui/toggle-group'
</script>

<template>
  <h1>Single</h1>
  <h2>Off</h2>
  <OkuToggleGroup type="single" class="toggle-group">
    <OkuToggleGroupItem value="1" class="toggle-group-item">
      Option 1
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="2" class="toggle-group-item">
      Option 2
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="3" class="toggle-group-item" disabled>
      Option 3
    </OkuToggleGroupItem>
  </OkuToggleGroup>

  <h2>On</h2>
  <OkuToggleGroup type="single" class="toggle-group" default-value="1">
    <OkuToggleGroupItem value="1" class="toggle-group-item">
      Option 1
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="2" class="toggle-group-item">
      Option 2
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="3" class="toggle-group-item" disabled>
      Option 3
    </OkuToggleGroupItem>
  </OkuToggleGroup>

  <h2>Disabled</h2>
  <OkuToggleGroup type="single" class="toggle-group" disabled>
    <OkuToggleGroupItem value="1" class="toggle-group-item">
      Option 1
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="2" class="toggle-group-item">
      Option 2
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="3" class="toggle-group-item">
      Option 3
    </OkuToggleGroupItem>
  </OkuToggleGroup>

  <h1>Multiple</h1>
  <h2>Off</h2>
  <OkuToggleGroup type="multiple" class="toggle-group">
    <OkuToggleGroupItem value="1" class="toggle-group-item">
      Option 1
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="2" class="toggle-group-item">
      Option 2
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="3" class="toggle-group-item" disabled>
      Option 3
    </OkuToggleGroupItem>
  </OkuToggleGroup>

  <h2>One on</h2>
  <OkuToggleGroup type="multiple" class="toggle-group" :default-value="['1']">
    <OkuToggleGroupItem value="1" class="toggle-group-item">
      Option 1
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="2" class="toggle-group-item">
      Option 2
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="3" class="toggle-group-item" disabled>
      Option 3
    </OkuToggleGroupItem>
  </OkuToggleGroup>

  <h2>One and two on</h2>
  <OkuToggleGroup type="multiple" class="toggle-group" :default-value="['1', '2']">
    <OkuToggleGroupItem value="1" class="toggle-group-item">
      Option 1
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="2" class="toggle-group-item">
      Option 2
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="3" class="toggle-group-item">
      Option 3
    </OkuToggleGroupItem>
  </OkuToggleGroup>

  <h2>Disabled</h2>
  <OkuToggleGroup type="multiple" class="toggle-group" disabled>
    <OkuToggleGroupItem value="1" class="toggle-group-item">
      Option 1
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="2" class="toggle-group-item">
      Option 2
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="3" class="toggle-group-item">
      Option 3
    </OkuToggleGroupItem>
  </OkuToggleGroup>

  <h1>Direction</h1>
  <h2>Prop</h2>
  <OkuToggleGroup type="single" class="toggle-group" default-value="1" dir="rtl">
    <OkuToggleGroupItem value="1" class="toggle-group-item">
      Option 1
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="2" class="toggle-group-item">
      Option 2
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="3" class="toggle-group-item" disabled>
      Option 3
    </OkuToggleGroupItem>
  </OkuToggleGroup>

  <h2>Inherited</h2>
  <OkuDirectionProvider dir="rtl">
    <OkuToggleGroup type="single" class="toggle-group" default-value="1">
      <OkuToggleGroupItem value="1" class="toggle-group-item">
        Option 1
      </OkuToggleGroupItem>
      <OkuToggleGroupItem value="2" class="toggle-group-item">
        Option 2
      </OkuToggleGroupItem>
      <OkuToggleGroupItem value="3" class="toggle-group-item" disabled>
        Option 3
      </OkuToggleGroupItem>
    </OkuToggleGroup>
  </OkuDirectionProvider>

  <h1>State attributes</h1>
  <h2>Group disabled</h2>
  <OkuToggleGroup type="multiple" class="toggle-group" :default-value="['1', '2']" disabled>
    <OkuToggleGroupItem value="1" class="toggle-group-attr-styles">
      Option 1
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="2" class="toggle-group-attr-styles">
      Option 2
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="3" class="toggle-group-attr-styles">
      Option 3
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="4" class="toggle-group-attr-styles">
      Option 4
    </OkuToggleGroupItem>
  </OkuToggleGroup>

  <h2>Group enabled with button override</h2>
  <OkuToggleGroup
    type="multiple"
    class="toggle-group"
    default-value="['1', '2']"
    :disabled="false"
  >
    <OkuToggleGroupItem value="1" class="toggle-group-attr-styles">
      Option 1
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="2" class="toggle-group-attr-styles" disabled>
      Option 2
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="3" class="toggle-group-attr-styles">
      Option 3
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="4" class="toggle-group-attr-styles" disabled>
      Option 4
    </OkuToggleGroupItem>
  </OkuToggleGroup>

  <h2>Group disabled with button override</h2>
  <OkuToggleGroup
    type="multiple"
    class="toggle-group"
    default-value="['1', '2']"
    :disabled="true"
  >
    <OkuToggleGroupItem value="1" class="toggle-group-attr-styles">
      Option 1
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="2" class="toggle-group-attr-styles" :disabled="false">
      Option 2
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="3" class="toggle-group-attr-styles">
      Option 3
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="4" class="toggle-group-attr-styles" :disabled="false">
      Option 4
    </OkuToggleGroupItem>
  </OkuToggleGroup>
</template>
