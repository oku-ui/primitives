<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue'
import { useForwardElement } from '../../hooks/index.ts'
import { TooltipTrigger, useTooltipProvider } from '../index.ts'
import SimpleTooltip from './SimpleTooltip.vue'
import './styles.css'

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
