<script setup lang="ts">
import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
</script>

<template>
  <ButtonGroup orientation="vertical" loop>
    <Button value="1">
      1
    </Button>

    <div
      :style="{ display: 'flex', flexDirection: 'column' }"
    >
      <Button value="2" :style="{ marginBottom: '10px' }">
        2
      </Button>

      <ButtonGroup orientation="horizontal" loop>
        <Button value="2.1">
          2.1
        </Button>
        <Button value="2.2">
          2.2
        </Button>
        <Button disabled value="2.3">
          2.3
        </Button>
        <Button value="2.4">
          2.4
        </Button>
      </ButtonGroup>
    </div>

    <Button value="3" disabled>
      3
    </Button>
    <Button value="4">
      4
    </Button>
  </ButtonGroup>
</template>
