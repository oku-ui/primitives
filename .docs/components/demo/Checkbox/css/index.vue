<script setup lang="ts">
import { ref } from 'vue'
import { CheckboxIndicator, CheckboxRoot } from '@oku-ui/primitives'
import { Icon } from '@iconify/vue'
import './styles.css'

const checkboxOne = ref(true)
</script>

<template>
  <div :style="{ display: 'flex', alignItems: 'center' }">
    <label>
      <CheckboxRoot
        v-model:checked="checkboxOne"
        class="CheckboxRoot"
      >
        <CheckboxIndicator class="CheckboxIndicator">
          <Icon icon="radix-icons:check" />
        </CheckboxIndicator>
      </CheckboxRoot>
      <span class="Label">Accept terms and conditions.</span>
    </label>
  </div>
</template>
