<script setup lang="ts">
import { ToggleGroupItem, ToggleGroupRoot } from '../index.ts'
import './styles.css'
</script>

<template>
  <h1>Single</h1>
  <h2>Off</h2>
  <ToggleGroupRoot type="single" class="toggleGroup_root">
    <ToggleGroupItem value="1" class="toggleGroup_item">
      Option 1
    </ToggleGroupItem>
    <ToggleGroupItem value="2" class="toggleGroup_item">
      Option 2
    </ToggleGroupItem>
    <ToggleGroupItem value="3" class="toggleGroup_item" disabled>
      Option 3
    </ToggleGroupItem>
  </ToggleGroupRoot>

  <h2>On</h2>
  <ToggleGroupRoot type="single" class="toggleGroup_root" default-value="1">
    <ToggleGroupItem value="1" class="toggleGroup_item">
      Option 1
    </ToggleGroupItem>
    <ToggleGroupItem value="2" class="toggleGroup_item">
      Option 2
    </ToggleGroupItem>
    <ToggleGroupItem value="3" class="toggleGroup_item" disabled>
      Option 3
    </ToggleGroupItem>
  </ToggleGroupRoot>

  <h2>Disabled</h2>
  <ToggleGroupRoot type="single" class="toggleGroup_root" disabled>
    <ToggleGroupItem value="1" class="toggleGroup_item">
      Option 1
    </ToggleGroupItem>
    <ToggleGroupItem value="2" class="toggleGroup_item">
      Option 2
    </ToggleGroupItem>
    <ToggleGroupItem value="3" class="toggleGroup_item">
      Option 3
    </ToggleGroupItem>
  </ToggleGroupRoot>

  <h1>Multiple</h1>
  <h2>Off</h2>
  <ToggleGroupRoot type="multiple" class="toggleGroup_root">
    <ToggleGroupItem value="1" class="toggleGroup_item">
      Option 1
    </ToggleGroupItem>
    <ToggleGroupItem value="2" class="toggleGroup_item">
      Option 2
    </ToggleGroupItem>
    <ToggleGroupItem value="3" class="toggleGroup_item" disabled>
      Option 3
    </ToggleGroupItem>
  </ToggleGroupRoot>

  <h2>One on</h2>
  <ToggleGroupRoot
    type="multiple" class="toggleGroup_root" :default-value="['1']"
  >
    <ToggleGroupItem value="1" class="toggleGroup_item">
      Option 1
    </ToggleGroupItem>
    <ToggleGroupItem value="2" class="toggleGroup_item">
      Option 2
    </ToggleGroupItem>
    <ToggleGroupItem value="3" class="toggleGroup_item" disabled>
      Option 3
    </ToggleGroupItem>
  </ToggleGroupRoot>

  <h2>One and two on</h2>
  <ToggleGroupRoot
    type="multiple" class="toggleGroup_root" :default-value="['1', '2']"
  >
    <ToggleGroupItem value="1" class="toggleGroup_item">
      Option 1
    </ToggleGroupItem>
    <ToggleGroupItem value="2" class="toggleGroup_item">
      Option 2
    </ToggleGroupItem>
    <ToggleGroupItem value="3" class="toggleGroup_item">
      Option 3
    </ToggleGroupItem>
  </ToggleGroupRoot>

  <h2>Disabled</h2>
  <ToggleGroupRoot type="multiple" class="toggleGroup_root" disabled>
    <ToggleGroupItem value="1" class="toggleGroup_item">
      Option 1
    </ToggleGroupItem>
    <ToggleGroupItem value="2" class="toggleGroup_item">
      Option 2
    </ToggleGroupItem>
    <ToggleGroupItem value="3" class="toggleGroup_item">
      Option 3
    </ToggleGroupItem>
  </ToggleGroupRoot>

  <h1>Direction</h1>
  <h2>Prop</h2>
  <ToggleGroupRoot type="single" class="toggleGroup_root" default-value="1" dir="rtl">
    <ToggleGroupItem value="1" class="toggleGroup_item">
      Option 1
    </ToggleGroupItem>
    <ToggleGroupItem value="2" class="toggleGroup_item">
      Option 2
    </ToggleGroupItem>
    <ToggleGroupItem value="3" class="toggleGroup_item" disabled>
      Option 3
    </ToggleGroupItem>
  </ToggleGroupRoot>

  <h2>Inherited WIP:DirectionProvider</h2>
  <!-- <DirectionProvider dir="rtl"> -->
  <ToggleGroupRoot type="single" class="toggleGroup_root" default-value="1">
    <ToggleGroupItem value="1" class="toggleGroup_item">
      Option 1
    </ToggleGroupItem>
    <ToggleGroupItem value="2" class="toggleGroup_item">
      Option 2
    </ToggleGroupItem>
    <ToggleGroupItem value="3" class="toggleGroup_item" disabled>
      Option 3
    </ToggleGroupItem>
  </ToggleGroupRoot>
  <!-- </DirectionProvider> -->

  <h1>State attributes</h1>
  <h2>Group disabled</h2>
  <ToggleGroupRoot type="multiple" class="toggleGroup_root" :default-value="['1', '2']" disabled>
    <ToggleGroupItem value="1" class="toggleGroup_itemAttr">
      Option 1
    </ToggleGroupItem>
    <ToggleGroupItem value="2" class="toggleGroup_itemAttr">
      Option 2
    </ToggleGroupItem>
    <ToggleGroupItem value="3" class="toggleGroup_itemAttr">
      Option 3
    </ToggleGroupItem>
    <ToggleGroupItem value="4" class="toggleGroup_itemAttr">
      Option 4
    </ToggleGroupItem>
  </ToggleGroupRoot>

  <h2>Group enabled with button override</h2>
  <ToggleGroupRoot
    type="multiple"
    class="toggleGroup_root"
    :default-value="['1', '2']"
    :disabled="false"
  >
    <ToggleGroupItem value="1" class="toggleGroup_itemAttr">
      Option 1
    </ToggleGroupItem>
    <ToggleGroupItem value="2" class="toggleGroup_itemAttr" disabled>
      Option 2
    </ToggleGroupItem>
    <ToggleGroupItem value="3" class="toggleGroup_itemAttr">
      Option 3
    </ToggleGroupItem>
    <ToggleGroupItem value="4" class="toggleGroup_itemAttr" disabled>
      Option 4
    </ToggleGroupItem>
  </ToggleGroupRoot>

  <h2>Group disabled with button override</h2>
  <ToggleGroupRoot
    type="multiple"
    class="toggleGroup_root"
    :default-value="['1', '2']"
    :disabled="true"
  >
    <ToggleGroupItem value="1" class="toggleGroup_itemAttr">
      Option 1
    </ToggleGroupItem>
    <ToggleGroupItem value="2" class="toggleGroup_itemAttr" :disabled="false">
      Option 2
    </ToggleGroupItem>
    <ToggleGroupItem value="3" class="toggleGroup_itemAttr">
      Option 3
    </ToggleGroupItem>
    <ToggleGroupItem value="4" class="toggleGroup_itemAttr" :disabled="false">
      Option 4
    </ToggleGroupItem>
  </ToggleGroupRoot>
</template>
