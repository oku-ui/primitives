<script setup lang="ts">
import { Checkbox, CheckboxIndicator } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <h1>Uncontrolled</h1>
    <h2>Unchecked</h2>
    <Checkbox class="checkbox_rootClass">
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </Checkbox>

    <h2>Checked</h2>
    <Checkbox class="checkbox_rootClass" default-checked>
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </Checkbox>

    <h1>Controlled</h1>
    <h2>Unchecked</h2>
    <Checkbox class="checkbox_rootClass" :checked="false">
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </Checkbox>

    <h2>Checked</h2>
    <Checkbox class="checkbox_rootClass" checked>
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </Checkbox>

    <h1>Indeterminate</h1>
    <Checkbox class="checkbox_rootClass" checked="indeterminate">
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </Checkbox>

    <h1>Disabled</h1>
    <Checkbox class="checkbox_rootClass" default-checked disabled>
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </Checkbox>

    <h1>Force mounted indicator</h1>
    <Checkbox class="checkbox_rootClass">
      <CheckboxIndicator class="checkbox_indicatorClass" force-mount :style="{ height: '20px' }" />
    </Checkbox>

    <h1>State attributes</h1>
    <h2>Unchecked</h2>
    <Checkbox class="checkbox_rootAttrClass">
      <CheckboxIndicator class="checkbox_indicatorAttrClass" />
    </Checkbox>

    <h2>Checked</h2>
    <Checkbox class="checkbox_rootAttrClass" default-checked>
      <CheckboxIndicator class="checkbox_indicatorAttrClass" />
    </Checkbox>

    <h2>Indeterminate</h2>
    <Checkbox class="checkbox_rootAttrClass" checked="indeterminate">
      <CheckboxIndicator class="checkbox_indicatorAttrClass" />
    </Checkbox>

    <h2>Disabled</h2>
    <Checkbox class="checkbox_rootAttrClass" default-checked disabled>
      <CheckboxIndicator class="checkbox_indicatorAttrClass" />
    </Checkbox>

    <h2>Force mounted indicator</h2>
    <Checkbox class="checkbox_rootAttrClass">
      <CheckboxIndicator class="checkbox_indicatorAttrClass" force-mount :style="{ height: '20px' }" />
    </Checkbox>
  </div>
</template>
