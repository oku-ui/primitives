<script setup lang="ts">
import { OkuCheckbox, OkuCheckboxIndicator } from '@oku-ui/checkbox'
import { OkuLabel } from '@oku-ui/label'
import { onMounted, ref } from 'vue'

export interface ICheckBoxProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

withDefaults(defineProps<ICheckBoxProps>(), {

})

const refdd = ref()

onMounted(() => {
  console.log(refdd.value, 'tt')
})

const data = ref<string | boolean | 'indeterminate'>('indeterminate')

function click() {
  data.value = data.value === 'indeterminate' ? false : 'indeterminate'
}

function updated(res: any) {
  console.log('updated', res)
  data.value = res
}
</script>

<template>
  <div class="dark:text-white">
    <div v-if="template === '#1' || allshow" class="w-[300px] rounded-sm overflow-hidden">
      <div>
        <p>This checkbox is nested inside a label. The state is uncontrolled.</p>
        <h1 class="text-lg font-bold">
          Custom label
        </h1>
        <OkuCheckbox
          id="checkbox"
          ref="refdd"
          class="w-6 h-6 flex bg-gray-300 rounded-md text-red-500 checked:text-red-600"
        >
          <OkuCheckboxIndicator class="w-6 h-6 flex items-center justify-center text-blue-500">
            <div class="i-ph-check-bold w-5 h-5" />
          </OkuCheckboxIndicator>
        </OkuCheckbox>
      </div>

      <div>
        <h1 class="text-lg font-bold mb-4">
          Native label
        </h1>
        <OkuLabel>
          Label
          <OkuCheckbox
            id="checkbox"
            class="w-6 h-6 flex bg-gray-300 rounded-md text-red-500 checked:text-red-600"
          >
            <OkuCheckboxIndicator class="w-6 h-6 flex items-center justify-center text-blue-500">
              <div class="i-ph-check-bold w-5 h-5" />
            </OkuCheckboxIndicator>
          </OkuCheckbox>
        </OkuLabel>
      </div>

      <div>
        <h1 class="text-lg font-bold mb-4">
          Native label + native checkbox
        </h1>
        <OkuLabel>
          Label
          Label <input type="checkbox">
        </OkuLabel>
      </div>

      <div>
        <h1 class="text-lg font-bold mb-4">
          Native label
        </h1>
        <OkuLabel>
          Label
          <OkuCheckbox
            id="checkboxx"
            class="w-6 h-6 flex bg-gray-300 rounded-md text-red-500 checked:text-red-600"
          >
            <OkuCheckboxIndicator class="w-6 h-6 flex items-center justify-center text-blue-500">
              <div class="i-ph-check-bold w-5 h-5" />
            </OkuCheckboxIndicator>
          </OkuCheckbox>
        </OkuLabel>
      </div>
    </div>

    <div v-if="template === '#2'">
      <div class="flex flex-col">
        <OkuCheckbox
          id="checkbox"
          ref="refdd"
          :checked="data"
          class="checkbox-root"
          @checked-change="updated"
        >
          <OkuCheckboxIndicator class="checkbox-indicator" />
        </OkuCheckbox>

        <div>
          <button type="button" @click="click">
            Toggle indeterminate
          </button>
        </div>
      </div>

      <div class="flex flex-col">
        <OkuCheckbox
          id="checkbox"
          ref="refdd"
          v-model="data"
          class="checkbox-root"
        >
          <OkuCheckboxIndicator class="checkbox-indicator" />
        </OkuCheckbox>

        <div>
          <button type="button" @click="click">
            V-Model
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
:root {
  --gray300: #ccc;
  --red: #ff0000;
  --colors-red: #ff0000; /* Assuming this is a specific variable */
  --green: #00ff00;
  --purple: #800080;
  --blue: #0000ff;
}

/* RECOMMENDED-CSS-CHECKBOX-ROOT */
.root {
  vertical-align: middle;
}

.checkbox-root {
  border: 1px solid var(--gray300);
  width: 30px;
  height: 30px;
  padding: 4px;

  &:focus {
    outline: none;
    border-color: $red;
    box-shadow: 0 0 0 1px var(--colors-red);
  }

  &[data-disabled] {
    opacity: 0.3;
  }
}

/* checkbox-indicator */
.checkbox-indicator {
  background-color: var(--red);
  display: block;
  width: 20px;
  height: 4px;

  &[data-state="checked"],
  &[data-state="unchecked"] {
    height: 20px;
  }
}

/* checkbox-fadeIn and checkbox-fadeOut keyframes */
@keyframes checkbox-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes checkbox-fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* checkbox-animatedIndicator */
.checkbox-animatedIndicator {
  transition: height 300ms;

  &[data-state="checked"] {
    animation: checkbox-fadeIn 1000ms ease-out;
  }

  &[data-state="unchecked"] {
    animation: checkbox-fadeOut 1000ms ease-in;
  }
}

/* styles */
.checkbox-rootAttr {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="unchecked"] {
    border-color: red;
  }

  &[data-state="checked"] {
    border-color: green;
  }

  &[data-state="indeterminate"] {
    border-color: purple;
  }

  &[data-disabled] {
    border-style: dashed;
  }

  &:disabled {
    opacity: 0.5;
  }
}

.checkbox-indicatorAttr {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="unchecked"] {
    border-color: red;
  }

  &[data-state="checked"] {
    border-color: green;
  }

  &[data-state="indeterminate"] {
    border-color: purple;
  }

  &[data-disabled] {
    border-style: dashed;
  }

  &:disabled {
    opacity: 0.5;
  }
}
</style>
