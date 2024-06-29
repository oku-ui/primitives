<script setup lang="ts">
import { Progress, ProgressIndicator } from '../index.ts'
import './styles.css'
</script>

<template>
  <div>
    <h1>Loading (not started)</h1>
    <Progress class="progress_rootClass" :value="0">
      <ProgressIndicator class="progress_indicatorClass progress_indicatorPseudos" />
    </Progress>

    <h1>Loading (started)</h1>
    <Progress class="progress_rootClass" :value="30">
      <ProgressIndicator class="progress_indicatorClass progress_indicatorPseudos" />
    </Progress>

    <h1>Indeterminate</h1>
    <Progress class="progress_rootClass">
      <ProgressIndicator class="progress_indicatorClass progress_indicatorPseudos" />
    </Progress>

    <h1>Complete</h1>
    <Progress class="progress_rootClass" :value="100">
      <ProgressIndicator class="progress_indicatorClass progress_indicatorPseudos" />
    </Progress>

    <h1>State attributes</h1>
    <h2>Loading (started)</h2>
    <Progress class="progress_rootAttrClass" :value="30">
      <ProgressIndicator class="progress_indicatorAttrClass progress_indicatorPseudos" />
    </Progress>

    <h2>Indeterminate</h2>
    <Progress class="progress_rootAttrClass">
      <ProgressIndicator class="progress_indicatorAttrClass progress_indicatorPseudos" />
    </Progress>

    <h2>Complete</h2>
    <Progress class="progress_rootAttrClass" :value="100">
      <ProgressIndicator class="progress_indicatorAttrClass progress_indicatorPseudos" />
    </Progress>
  </div>
</template>
