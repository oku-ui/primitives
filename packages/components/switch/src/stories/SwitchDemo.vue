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
const checkedActive = ref(true)
</script>

<template>
  <div>
    <div>
      <h1>Oku Default Switch</h1>
      <div v-if="template === '#1' || allshow" class="flex flex-col">
        <OkuSwitch id="switch" v-model="checked" class="switchStyle">
          <OkuSwitchThumb class="thumbStyle" />
        </OkuSwitch>
      </div>

      <div v-if="template === '#2' || allshow">
        <h1 class="text-3xl">
          Uncontrolled
        </h1>
        <h2 class="text-xl mt-3 mb-2">
          Off
        </h2>
        <OkuSwitch id="switch" v-model="checked" class="switchStyle">
          <OkuSwitchThumb class="thumbStyle" />
        </OkuSwitch>

        <h2 class="text-xl mt-3 mb-2">
          On
        </h2>
        <OkuSwitch id="switch" v-model="checkedActive" class="switchStyle">
          <OkuSwitchThumb class="thumbStyle" />
        </OkuSwitch>

        <h2 class="text-xl mt-3 mb-2">
          Disabled
        </h2>
        <OkuSwitch
          id="switch"
          v-model="checked"
          :disabled="true"
          class="switchStyle"
        >
          <OkuSwitchThumb class="thumbStyle" />
        </OkuSwitch>

        <h1 class="text-3xl mt-3">
          Controlled
        </h1>
        <h2 class="text-xl mt-3 mb-2">
          On
        </h2>
        <OkuSwitch id="switch" :checked="true" class="switchStyle">
          <OkuSwitchThumb class="thumbStyle" />
        </OkuSwitch>

        <h2 class="text-xl mt-3 mb-2">
          Off
        </h2>
        <OkuSwitch id="switch" :checked="false" class="switchStyle">
          <OkuSwitchThumb class="thumbStyle" />
        </OkuSwitch>

        <h2 class="text-xl mt-3 mb-2">
          Disabled
        </h2>
        <OkuSwitch
          id="switch"
          :checked="true"
          :disabled="true"
          class="switchStyle"
        >
          <OkuSwitchThumb class="thumbStyle" />
        </OkuSwitch>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.switchStyle {
  font-size: 0px;
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  outline: none;
  border: none;
  width: 50px;
  padding: 4px;
  border-radius: 9999px;
  background-color: grey;
  -webkit-transition: 0.4s;
  transition: background-color 166ms ease-out;

  &:focus {
    @apply outline-none shadow-sm;
  }

  &[data-state="checked"] {
    @apply bg-green-700 border-green-500;
  }

  &[data-disabled] {
    opacity: 0.5;
  }
}

.thumbStyle {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 9999px;
  transition: transform 166ms ease-out 0s;
  &[data-state="checked"] {
    transform: translateX(22px);
  }
}
</style>
