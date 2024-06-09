<script setup lang="ts">
import { shallowRef } from 'vue'
import Foo from '../src/Foo.vue'
import Primitive from './primitive/Primitive.vue'

const a1 = shallowRef()
const a2 = shallowRef()
const a3 = shallowRef()
const a4 = shallowRef()

function log() {
  console.error('click')
}
</script>

<template>
  <div>
    <div>
      <Primitive ref="a1" class="baz" @click="log">
        content
      </Primitive>
    </div>
    <div>
      <Primitive ref="a2" as="button" type="button" class="baz" @click="log">
        content
      </Primitive>
    </div>
    <div>
      <Primitive ref="a3" as-child class="baz" @click="log">
        <button type="button">
          content
        </button>
      </Primitive>
    </div>
    <div>
      <Primitive ref="a4" :as="Foo" class="baz" @click="log">
        content
      </Primitive>
    </div>
  </div>
</template>

<style>
.baz {
  color: green;
}
</style>
