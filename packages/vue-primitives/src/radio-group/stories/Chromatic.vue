<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <h1>Uncontrolled</h1>
    <h2>Unset</h2>
    <RadioGroupRoot class="radioGroup_rootClass">
      <RadioGroupItem class="radioGroup_itemClass" value="1">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="2">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="3">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
    </RadioGroupRoot>

    <h2>Set</h2>
    <RadioGroupRoot class="radioGroup_rootClass" default-value="2">
      <RadioGroupItem class="radioGroup_itemClass" value="1">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="2">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="3">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
    </RadioGroupRoot>

    <h1>Uncontrolled</h1>
    <h2>Unset</h2>
    <RadioGroupRoot class="radioGroup_rootClass" value="">
      <RadioGroupItem class="radioGroup_itemClass" value="1">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="2">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="3">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
    </RadioGroupRoot>

    <h2>Set</h2>
    <RadioGroupRoot class="radioGroup_rootClass" value="3">
      <RadioGroupItem class="radioGroup_itemClass" value="1">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="2">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="3">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
    </RadioGroupRoot>

    <h1>Disabled item</h1>
    <RadioGroupRoot class="radioGroup_rootClass">
      <RadioGroupItem class="radioGroup_itemClass" value="1">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="2" disabled>
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="3">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
    </RadioGroupRoot>

    <h1>Disabled root</h1>
    <RadioGroupRoot class="radioGroup_rootClass" disabled>
      <RadioGroupItem class="radioGroup_itemClass" value="1">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <!-- Not possible to set `disabled` back to `false` since it's set on the root (this item should still be disabled). -->
      <RadioGroupItem class="radioGroup_itemClass" value="2" :disabled="false">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="3">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
    </RadioGroupRoot>

    <h1>All items disabled</h1>
    <RadioGroupRoot class="radioGroup_rootClass">
      <RadioGroupItem class="radioGroup_itemClass" value="1" disabled>
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="2" disabled>
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="3" disabled>
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
    </RadioGroupRoot>

    <h1>Manual focus into group</h1>
    <RadioGroupRoot class="radioGroup_rootClass">
      <RadioGroupItem
        :ref="(el: any) => {
          const node = el?.$el
          node?.focus()
        }"
        class="radioGroup_itemClass"
        value="1"
      >
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="2">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="3">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
    </RadioGroupRoot>

    <h1>Force mounted indicator</h1>
    <RadioGroupRoot class="radioGroup_rootClass">
      <RadioGroupItem class="radioGroup_itemClass" value="1">
        <RadioGroupIndicator class="radioGroup_indicatorClass" force-mount />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="2">
        <RadioGroupIndicator class="radioGroup_indicatorClass" force-mount />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="3">
        <RadioGroupIndicator class="radioGroup_indicatorClass" force-mount />
      </RadioGroupItem>
    </RadioGroupRoot>

    <h1>Direction</h1>
    <h2>Prop</h2>
    <RadioGroupRoot class="radioGroup_rootClass" default-value="1" dir="rtl">
      <RadioGroupItem class="radioGroup_itemClass" value="1">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="2">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="3">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
    </RadioGroupRoot>

    <h2>Inherited: WIP</h2>
    <RadioGroupRoot class="radioGroup_rootClass" default-value="1" dir="rtl">
      <RadioGroupItem class="radioGroup_itemClass" value="1">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="2">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemClass" value="3">
        <RadioGroupIndicator class="radioGroup_indicatorClass" />
      </RadioGroupItem>
    </RadioGroupRoot>

    <h1>State attributes</h1>
    <h2>Default</h2>
    <RadioGroupRoot class="radioGroup_rootAttrClass" default-value="3">
      <RadioGroupItem class="radioGroup_itemAttrClass" value="1">
        <RadioGroupIndicator class="radioGroup_indicatorAttrClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemAttrClass" value="2">
        <RadioGroupIndicator class="radioGroup_indicatorAttrClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemAttrClass" value="3">
        <RadioGroupIndicator class="radioGroup_indicatorAttrClass" />
      </RadioGroupItem>
    </RadioGroupRoot>

    <h2>Disabled item</h2>
    <RadioGroupRoot class="radioGroup_rootAttrClass" default-value="3">
      <RadioGroupItem class="radioGroup_itemAttrClass" value="1">
        <RadioGroupIndicator class="radioGroup_indicatorAttrClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemAttrClass" value="2" disabled>
        <RadioGroupIndicator class="radioGroup_indicatorAttrClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemAttrClass" value="3">
        <RadioGroupIndicator class="radioGroup_indicatorAttrClass" />
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot class="radioGroup_rootAttrClass" default-value="2">
      <RadioGroupItem class="radioGroup_itemAttrClass" value="1">
        <RadioGroupIndicator class="radioGroup_indicatorAttrClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemAttrClass" value="2" disabled>
        <RadioGroupIndicator class="radioGroup_indicatorAttrClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemAttrClass" value="3">
        <RadioGroupIndicator class="radioGroup_indicatorAttrClass" />
      </RadioGroupItem>
    </RadioGroupRoot>

    <h2>Disabled root</h2>
    <RadioGroupRoot class="radioGroup_rootAttrClass" default-value="3" disabled>
      <RadioGroupItem class="radioGroup_itemAttrClass" value="1">
        <RadioGroupIndicator class="radioGroup_indicatorAttrClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemAttrClass" value="2">
        <RadioGroupIndicator class="radioGroup_indicatorAttrClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemAttrClass" value="3">
        <RadioGroupIndicator class="radioGroup_indicatorAttrClass" />
      </RadioGroupItem>
    </RadioGroupRoot>

    <h2>All items disabled</h2>
    <RadioGroupRoot class="radioGroup_rootAttrClass" default-value="3">
      <RadioGroupItem class="radioGroup_itemAttrClass" value="1" disabled>
        <RadioGroupIndicator class="radioGroup_indicatorAttrClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemAttrClass" value="2" disabled>
        <RadioGroupIndicator class="radioGroup_indicatorAttrClass" />
      </RadioGroupItem>
      <RadioGroupItem class="radioGroup_itemAttrClass" value="3" disabled>
        <RadioGroupIndicator class="radioGroup_indicatorAttrClass" />
      </RadioGroupItem>
    </RadioGroupRoot>
  </div>
</template>
