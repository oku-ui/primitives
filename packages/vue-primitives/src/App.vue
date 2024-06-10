<script setup lang="ts">
import { computed, shallowRef } from 'vue'
// import Foo from '../src/Foo.vue'
// import Primitive from './primitive/Primitive.vue'
import Toggle from './toggle/Toggle.vue'

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

// watchEffect(() => {
//   console.log('open', on.value)
// })

// const a1 = shallowRef()
// const a2 = shallowRef()
// const a3 = shallowRef()
// const a4 = shallowRef()

function log(event: Event) {
  if (dis.value) {
    event.preventDefault()
  }
  console.error('click')
}
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
      <!-- <Primitive ref="a1" class="baz" @click="log">
        content
      </Primitive> -->
    </div>
    <div>
      <!-- <Primitive ref="a2" as="button" type="button" class="baz" @click="log">
        content
      </Primitive> -->
    </div>
    <div>
      <!-- <Primitive ref="a3" as-child class="baz" @click="log">
        <button type="button">
          content
        </button>
      </Primitive> -->
    </div>
    <div>
      <!-- <Primitive ref="a4" :as="Foo" class="baz" @click="log">
        content
      </Primitive> -->
    </div>
    <div>
      <Toggle v-on="on">
        Toggle
      </Toggle>
      <!-- <button @click="log">
        Toggle
      </button> -->
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
