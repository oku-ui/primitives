<script setup lang="ts">
import {
  OkuRadioGroup,
  OkuRadioGroupIndicator,
  OkuRadioGroupItem,
} from '@oku-ui/radio-group'
import {
  OkuLabel,
} from '@oku-ui/label'

export interface ITabsProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

defineProps<ITabsProps>()
</script>

<template>
  <div v-if="template === '#1' || allshow">
    <h1>Horizontal (automatic activation)</h1>
    <OkuLabel>
      Favourite pet
      <OkuRadioGroup default-value="1" class="radio-group-rootClass">
        <OkuLabel>
          <OkuRadioGroupItem value="1" class="radio-group-itemClass">
            <OkuRadioGroupIndicator class="radio-group-indicatorClass" />
          </OkuRadioGroupItem>
          Cat
        </OkuLabel>
        <OkuLabel>
          <OkuRadioGroupItem value="2" class="radio-group-itemClass">
            <OkuRadioGroupIndicator class="radio-group-indicatorClass" />
          </OkuRadioGroupItem>
          Dog
        </OkuLabel>
        <OkuLabel>
          <OkuRadioGroupItem value="3" class="radio-group-itemClass">
            <OkuRadioGroupIndicator class="radio-group-indicatorClass" />
          </OkuRadioGroupItem>
          Rabbit
        </OkuLabel>
      </OkuRadioGroup>
    </OkuLabel>
  </div>
</template>

<style>
/* Variables */
:root {
  --gray300: #ccc;
  --red: #ff0000;
  --colors-red: #ff5555;
}

/* Root Class */
.radio-group-rootClass {
  display: inline-block;
  vertical-align: middle;
  cursor: default;
}

/* Radio Group Item */
.radio-group-itemClass {
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
.radio-group-indicatorClass {
  width: 18px;
  height: 18px;
  background-color: var(--red);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;

  &[data-state="checked"] {
    animation: radio-group-fadeIn 300ms ease-out;
  }

  &[data-state="unchecked"] {
    animation: radio-group-fadeOut 300ms ease-in;
  }
}

/* Animations */
@keyframes radio-group-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes radio-group-fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
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
</style>
