<script setup lang="ts">
import type { SwitchProps } from '@oku-ui/switch'
import { OkuSwitch, OkuSwitchThumb } from '@oku-ui/switch'
import { ref } from 'vue'

export interface ISwitchProps extends SwitchProps {
  template?: '#1' | '#2'
  allshow?: boolean
}

defineProps<ISwitchProps>()

const checked = ref<boolean>(false)
const onChange = (value: boolean) => (checked.value = value)

// '&[data-state="checked"]': { transform: `translateX(${50 - 4 * 2 - 20}px)` as any }
</script>

<template>
  <div>
    <div>
      <h1>Oku Default Switch</h1>
      <div v-if="template === '#1' || allshow" class="flex flex-col">
        <OkuSwitch
          id="switch"
          v-model="checked"
          class="w-32 h-[50px] border-2 rounded text-black flex items-center justify-center data-[state=checked]:border-green-500 data-[state=unchecked]:border-gray-900 focus:outline-none"
        >
          <OkuSwitchThumb
            class="inline-block align-middle w-20 h-[30px] bg-white rounded-full"
            :style="{ transition: 'transform 166ms ease-out' }"
          />
        </OkuSwitch>
      </div>
    </div>
  </div>
</template>
