<script setup lang="ts">
import Styled from './Styled.vue'
import Chromatic from './Chromatic.vue'

withDefaults(defineProps<IAvatarProps>(), {})

export interface IAvatarProps {
  template?: 'Styled' | 'Chromatic'
  allshow?: boolean
}
</script>

<template>
  <div>
    <template v-if="template === 'Styled' || allshow">
      <Styled />
    </template>

    <template v-if="template === 'Chromatic' || allshow">
      <Chromatic />
    </template>
  </div>
</template>

<style>
.avatar {
  /* RECOMMENDED_CSS_AVATAR */
  /* ensures image/fallback is centered */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  /* ensures image doesn't bleed out */
  overflow: hidden;
  /* ensures no selection is possible */
  user-select: none;

  border-radius: 9999px;
  width: 48px;
  height: 48px;
}

.avatar-image {
  /* RECOMMENDED_CSS_AVATAR_IMAGE */
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-fallback {
  /* RECOMMENDED_CSS_AVATAR_FALLBACK */
  /* ensures content inside the fallback is centered */
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #111;
  color: #fff;
}
</style>
