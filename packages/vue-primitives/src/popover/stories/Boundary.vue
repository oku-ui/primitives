<script setup lang="ts">
import './styles.css'
import { shallowRef } from 'vue'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from '../index.ts'

const boundary = shallowRef<HTMLDivElement>()
</script>

<template>
  <div
    ref="boundary"
    :style="{
      border: '3px dashed red',
      width: '200px',
      height: '200px',
    }"
  >
    <PopoverRoot>
      <PopoverTrigger as="template">
        <button>open</button>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          :style="{
            boxSizing: 'border-box',
            borderRadius: '8px',
            padding: '8px',
            color: 'white',
            backgroundColor: 'black',
            width: 'var(--radix-popper-available-width)',
            height: 'var(--radix-popper-available-height)',
          }"
          :side-offset="5"
          :collision-boundary="boundary"
        >
          out of bound out of bound out of bound out of bound out of bound out of bound out of
          bound out of bound out of bound
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>
