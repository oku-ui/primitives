<script setup lang="ts">
import { shallowRef } from 'vue'
import { SwitchBubbleInput, SwitchRoot, SwitchThumb } from '../index.ts'
import './styles.css'

const data = shallowRef({ optional: false, required: false, stopprop: false })

function setData(callback: (prevData: typeof data.value) => typeof data.value) {
  data.value = callback(data.value)
}

const checked = shallowRef(false)
</script>

<template>
  <div>
    <h1>TODO: Within Form</h1>
    <form
      @change="(event) => {
        const input = event.target as HTMLInputElement;
        setData((prevData) => ({ ...prevData, [input.name]: input.checked }));
      }"
      @submit="(event) => event.preventDefault()"
    >
      <fieldset>
        <legend>optional checked: {{ String(data.optional) }}</legend>
        <label>
          <SwitchRoot v-model:checked="checked" class="switch_rootClass" name="optional">
            <template #default="scope">
              <SwitchBubbleInput v-if="scope.isFormControl" v-bind="scope.input" />
              <SwitchThumb class="switch_thumbClass" />
            </template>
          </SwitchRoot>{{ ' ' }}
          with label
        </label>
      </fieldset>

      <br>
      <br>

      <fieldset>
        <legend>required checked: {{ String(data.required) }}</legend>
        <SwitchRoot class="switch_rootClass" name="required" required>
          <template #default="scope">
            <SwitchBubbleInput v-if="scope.isFormControl" v-bind="scope.input" />
            <SwitchThumb class="switch_thumbClass" />
          </template>
        </SwitchRoot>
      </fieldset>

      <br>
      <br>

      <fieldset>
        <legend>stop propagation checked: {{ String(data.stopprop) }}</legend>
        <SwitchRoot class="switch_rootClass" name="stopprop" @click="(event: Event) => event.stopPropagation()">
          <template #default="scope">
            <SwitchBubbleInput v-if="scope.isFormControl" v-bind="scope.input" />
            <SwitchThumb class="switch_thumbClass" />
          </template>
        </SwitchRoot>
      </fieldset>

      <br>
      <br>

      <button>Submit</button>
    </form>
  </div>
</template>
