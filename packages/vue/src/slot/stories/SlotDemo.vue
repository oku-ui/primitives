<!-- eslint-disable no-console -->
<script setup lang="ts">
import { OkuSlot, OkuSlottable } from '@oku-ui/slot'
import { onMounted, ref } from 'vue'

export interface OkuLabelProps {
  template?: '#1' | '#2' | '#3' | '#4'
  allshow?: boolean
}

withDefaults(defineProps<OkuLabelProps>(), {
  label: 'First Name',
  template: '#1',
})

const slot = ref()
onMounted(() => {
  console.log(slot.value, 'slot.value')
  console.log(slot.value, 'slot.value')
})
const alert = () => console.log('alert')

function click(event: MouseEvent) {
  if (!event.defaultPrevented)
    console.log(event.target)
}

function click2(event: MouseEvent) {
  console.log(event.target)
}
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === '#1' || allshow" class="flex flex-col">
      <OkuSlot ref="slot" class="test">
        <b data-slot-element>hello</b>
      </OkuSlot>
    </div>

    <div v-if="template === '#2' || allshow" class="flex flex-col">
      <OkuSlot ref="slot" class="test">
        <OkuSlottable>
          <b data-slot-element @click="alert">helloa</b>
        </OkuSlottable>
        <span>world</span>
      </OkuSlot>
    </div>

    <div v-if="template === '#3' || allshow">
      <h1 class="font-bold">
        Should log both
      </h1>
      <OkuSlot class="test" @click="click">
        <button @click="() => console.log('button click')">
          Slot event not prevented
        </button>
      </OkuSlot>

      <h1 class="font-bold">
        Should log "button click"
      </h1>
      <OkuSlot class="test" @click="click">
        <button
          @click="(event) => {
            console.log('button click');
            event.preventDefault();
          }"
        >
          Slot event prevented
        </button>
      </OkuSlot>

      <h1 class="font-bold">
        Should log both
      </h1>
      <OkuSlot class="test" @click="click2">
        <button @click="() => console.log('button click')">
          Slot event not prevented
        </button>
      </OkuSlot>

      <h1 class="font-bold">
        Should log both
      </h1>
      <OkuSlot class="test" @click="click2">
        <button
          @click="(event) => {
            console.log('button click');
            event.preventDefault();
          }"
        >
          Slot event prevented
        </button>
      </OkuSlot>
    </div>

    <div
      v-if="template === '#4' || allshow"
    >
      <h1>Button with left/right icons</h1>

      <button ref="slot">
        <div class="i-ph-activity-bold" />
        <OkuSlottable>
          Button <em>text</em>
        </OkuSlottable>
        <div class="i-ph-address-book-bold" />
      </button>

      <h1>Button with left/right icons as link (OkuSlot)</h1>

      <OkuSlot ref="slot">
        <div class="i-ph-activity-bold" />
        <OkuSlottable>
          <a href="https://oku-ui.com">Button <em>text</em></a>
        </OkuSlottable>
        <div class="i-ph-address-book-bold" />
      </OkuSlot>
    </div>
  </div>
</template>
