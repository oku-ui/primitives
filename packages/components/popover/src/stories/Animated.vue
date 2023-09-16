<script setup lang="ts">
import {
  OkuPopover,
  OkuPopoverArrow,
  OkuPopoverClose,
  OkuPopoverContent,
  OkuPopoverPortal,
  OkuPopoverTrigger,
} from '@oku-ui/popover'
</script>

<template>
  <div
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '200vh',
    }"
  >
    <OkuPopover>
      <OkuPopoverTrigger class="triggerClass">
        open
      </OkuPopoverTrigger>
      <OkuPopoverPortal>
        <Transition name="fade">
          <OkuPopoverContent class="animatedContentClass" :side-offset="10">
            <OkuPopoverClose class="closeClass">
              close
            </OkuPopoverClose>
            <OkuPopoverArrow class="arrowClass" :width="20" :height="10" />
          </OkuPopoverContent>
        </Transition>
      </OkuPopoverPortal>
    </OkuPopover>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
