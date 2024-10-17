<script setup lang="ts">
import { OkuSwitch, OkuSwitchThumb } from '@oku-ui/switch'
import { ref } from 'vue'

const data = ref({ optional: false, required: false, stopprop: false })
const checked = ref<boolean>(false)
</script>

<template>
  <form
    @submit="(event) => event.preventDefault()"
    @change="(event) => {
      // TODO: this does not work since the `bubble-input` does not bubble checked change to parents, so we used v-model instated.
      const input = event.target as HTMLInputElement
      data = { ...data, [input.name]: input.checked }
    }"
  >
    <fieldset>
      <legend>optional checked: {{ String(data.optional) }}</legend>
      <label>
        <OkuSwitch
          class="switch"
          name="optional"
          :checked="checked"
          @checked-change="checked = $event"
        >
          <OkuSwitchThumb class="switch-thumb" />
        </OkuSwitch>{{ ' ' }}
        with label
      </label>
    </fieldset>

    <br>
    <br>

    <fieldset>
      <legend>required checked: {{ String(data.required) }}</legend>
      <OkuSwitch class="switch" name="required" required>
        <OkuSwitchThumb class="switch-thumb" />
      </OkuSwitch>
    </fieldset>

    <br>
    <br>

    <fieldset>
      <legend>stop propagation checked: {{ String(data.stopprop) }}</legend>
      <OkuSwitch
        class="switch"
        name="stopprop"
        @click="(event) => event.stopPropagation()"
      >
        <OkuSwitchThumb class="switch-thumb" />
      </OkuSwitch>
    </fieldset>

    <br>
    <br>

    <button>Submit</button>
  </form>
</template>
