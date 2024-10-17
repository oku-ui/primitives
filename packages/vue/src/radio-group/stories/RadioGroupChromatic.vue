<script setup lang="ts">
import { OkuDirectionProvider } from '@oku-ui/direction'
import {
  OkuRadioGroup,
  OkuRadioGroupIndicator,
  OkuRadioGroupItem,
} from '@oku-ui/radio-group'
import { onMounted, ref } from 'vue'

const manualFocusRef = ref()

onMounted(() => {
  setTimeout(() => {
    manualFocusRef.value.$el.focus()
  }, 0)
})
</script>

<template>
  <div>
    <h1>Uncontrolled</h1>
    <h2>Unset</h2>
    <OkuRadioGroup class="radio-group-root">
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
    <OkuRadioGroup class="radio-group-root" default-value="3">
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
    <OkuRadioGroup class="radio-group-root" value="">
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
    <OkuRadioGroup class="radio-group-root" value="3">
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
    <OkuRadioGroup class="radio-group-root">
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
    <OkuRadioGroup class="radio-group-root" disabled>
      <OkuRadioGroupItem class="radio-group-item" value="1">
        <OkuRadioGroupIndicator class="radio-group-indicator" />
      </OkuRadioGroupItem>
      {/* Not possible to set `disabled` back to `false` since it's set on the root (this item
      should still be disabled). */}
      <OkuRadioGroupItem class="radio-group-item" value="2" :disabled="false">
        <OkuRadioGroupIndicator class="radio-group-indicator" />
      </OkuRadioGroupItem>
      <OkuRadioGroupItem class="radio-group-item" value="3">
        <OkuRadioGroupIndicator class="radio-group-indicator" />
      </OkuRadioGroupItem>
    </OkuRadioGroup>

    <h1>All items disabled</h1>
    <OkuRadioGroup class="radio-group-root">
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
    <OkuRadioGroup class="radio-group-root">
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
    <OkuRadioGroup class="radio-group-root">
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
    <OkuRadioGroup class="radio-group-root" default-value="1" dir="rtl">
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
      <OkuRadioGroup class="radio-group-root" default-value="1">
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
    <OkuRadioGroup class="attrs" default-value="3">
      <OkuRadioGroupItem class="attrs" value="1">
        <OkuRadioGroupIndicator class="attrs" />
      </OkuRadioGroupItem>
      <OkuRadioGroupItem class="attrs" value="2">
        <OkuRadioGroupIndicator class="attrs" />
      </OkuRadioGroupItem>
      <OkuRadioGroupItem class="attrs" value="3">
        <OkuRadioGroupIndicator class="attrs" />
      </OkuRadioGroupItem>
    </OkuRadioGroup>

    <h2>Disabled item</h2>
    <OkuRadioGroup class="attrs" default-value="3">
      <OkuRadioGroupItem class="attrs" value="1">
        <OkuRadioGroupIndicator class="attrs" />
      </OkuRadioGroupItem>
      <OkuRadioGroupItem class="attrs" value="2" disabled>
        <OkuRadioGroupIndicator class="attrs" />
      </OkuRadioGroupItem>
      <OkuRadioGroupItem class="attrs" value="3">
        <OkuRadioGroupIndicator class="attrs" />
      </OkuRadioGroupItem>
    </OkuRadioGroup>

    <OkuRadioGroup class="attrs" default-value="2">
      <OkuRadioGroupItem class="attrs" value="1">
        <OkuRadioGroupIndicator class="attrs" />
      </OkuRadioGroupItem>
      <OkuRadioGroupItem class="attrs" value="2" disabled>
        <OkuRadioGroupIndicator class="attrs" />
      </OkuRadioGroupItem>
      <OkuRadioGroupItem class="attrs" value="3">
        <OkuRadioGroupIndicator class="attrs" />
      </OkuRadioGroupItem>
    </OkuRadioGroup>

    <h2>Disabled root</h2>
    <OkuRadioGroup class="attrs" default-value="3" disabled>
      <OkuRadioGroupItem class="attrs" value="1">
        <OkuRadioGroupIndicator class="attrs" />
      </OkuRadioGroupItem>
      <OkuRadioGroupItem class="attrs" value="2">
        <OkuRadioGroupIndicator class="attrs" />
      </OkuRadioGroupItem>
      <OkuRadioGroupItem class="attrs" value="3">
        <OkuRadioGroupIndicator class="attrs" />
      </OkuRadioGroupItem>
    </OkuRadioGroup>

    <h2>All items disabled</h2>
    <OkuRadioGroup class="attrs" default-value="3">
      <OkuRadioGroupItem class="attrs" value="1" disabled>
        <OkuRadioGroupIndicator class="attrs" />
      </OkuRadioGroupItem>
      <OkuRadioGroupItem class="attrs" value="2" disabled>
        <OkuRadioGroupIndicator class="attrs" />
      </OkuRadioGroupItem>
      <OkuRadioGroupItem class="attrs" value="3" disabled>
        <OkuRadioGroupIndicator class="attrs" />
      </OkuRadioGroupItem>
    </OkuRadioGroup>
  </div>
</template>

<style>
/* Variables */
:root {
  --gray300: #ccc;
  --red: #ff0000;
  --colors-red: #ff5555;
}

/* Root  */
.radio-group-root {
  display: inline-block;
  vertical-align: middle;
  cursor: default;
}

/* Radio Group Item */
.radio-group-item {
  vertical-align: middle;
  width: 30px;
  height: 30px;
  display: inline-grid;
  padding: 0;
  place-items: center;
  border: 1px solid var(--gray300);
  border-radius: 9999px;

  &:focus {
    outline: none;
    border-color: var(--red);
    box-shadow: 0 0 0 1px var(--colors-red);
  }

  &[data-disabled] {
    opacity: 0.5;
  }
}

/* Indicator */
.radio-group-indicator {
  width: 18px;
  height: 18px;
  background-color: var(--red);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
}

/* Styles */
.radio-group-styles {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[tabindex="0"] {
    box-shadow: inset 0 0 0 2px yellow;
  }

  &:disabled {
    opacity: 0.5;
  }

  &[data-disabled] {
    border-style: dashed;
  }

  &[data-state="unchecked"] {
    border-color: red;
  }

  &[data-state="checked"] {
    border-color: green;
  }
}

.attrs {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[tabindex="0"] {
    box-shadow: inset 0 0 0 2px yellow;
  }

  &:disabled {
    opacity: 0.5
  }

  &[data-disabled] {
    border-style: dashed
  }

  &[data-state="unchecked"] {
    border-color: red
  }

  &[data-state="checked"] {
    border-color: 'green'
  }
}
</style>
