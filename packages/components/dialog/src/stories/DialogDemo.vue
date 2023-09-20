<script setup lang="ts">
import Styled from './Styled.vue'
import NonModal from './NonModal.vue'
import Controlled from './Controlled.vue'
import FocusTrap from './FocusTrap.vue'
import CustomFocus from './CustomFocus.vue'
import NoEscapeDismiss from './NoEscapeDismiss.vue'
import NoPointerDownOutsideDismiss from './NoPointerDownOutsideDismiss.vue'
import WithPortalContainer from './WithPortalContainer.vue'
import Animated from './Animated.vue'
import ForcedMount from './ForcedMount.vue'
import InnerScrollable from './InnerScrollable.vue'
import OuterScrollable from './OuterScrollable.vue'
import Chromatic from './Chromatic.vue'

export interface OkuDialogProps {
  template: 'Styled' | 'NonModal' | 'Controlled' | 'FocusTrap' | 'CustomFocus' | 'NoEscapeDismiss' | 'NoPointerDownOutsideDismiss' | 'WithPortalContainer' | 'Animated' | 'ForcedMount' | 'InnerScrollable' | 'OuterScrollable' | 'Chromatic'
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
  <div v-if="template === 'NoEscapeDismiss' || allshow" class="flex flex-col w-full">
    <NoEscapeDismiss />
  </div>
  <div v-if="template === 'NoPointerDownOutsideDismiss' || allshow" class="flex flex-col w-full">
    <NoPointerDownOutsideDismiss />
  </div>
  <div v-if="template === 'WithPortalContainer' || allshow" class="flex flex-col w-full">
    <WithPortalContainer />
  </div>
  <div v-if="template === 'Animated' || allshow" class="flex flex-col w-full">
    <Animated />
  </div>
  <div v-if="template === 'ForcedMount' || allshow" class="flex flex-col w-full">
    <ForcedMount />
  </div>
  <div v-if="template === 'InnerScrollable' || allshow" class="flex flex-col w-full">
    <InnerScrollable />
  </div>
  <div v-if="template === 'OuterScrollable' || allshow" class="flex flex-col w-full">
    <OuterScrollable />
  </div>
  <div v-if="template === 'Chromatic' || allshow" class="flex flex-col w-full">
    <Chromatic />
  </div>
</template>

<style lang="postcss">
.dialog-trigger {
  position: fixed;
  top: 0;
  left: 0;
}

.dialog-overlay {
   position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
}

.dialog-scrollableOverlay {
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

.dialog-contentStyles {
  min-width: 300px;
  min-height: 150px;
  padding: 50px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
}

.dialog-contentDefault {
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

.dialog-contentScrollable {
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

.dialog-contentInScrollableOverlay {
  min-width: 300px;
  min-height: 150px;
  padding: 50px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);

  margin-top: 50px;
  margin-bottom: 50px;
}

.dialog-contentSheet {
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

.dialog-close {}

@keyframes dialog-fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes dialog-fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes dialog-scaleIn {
  from {
    transform: translate(-50%, -50%) scale(0.75);
  }

  to {
    transform: translate(-50%, -50%) scale(1);
  }
}

.dialog-animatedOverlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.2);

  &[data-state="open"] {
    animation: dialog-fadeIn 300ms ease-out;
  }

  &[data-state="closed"] {
    animation: dialog-fadeOut 300ms ease-in;
  }
}

.dialog-animatedContent {
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
    animation: dialog-fadeIn 150ms ease-out, dialog-scaleIn 200ms ease-out;
  }

  &[data-state="closed"] {
    animation: dialog-fadeOut 300ms ease-in;
  }
}

.dialog-chromaticContent {
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

  padding: 10px;
  min-width: auto;
  min-height: auto;
}

.dialog-triggerAttr {
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

.dialog-overlayAttr {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: rgba(0,0,0,0.2);

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

.dialog-contentAttr {
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

.dialog-closeAttr {
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
