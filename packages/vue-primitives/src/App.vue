<script setup lang="ts">
import { computed, onMounted, shallowRef, watchSyncEffect } from 'vue'
// import Foo from '../src/Foo.vue'
// import Primitive from './primitive/Primitive.vue'
import { Toggle } from './toggle/index.ts'
import { ToggleGroup, ToggleGroupItem } from './toggle-group/index.ts'

const open = shallowRef(true)
const dis = shallowRef(true)
function toggle() {
  open.value = !open.value
}
function toggleDis() {
  dis.value = !dis.value
}

const on = computed(() => {
  if (!open.value) {
    return {}
  }

  return {
    click: log,
  }
})

function log(event: Event) {
  if (dis.value) {
    event.preventDefault()
  }
  console.error('LOG')
}

const a = shallowRef<any>()

watchSyncEffect(() => {
  console.log('a:', a.value?.$el)
})

onMounted(() => {
  // console.log(a.value)
})
</script>

<template>
  <div>
    <button @click="toggle">
      ON {{ open }}
    </button>
    <button @click="toggleDis">
      Dis {{ dis }}
    </button>

    <div>
      <ToggleGroup type="single">
        <ToggleGroupItem value="1">
          1
        </ToggleGroupItem>
        <ToggleGroupItem value="2">
          2
        </ToggleGroupItem>
      </ToggleGroup>
    </div>

    <div>
      <Toggle v-on="on">
        Toggle
      </Toggle>
    </div>
    <div>
      <pre>{{ on }}</pre>
    </div>
  </div>
</template>

<style>
.baz {
  color: green;
}
</style>
