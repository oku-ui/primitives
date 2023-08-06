<!-- eslint-disable no-console -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { OkuRovingFocusGroup, OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'

export interface ICheckBoxProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

withDefaults(defineProps<ICheckBoxProps>(), {

})

const refdd = ref()

onMounted(() => {
  console.log(refdd.value?.$el, 'tt')
})
</script>

<template>
  <div class="dark:text-white">
    <div v-if="template === '#1' || allshow" class="w-[300px] rounded-sm overflow-hidden">
      <OkuRovingFocusGroup>
        <OkuRovingFocusGroupItem :as-child="true" focusable :active="true">
          <button>?1</button>
        </OkuRovingFocusGroupItem>
      </OkuRovingFocusGroup>
    </div>
  </div>
</template>
