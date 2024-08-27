<script setup lang="ts">
import { shallowRef } from 'vue'
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from '../index.ts'
import './styles.css'

const value = shallowRef('2')
</script>

<template>
  <div>
    <RadioGroupRoot v-model:value="value" class="radioGroup_rootClass">
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
  </div>
</template>
