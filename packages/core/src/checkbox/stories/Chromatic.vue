<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <h1>Uncontrolled</h1>
    <h2>Unchecked</h2>
    <CheckboxRoot class="checkbox_rootClass">
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </CheckboxRoot>

    <h2>Checked</h2>
    <CheckboxRoot class="checkbox_rootClass" default-checked>
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </CheckboxRoot>

    <h1>Controlled</h1>
    <h2>Unchecked</h2>
    <CheckboxRoot class="checkbox_rootClass" :checked="false">
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </CheckboxRoot>

    <h2>Checked</h2>
    <CheckboxRoot class="checkbox_rootClass" checked>
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </CheckboxRoot>

    <h1>Indeterminate</h1>
    <CheckboxRoot class="checkbox_rootClass" checked="indeterminate">
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </CheckboxRoot>

    <h1>Disabled</h1>
    <CheckboxRoot class="checkbox_rootClass" default-checked disabled>
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </CheckboxRoot>

    <h1>Force mounted indicator</h1>
    <CheckboxRoot class="checkbox_rootClass">
      <CheckboxIndicator class="checkbox_indicatorClass" force-mount :style="{ height: '20px' }" />
    </CheckboxRoot>

    <h1>State attributes</h1>
    <h2>Unchecked</h2>
    <CheckboxRoot class="checkbox_rootAttrClass">
      <CheckboxIndicator class="checkbox_indicatorAttrClass" />
    </CheckboxRoot>

    <h2>Checked</h2>
    <CheckboxRoot class="checkbox_rootAttrClass" default-checked>
      <CheckboxIndicator class="checkbox_indicatorAttrClass" />
    </CheckboxRoot>

    <h2>Indeterminate</h2>
    <CheckboxRoot class="checkbox_rootAttrClass" checked="indeterminate">
      <CheckboxIndicator class="checkbox_indicatorAttrClass" />
    </CheckboxRoot>

    <h2>Disabled</h2>
    <CheckboxRoot class="checkbox_rootAttrClass" default-checked disabled>
      <CheckboxIndicator class="checkbox_indicatorAttrClass" />
    </CheckboxRoot>

    <h2>Force mounted indicator</h2>
    <CheckboxRoot class="checkbox_rootAttrClass">
      <CheckboxIndicator class="checkbox_indicatorAttrClass" force-mount :style="{ height: '20px' }" />
    </CheckboxRoot>
  </div>
</template>
