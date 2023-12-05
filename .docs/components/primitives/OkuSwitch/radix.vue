<script setup lang="ts">
import {
  OkuSwitch,
  OkuSwitchThumb,
} from '@oku-ui/switch'
</script>

<template>
  <form>
    <div class="flex items-center">
      <label class="text-white text-[15px] leading-none pr-[15px]" htmlFor="airplane-mode">
        Airplane mode
      </label>
      <OkuSwitch
        id="airplane-mode"
        class="w-[42px] h-[25px] bg-blackA9 rounded-full relative shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
        style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"
      >
        <OkuSwitchThumb class="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </OkuSwitch>
    </div>
  </form>
</template>
