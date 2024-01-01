<script setup lang="ts">
import { OkuCheckbox, OkuCheckboxIndicator } from '@oku-ui/checkbox'
</script>

<template>
  <form>
    <div class="flex items-center">
      <OkuCheckbox
        id="c1"
        class="shadow-blackA7 hover:bg-violet3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
      >
        <OkuCheckboxIndicator class="text-violet11">
          <div class="i-heroicons-check flex w-[15px] h-[15px]" />
        </OkuCheckboxIndicator>
      </OkuCheckbox>
      <label class="pl-[15px] text-[15px] leading-none text-white" for="c1">
        Accept terms and conditions.
      </label>
    </div>
  </form>
</template>
