<script setup lang="ts">
import { OkuDialog, OkuDialogContent, OkuDialogDescription, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
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
.triggerClass {}

.scrollableOverlayClass {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  overflow: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.contentStyles {
  min-width: 300px;
  min-height: 150px;
  padding: 50px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
}

.contentDefaultClass {
  min-width: 300px;
  min-height: 150px;
  padding: 50px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);

  position: fixed;
  top: 0;
  right: 0;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.contentScrollableClass {
  min-width: 300px;
  min-height: 150px;
  padding: 50px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);

  position: fixed;
  top: 0;
  right: 0;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  overflow: auto;
  max-height: 300px;
}

.contentInScrollableOverlayClass {
  min-width: 300px;
  min-height: 150px;
  padding: 50px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);

  margin-top: 50px;
  margin-bottom: 50px;
}

.contentSheetClass {
  min-width: 300px;
  min-height: 150px;
  padding: 50px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);

  position: fixed;
  top: 0;
  right: 0;

  left: undefined;
  right: 0;
  min-width: 300px;
  min-height: 100vh;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.closeClass {}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes scaleIn {
  from {
    transform: translate(-50%, -50%) scale(0.75);
  }

  to {
    transform: translate(-50%, -50%) scale(1);
  }
}

.animatedOverlayClass {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.2);

  &[data-state="open"] {
    animation: fadeIn 300ms ease-out;
  }

  &[data-state="closed"] {
    animation: fadeOut 300ms ease-in;
  }
}

.animatedContentClass {
  min-width: 300px;
  min-height: 150px;
  padding: 50px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);

  position: fixed;
  top: 0;
  right: 0;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &[data-state="open"] {
    animation: fadeIn 150ms ease-out, scaleIn 200ms ease-out;
  }

  &[data-state="closed"] {
    animation: fadeOut 300ms ease-in;
  }
}

.chromaticContentClass {
  min-width: 300px;
  min-height: 150px;
  padding: 50px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);

  position: fixed;
  top: 0;
  right: 0;

  padding: 10px;
  min-width: auto;
  min-height: auto;
}

.triggerAttrClass {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="closed"] {
    border-color: red;
  }

  &[data-state="open"] {
    border-color: green;
  }
}

.overlayAttrClass {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="closed"] {
    border-color: red;
  }

  &[data-state="open"] {
    border-color: green;
  }
}

.contentAttrClass {
  min-width: 300px;
  min-height: 150px;
  padding: 50px;
  border-radius: 10px;
  background-color: rgba(0, 0, 255, 0.3);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);

  position: fixed;
  top: 0;
  right: 0;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 10px;
  min-width: auto;
  min-height: auto;

  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="closed"] {
    border-color: red;
  }

  &[data-state="open"] {
    border-color: green;
  }
}

.closeAttrClass {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="closed"] {
    border-color: red;
  }

  &[data-state="open"] {
    border-color: green;
  }
}
</style>
