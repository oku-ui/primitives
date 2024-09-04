<script setup lang="ts">
import './styles.css'
import { shallowRef, watchEffect } from 'vue'
import { TooltipTrigger, useTooltipProvider } from '../index.ts'
import { useForwardElement } from '../../hooks/index.ts'
import SimpleTooltip from './SimpleTooltip.vue'

useTooltipProvider()

const buttonRef = shallowRef<HTMLButtonElement>()
const forwardElement = useForwardElement(buttonRef)

watchEffect(() => {
  if (buttonRef.value) {
    buttonRef.value.style.boxShadow = '0 0 0 2px red'
  }
})
</script>

<template>
  <div>
    <SimpleTooltip label="Save document" side="bottom" align="end">
      <TooltipTrigger :ref="forwardElement" type="button" :style="{ margin: '100px' }">
        Save
      </TooltipTrigger>
    </SimpleTooltip>
  </div>
</template>
