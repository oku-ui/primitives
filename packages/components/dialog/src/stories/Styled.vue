<script setup lang="ts">
import { OkuDialogTrigger } from '@oku-ui/dialog'
</script>

<template>
  <div>
    <OkuDialogTrigger class="triggerClass">
      open
    </OkuDialogTrigger>
    <!-- <OkuDialogPortal>
      <OkuDialogOverlay class="overlayClass" />
      <OkuDialogContent class="contentDefaultClass">
        <OkuDialogTitle>
          Booking info
        </OkuDialogTitle>
        <OkuDialogDescription>
          Please enter the info for your booking below.
        </OkuDialogDescription>
        <OkuDialogClose class="closeClass">
          close
        </OkuDialogClose>
      </OkuDialogContent>
    </OkuDialogPortal> -->
  </div>
</template>

<style>
.triggerClass{}
.triggerAttrClass {
  backgroundColor: 'rgba(0, 0, 255, 0.3)';
  border: '2px solid blue';
  padding: 10;
  &[data-state="closed"] { borderColor: 'red' };
  &[data-state="open"] { borderColor: 'green' };
}

.overlayClass {
  position: 'fixed';
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  backgroundColor: 'rgba(0,0,0,0.2)';
}

.scrollableOverlayClass {
  position: 'fixed';
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  backgroundColor: 'rgba(0,0,0,0.2)';

  overflow: 'auto';
  display: 'flex';
  alignItems: 'flex-start';
  justifyContent: 'center';
}

 .contentDefaultClass {
  position: 'fixed';
  top: 0;
  left: 0;

  top: '50%';
  left: '50%';
  transform: 'translate(-50%, -50%)';
 }
 .contentScrollableClass {
  position: 'fixed';
  top: 0;
  left: 0;

  top: '50%';
  left: '50%';
  transform: 'translate(-50%, -50%)';

  overflow: 'auto';
  maxHeight: 300;

 }
</style>
