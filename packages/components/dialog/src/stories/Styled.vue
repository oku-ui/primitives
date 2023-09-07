<script setup lang="ts">
import { OkuDialog, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
</script>

<template>
  <div>
    <OkuDialog>
      <OkuDialogTrigger class="triggerClass">
        open
      </OkuDialogTrigger>
      <OkuDialogPortal>
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
      </OkuDialogPortal>
    </OkuDialog>
  </div>
</template>

<style>
.triggerClass{}
.triggerAttrClass {
  backgroundColor: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;
  &[data-state="closed"] { borderColor: red };
  &[data-state="open"] { borderColor: green };
}

.overlayClass {
  /* // ensures overlay is positioned correctly */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  backgroundColor: rgba(0,0,0,0.2);
}

.scrollableOverlayClass {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  backgroundColor: rgba(0,0,0,0.2);

  overflow: auto;
  display: flex;
  alignItems: flex-start;
  justifyContent: center;
}

 .contentDefaultClass {
  min-width: 300px;
  min-height: 150px;
  padding: 50px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);

  position: fixed;
  top: 0;
  left: 0;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
 }
 .contentScrollableClass {
  position: fixed;
  top: 0;
  left: 0;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  overflow: auto;
  maxHeight: 300;

 }
 .closeClass{

 }
</style>
