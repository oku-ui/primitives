<script setup lang="ts">
import { shallowRef } from 'vue'
import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'

const dir = shallowRef<'ltr' | 'rtl'>('ltr')

function setDir() {
  dir.value = (dir.value === 'ltr' ? 'rtl' : 'ltr')
}
</script>

<template>
  <div :dir="dir">
    <h1>
      Direction:
      {{ dir }}
      <button type="button" @click="setDir">
        Toggle to
        {{ dir === 'ltr' ? 'rtl' : 'ltr' }}
      </button>
    </h1>

    <h2>no orientation (both) + no looping</h2>
    <ButtonGroup :dir="dir" default-value="two">
      <Button value="one">
        One
      </Button>
      <Button value="two">
        Two
      </Button>
      <Button disabled value="three">
        Three
      </Button>
      <Button value="four">
        Four
      </Button>
    </ButtonGroup>

    <h2>no orientation (both) + looping</h2>
    <ButtonGroup :dir="dir" loop>
      <Button value="hidden" :style="{ display: 'none' }">
        Hidden
      </Button>
      <Button value="one">
        One
      </Button>
      <Button value="two">
        Two
      </Button>
      <Button disabled value="three">
        Three
      </Button>
      <Button value="four">
        Four
      </Button>
    </ButtonGroup>

    <h2>horizontal orientation + no looping</h2>
    <ButtonGroup orientation="horizontal" :dir="dir">
      <Button value="one">
        One
      </Button>
      <Button value="two">
        Two
      </Button>
      <Button disabled value="three">
        Three
      </Button>
      <Button value="four">
        Four
      </Button>
    </ButtonGroup>

    <h2>horizontal orientation + looping</h2>
    <ButtonGroup orientation="horizontal" :dir="dir" loop>
      <Button value="one">
        One
      </Button>
      <Button value="two">
        Two
      </Button>
      <Button disabled value="three">
        Three
      </Button>
      <Button value="four">
        Four
      </Button>
    </ButtonGroup>

    <h2>vertical orientation + no looping</h2>
    <ButtonGroup orientation="vertical" :dir="dir">
      <Button value="one">
        One
      </Button>
      <Button value="two">
        Two
      </Button>
      <Button disabled value="three">
        Three
      </Button>
      <Button value="four">
        Four
      </Button>
    </ButtonGroup>

    <h2>vertical orientation + looping</h2>
    <ButtonGroup orientation="vertical" :dir="dir" loop>
      <Button value="one">
        One
      </Button>
      <Button value="two">
        Two
      </Button>
      <Button disabled value="three">
        Three
      </Button>
      <Button value="four">
        Four
      </Button>
    </ButtonGroup>
  </div>
</template>
