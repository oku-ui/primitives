<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { OkuRadioGroup, OkuRadioGroupIndicator, OkuRadioGroupItem } from '@oku-ui/radio-group'
import { OkuDirectionProvider } from '@oku-ui/direction'

const manualFocusRef = ref<HTMLDivElement | null>(null)

watchEffect(() => {
  manualFocusRef.value?.focus()
})
</script>

<template>
  <h1>Uncontrolled</h1>
  <h2>Unset</h2>
  <OkuRadioGroup class="radio-group">
    <OkuRadioGroupItem class="radio-group-item" value="1">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="2">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="3">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
  </OkuRadioGroup>

  <h2>Set</h2>
  <OkuRadioGroup class="radio-group" default-value="3">
    <OkuRadioGroupItem class="radio-group-item" value="1">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="2">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="3">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
  </OkuRadioGroup>

  <h1>Controlled</h1>
  <h2>Unset</h2>
  <OkuRadioGroup class="radio-group" value="">
    <OkuRadioGroupItem class="radio-group-item" value="1">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="2">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="3">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
  </OkuRadioGroup>

  <h2>Set</h2>
  <OkuRadioGroup class="radio-group" value="3">
    <OkuRadioGroupItem class="radio-group-item" value="1">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="2">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="3">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
  </OkuRadioGroup>

  <h1>Disabled item</h1>
  <OkuRadioGroup class="radio-group">
    <OkuRadioGroupItem class="radio-group-item" value="1">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="2" disabled>
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="3">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
  </OkuRadioGroup>

  <h1>Disabled root</h1>
  <OkuRadioGroup class="radio-group" disabled>
    <OkuRadioGroupItem class="radio-group-item" value="1">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <!-- Not possible to set `disabled` back to `false` since it's set on the root (this item
    should still be disabled). -->
    <OkuRadioGroupItem class="radio-group-item" value="2" :disabled="false">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="3">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
  </OkuRadioGroup>

  <h1>All items disabled</h1>
  <OkuRadioGroup class="radio-group">
    <OkuRadioGroupItem class="radio-group-item" value="1" disabled>
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="2" disabled>
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="3" disabled>
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
  </OkuRadioGroup>

  <h1>Manual focus into group</h1>
  <OkuRadioGroup class="radio-group">
    <OkuRadioGroupItem ref="manualFocusRef" class="radio-group-item" value="1">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="2">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="3">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
  </OkuRadioGroup>

  <h1>Force mounted indicator</h1>
  <OkuRadioGroup class="radio-group">
    <OkuRadioGroupItem class="radio-group-item" value="1">
      <OkuRadioGroupIndicator class="radio-group-indicator" force-mount />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="2">
      <OkuRadioGroupIndicator class="radio-group-indicator" force-mount />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="3">
      <OkuRadioGroupIndicator class="radio-group-indicator" force-mount />
    </OkuRadioGroupItem>
  </OkuRadioGroup>

  <h1>Direction</h1>
  <h2>Prop</h2>
  <OkuRadioGroup class="radio-group" default-value="1" dir="rtl">
    <OkuRadioGroupItem class="radio-group-item" value="1">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="2">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-item" value="3">
      <OkuRadioGroupIndicator class="radio-group-indicator" />
    </OkuRadioGroupItem>
  </OkuRadioGroup>

  <h2>Inherited</h2>
  <OkuDirectionProvider dir="rtl">
    <OkuRadioGroup class="radio-group" default-value="1">
      <OkuRadioGroupItem class="radio-group-item" value="1">
        <OkuRadioGroupIndicator class="radio-group-indicator" />
      </OkuRadioGroupItem>
      <OkuRadioGroupItem class="radio-group-item" value="2">
        <OkuRadioGroupIndicator class="radio-group-indicator" />
      </OkuRadioGroupItem>
      <OkuRadioGroupItem class="radio-group-item" value="3">
        <OkuRadioGroupIndicator class="radio-group-indicator" />
      </OkuRadioGroupItem>
    </OkuRadioGroup>
  </OkuDirectionProvider>

  <h1>State attributes</h1>
  <h2>Default</h2>
  <OkuRadioGroup class="radio-group-attr-styles" default-value="3">
    <OkuRadioGroupItem class="radio-group-attr-styles" value="1">
      <OkuRadioGroupIndicator class="radio-group-attr-styles" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-attr-styles" value="2">
      <OkuRadioGroupIndicator class="radio-group-attr-styles" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-attr-styles" value="3">
      <OkuRadioGroupIndicator class="radio-group-attr-styles" />
    </OkuRadioGroupItem>
  </OkuRadioGroup>

  <h2>Disabled item</h2>
  <OkuRadioGroup class="radio-group-attr-styles" default-value="3">
    <OkuRadioGroupItem class="radio-group-attr-styles" value="1">
      <OkuRadioGroupIndicator class="radio-group-attr-styles" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-attr-styles" value="2" disabled>
      <OkuRadioGroupIndicator class="radio-group-attr-styles" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-attr-styles" value="3">
      <OkuRadioGroupIndicator class="radio-group-attr-styles" />
    </OkuRadioGroupItem>
  </OkuRadioGroup>

  <OkuRadioGroup class="radio-group-attr-styles" default-value="2">
    <OkuRadioGroupItem class="radio-group-attr-styles" value="1">
      <OkuRadioGroupIndicator class="radio-group-attr-styles" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-attr-styles" value="2" disabled>
      <OkuRadioGroupIndicator class="radio-group-attr-styles" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-attr-styles" value="3">
      <OkuRadioGroupIndicator class="radio-group-attr-styles" />
    </OkuRadioGroupItem>
  </OkuRadioGroup>

  <h2>Disabled root</h2>
  <OkuRadioGroup class="radio-group-attr-styles" default-value="3" disabled>
    <OkuRadioGroupItem class="radio-group-attr-styles" value="1">
      <OkuRadioGroupIndicator class="radio-group-attr-styles" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-attr-styles" value="2">
      <OkuRadioGroupIndicator class="radio-group-attr-styles" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-attr-styles" value="3">
      <OkuRadioGroupIndicator class="radio-group-attr-styles" />
    </OkuRadioGroupItem>
  </OkuRadioGroup>

  <h2>All items disabled</h2>
  <OkuRadioGroup class="radio-group-attr-styles" default-value="3">
    <OkuRadioGroupItem class="radio-group-attr-styles" value="1" disabled>
      <OkuRadioGroupIndicator class="radio-group-attr-styles" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-attr-styles" value="2" disabled>
      <OkuRadioGroupIndicator class="radio-group-attr-styles" />
    </OkuRadioGroupItem>
    <OkuRadioGroupItem class="radio-group-attr-styles" value="3" disabled>
      <OkuRadioGroupIndicator class="radio-group-attr-styles" />
    </OkuRadioGroupItem>
  </OkuRadioGroup>
</template>
