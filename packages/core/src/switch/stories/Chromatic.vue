<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <h1>Uncontrolled</h1>
    <h2>Off</h2>
    <SwitchRoot class="switch_rootClass">
      <SwitchThumb class="switch_thumbClass" />
    </SwitchRoot>

    <h2>On</h2>
    <SwitchRoot class="switch_rootClass" default-checked>
      <SwitchThumb class="switch_thumbClass" />
    </SwitchRoot>

    <h1>Controlled</h1>
    <h2>Off</h2>
    <SwitchRoot class="switch_rootClass" :checked="false">
      <SwitchThumb class="switch_thumbClass" />
    </SwitchRoot>

    <h2>On</h2>
    <SwitchRoot class="switch_rootClass" checked>
      <SwitchThumb class="switch_thumbClass" />
    </SwitchRoot>

    <h1>Disabled</h1>
    <SwitchRoot class="switch_rootClass" disabled>
      <SwitchThumb class="switch_thumbClass" />
    </SwitchRoot>

    <h1>State attributes</h1>
    <h2>Unchecked</h2>
    <SwitchRoot class="switch_rootAttrClass">
      <SwitchThumb class="switch_thumbAttrClass" />
    </SwitchRoot>

    <h2>Checked</h2>
    <SwitchRoot class="switch_rootAttrClass" default-checked>
      <SwitchThumb class="switch_thumbAttrClass" />
    </SwitchRoot>

    <h2>Disabled</h2>
    <SwitchRoot class="switch_rootAttrClass" default-checked disabled>
      <SwitchThumb class="switch_thumbAttrClass" />
    </SwitchRoot>
  </div>
</template>
