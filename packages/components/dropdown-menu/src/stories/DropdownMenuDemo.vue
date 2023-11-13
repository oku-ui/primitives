<script setup lang="ts">
import Styled from './Styled.vue'
import Submenus from './Submenus.vue'
import WithLabels from './WithLabels.vue'
import NestedComposition from './NestedComposition.vue'
import SingleItemAsDialogTrigger from './SingleItemAsDialogTrigger.vue'
import MultipleItemsAsDialogTriggers from './MultipleItemsAsDialogTriggers.vue'
import CheckboxItems from './CheckboxItems.vue'
import RadioItems from './RadioItems.vue'
import PreventClosing from './PreventClosing.vue'
import WithTooltip from './WithTooltip.vue'
import InPopupWindow from './InPopupWindow.vue'
import Chromatic from './Chromatic.vue'

withDefaults(defineProps<IDropdownMenuProps>(), {})

export interface IDropdownMenuProps {
  template?: 'Styled' | 'Submenus' | 'WithLabels' | 'NestedComposition' | 'SingleItemAsDialogTrigger' | 'MultipleItemsAsDialogTriggers' | 'CheckboxItems' | 'RadioItems' | 'PreventClosing' | 'WithTooltip' | 'InPopupWindow' | 'Chromatic'
  allshow?: boolean
}
</script>

<template>
  <div>
    <template v-if="template === 'Styled' || allshow">
      <Styled />
    </template>

    <template v-if="template === 'Submenus' || allshow">
      <Submenus />
    </template>

    <template v-if="template === 'WithLabels' || allshow">
      <WithLabels />
    </template>

    <template v-if="template === 'NestedComposition' || allshow">
      <NestedComposition />
    </template>

    <template v-if="template === 'SingleItemAsDialogTrigger' || allshow">
      <SingleItemAsDialogTrigger />
    </template>

    <template v-if="template === 'MultipleItemsAsDialogTriggers' || allshow">
      <MultipleItemsAsDialogTriggers />
    </template>

    <template v-if="template === 'CheckboxItems' || allshow">
      <CheckboxItems />
    </template>

    <template v-if="template === 'RadioItems' || allshow">
      <RadioItems />
    </template>

    <template v-if="template === 'PreventClosing' || allshow">
      <PreventClosing />
    </template>

    <template v-if="template === 'WithTooltip' || allshow">
      <WithTooltip />
    </template>

    <template v-if="template === 'InPopupWindow' || allshow">
      <InPopupWindow />
    </template>

    <template v-if="template === 'Chromatic' || allshow">
      <Chromatic />
    </template>
  </div>
</template>

<style>
.dropdown-menu-content {
  display: inline-block;
  box-sizing: border-box;
  min-width: 130px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  font-family: apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif;
  font-size: 13px;
  &:focus-within {
    border-color: #111;
  }
}

.dropdown-menu-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1px;
  cursor: default;
  user-select: none;
  white-space: nowrap;
  height: 25px;
  padding: 0px 10px;
  color: #111;
  border-radius: 3px;

  color: #ccc;
}

.dropdown-menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1px;
  cursor: default;
  user-select: none;
  white-space: nowrap;
  height: 25px;
  padding: 0px 10px;
  color: #111;
  border-radius: 3px;

  outline: none;

  &[data-highlighted] {
    background-color: #111;
    color: #fff;
  }

  &[data-disabled] {
    color: #ccc;
  }
}

.dropdown-menu-sub-trigger {
  &:not([data-highlighted])[data-state="open"] {
    background-color: #ccc;
    color: #111;
  }
}

.dropdown-menu-separator {
  height: 1px;
  margin: 5px 10px;
  background-color: #ccc;
}

.dropdown-menu-trigger {
  border: 1px solid #111;
  border-radius: 6px;
  background-color: transparent;
  padding: 5px 10px;
  font-family: apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif;
  font-size: 13px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5),
  }
}

.dropdown-menu-grid {
  display: inline-grid;
  grid-template-columns: repeat(3, 50px);
  column-gap: 150px;
  row-gap: 100px;
  padding: 100px;
  border: 1px solid black;
}

.dropdown-menu-dialog {
  position: fixed;
  background: white;
  border: 1px solid black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
}

.dropdown-menu-chromatic-trigger {
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  background-color: tomato;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.dropdown-menu-chromatic-content {
  box-sizing: border-box;
  display: grid;
  place-content: center;
  width: 60px;
  height: 60px;
  background-color: royalblue;
  color: white;
  font-size: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3),
}

.dropdown-menu-chromatic-arrow {
  fill: black,
}

.dropdown-menu-attr-styles {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  [data-disabled] { border-style: dashed };

  &[data-state="closed"] { border-color: red };
  &[data-state="open"] { border-color: green };
}
</style>
