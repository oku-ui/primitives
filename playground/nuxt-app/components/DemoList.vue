<template>
  <div class="demo-box-list">
    <slot />
  </div>
</template>

<style scoped>
.demo-box-list {
  display: flex;
  flex-direction: column;
  gap: 60px;
}
</style>
