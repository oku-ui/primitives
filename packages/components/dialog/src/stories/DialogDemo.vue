<script setup lang="ts">
import Styled from './Styled.vue'
import NonModal from './NonModal.vue'
import Controlled from './Controlled.vue'
import FocusTrap from './FocusTrap.vue'
import CustomFocus from './CustomFocus.vue'

export interface OkuDialogProps {
  template: 'Styled' | 'NonModal' | 'Controlled' | 'FocusTrap' | 'CustomFocus' | 'NoEscapeDismiss' | 'NoPointerDownOutsideDismiss'
  allshow?: boolean
}

withDefaults(defineProps<OkuDialogProps>(), {
  template: 'Styled',
})
</script>

<template>
  <div v-if="template === 'Styled' || allshow" class="flex flex-col w-full">
    <Styled />
  </div>
  <div v-if="template === 'NonModal' || allshow" class="flex flex-col w-full">
    <NonModal />
  </div>
  <div v-if="template === 'Controlled' || allshow" class="flex flex-col w-full">
    <Controlled />
  </div>
  <div v-if="template === 'FocusTrap' || allshow" class="flex flex-col w-full">
    <FocusTrap />
  </div>
  <div v-if="template === 'CustomFocus' || allshow" class="flex flex-col w-full">
    <CustomFocus />
  </div>
</template>

<style lang="postcss">
.triggerClass {
  position: fixed;
  top: 0;
  left: 0;
}

.overlayClass {
   position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
}

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
