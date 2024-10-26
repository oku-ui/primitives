<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <h1>Loading (not started)</h1>
    <ProgressRoot class="progress_rootClass" :value="0">
      <ProgressIndicator class="progress_indicatorClass progress_indicatorPseudos" />
    </ProgressRoot>

    <h1>Loading (started)</h1>
    <ProgressRoot class="progress_rootClass" :value="30">
      <ProgressIndicator class="progress_indicatorClass progress_indicatorPseudos" />
    </ProgressRoot>

    <h1>Indeterminate</h1>
    <ProgressRoot class="progress_rootClass">
      <ProgressIndicator class="progress_indicatorClass progress_indicatorPseudos" />
    </ProgressRoot>

    <h1>Complete</h1>
    <ProgressRoot class="progress_rootClass" :value="100">
      <ProgressIndicator class="progress_indicatorClass progress_indicatorPseudos" />
    </ProgressRoot>

    <h1>State attributes</h1>
    <h2>Loading (started)</h2>
    <ProgressRoot class="progress_rootAttrClass" :value="30">
      <ProgressIndicator class="progress_indicatorAttrClass progress_indicatorPseudos" />
    </ProgressRoot>

    <h2>Indeterminate</h2>
    <ProgressRoot class="progress_rootAttrClass">
      <ProgressIndicator class="progress_indicatorAttrClass progress_indicatorPseudos" />
    </ProgressRoot>

    <h2>Complete</h2>
    <ProgressRoot class="progress_rootAttrClass" :value="100">
      <ProgressIndicator class="progress_indicatorAttrClass progress_indicatorPseudos" />
    </ProgressRoot>
  </div>
</template>
