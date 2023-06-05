<script setup lang="ts">
import type { ToggleProps } from '@oku-ui/toggle'
import { OkuToggle } from '@oku-ui/toggle'

import { ref } from 'vue'

export interface IToggleProps extends ToggleProps {
  template?: '#1' | '#2' | '#3'
  allShow?: boolean
}

withDefaults(defineProps<IToggleProps>(), {

})

const pressed = ref(true)
function setPressed(value: boolean) {
  pressed.value = value
}
</script>

<template>
  <div>
    <div v-if="template === '#1' || allShow" class="w-[300px]">
      <div>
        <h1>Oku Default toggle</h1>
        <div class="max-w-xl mx-auto h-full items-center justify-center">
          <OkuToggle
            id="toggle"
            aria-label="Toggle italic"
            class="w-10 h-10 border-2 rounded text-black flex items-center justify-center data-[state=on]:border-green-500 data-[state=off]:border-gray-900 hover:bg-gray-400"
          >
            I
          </OkuToggle>
        </div>
      </div>
      <div>
        <h1>Oku toggle controlled (active)</h1>
        <div class="max-w-xl mx-auto h-full items-center justify-center">
          <OkuToggle
            id="toggle"
            :pressed="pressed"
            :on-pressed-change="setPressed"
            aria-label="Toggle italic"
            class="w-10 h-10 border-2 rounded text-black flex items-center justify-center data-[state=on]:border-green-500 data-[state=off]:border-gray-900 hover:bg-gray-400"
          >
            {{ pressed ? 'on' : 'off' }}
          </OkuToggle>
        </div>
      </div>
      <div>
        <h1>Oku toggle controlled active true</h1>
        <div class="max-w-xl mx-auto h-full items-center justify-center">
          <OkuToggle
            id="toggle"
            :pressed="true"
            aria-label="Toggle italic"
            class="w-10 h-10 border-2 rounded text-black flex items-center justify-center data-[state=on]:border-green-500 data-[state=off]:border-gray-900 hover:bg-gray-400"
          >
            t
          </OkuToggle>
        </div>
      </div>
      <div>
        <h1>Oku toggle controlled active false</h1>
        <div class="max-w-xl mx-auto h-full items-center justify-center">
          <OkuToggle
            id="toggle"
            :pressed="false"
            aria-label="Toggle italic"
            class="w-10 h-10 border-2 rounded text-black flex items-center justify-center data-[state=on]:border-green-500 data-[state=off]:border-gray-900 hover:bg-gray-400"
          >
            f
          </OkuToggle>
        </div>
      </div>
      <div>
        <h1>Oku toggle controlled disabled</h1>
        <div class="max-w-xl mx-auto h-full items-center justify-center">
          <OkuToggle
            id="toggle"
            :disabled="true"
            :pressed="false"
            aria-label="Toggle italic"
            class="w-10 h-10 border-2 rounded flex items-center justify-center data-[state=on]:border-green-500 hover:bg-gray-400 data-[disabled]:border-gray-100"
          >
            f
          </OkuToggle>
        </div>
      </div>
    </div>
  </div>
</template>
