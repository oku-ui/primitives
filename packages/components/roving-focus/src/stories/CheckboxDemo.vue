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
      <OkuRovingFocusGroup class="flex flex-col">
        <OkuRovingFocusGroupItem
          as-child
          focusable :active="true" @click="() => console.log('click')"
          @focus="() => console.log('focus')"
        >
          <button>1</button>
        </OkuRovingFocusGroupItem>
        <OkuRovingFocusGroupItem as-child focusable :active="true">
          <button>2</button>
        </OkuRovingFocusGroupItem>
      </OkuRovingFocusGroup>

      <OkuRovingFocusGroup class="flex flex-col" loop>
        <OkuRovingFocusGroupItem
          as-child
          focusable :active="true" @click="() => console.log('click')"
          @focus="() => console.log('focus')"
        >
          <button>1</button>
        </OkuRovingFocusGroupItem>
        <OkuRovingFocusGroupItem as-child focusable :active="true">
          <button>2</button>
        </OkuRovingFocusGroupItem>
      </OkuRovingFocusGroup>

      <OkuRovingFocusGroup class="flex gap-4" orientation="horizontal">
        <OkuRovingFocusGroupItem
          as-child
          focusable :active="true" @click="() => console.log('click')"
          @focus="() => console.log('focus')"
        >
          <button>1</button>
        </OkuRovingFocusGroupItem>
        <OkuRovingFocusGroupItem as-child focusable :active="true">
          <button>2</button>
        </OkuRovingFocusGroupItem>
        <OkuRovingFocusGroupItem as-child :focusable="false" :active="true">
          <button disable>
            2- disable
          </button>
        </OkuRovingFocusGroupItem>
        <OkuRovingFocusGroupItem as-child focusable :active="true">
          <button>2</button>
        </OkuRovingFocusGroupItem>
      </OkuRovingFocusGroup>
    </div>
  </div>
</template>
