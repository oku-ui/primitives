<script>
import { ref } from 'vue'

export default {
  setup() {
    const show = ref(false)

    return {
      show,
    }
  },
}
</script>

<template>
  <button @click="show = !show">
    Toggle
  </button>

  <transition name="fade">
    <p v-if="show">
      hello
    </p>
  </transition>
</template>

<style lang="css">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
