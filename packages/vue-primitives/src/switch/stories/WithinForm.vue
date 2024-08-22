<script setup lang="ts">
import { shallowRef } from 'vue'
import { Switch, SwitchThumb } from '../index.ts'
import './styles.css'

const data = shallowRef({ optional: false, required: false, stopprop: false })

function setData(callback: (prevData: typeof data.value) => typeof data.value) {
  data.value = callback(data.value)
}

const checked = shallowRef(false)
</script>

<template>
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
        <Switch
          v-model:checked="checked"
          class="switch_rootClass"
          name="optional"
        >
          <SwitchThumb class="switch_thumbClass" />
        </Switch>{{ ' ' }}
        with label
      </label>
    </fieldset>

    <br>
    <br>

    <fieldset>
      <legend>required checked: {{ String(data.required) }}</legend>
      <Switch class="switch_rootClass" name="required" required>
        <SwitchThumb class="switch_thumbClass" />
      </Switch>
    </fieldset>

    <br>
    <br>

    <fieldset>
      <legend>stop propagation checked: {{ String(data.stopprop) }}</legend>
      <Switch
        class="switch_rootClass"
        name="stopprop"
        @click="(event: Event) => event.stopPropagation()"
      >
        <SwitchThumb class="switch_thumbClass" />
      </Switch>
    </fieldset>

    <br>
    <br>

    <button>Submit</button>
  </form>
</template>
