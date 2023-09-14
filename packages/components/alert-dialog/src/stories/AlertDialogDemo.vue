<script setup lang="ts">
import Styled from './Styled.vue'

export interface OkuAlertDialogProps {
  template: 'Styled' | 'NonModal' | 'Controlled' | 'FocusTrap' | 'CustomFocus' | 'NoEscapeDismiss' | 'NoPointerDownOutsideDismiss' | 'WithPortalContainer' | 'Animated' | 'ForcedMount' | 'InnerScrollable' | 'OuterScrollable' | 'Chromatic'
  allshow?: boolean
}

withDefaults(defineProps<OkuAlertDialogProps>(), {
  template: 'Styled',
})
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === 'Styled' || allshow" class="flex flex-col">
      <Styled />
    </div>
  </div>
</template>

<style lang="postcss">
/* Define CSS classes without using css() */
.triggerClass {
  /* Your styles here */
}

.overlayClass {
  /* Your styles here */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: black;
  opacity: 0.2;
}

.contentClass {
  /* Your styles here */
  position: fixed;
  top: 0;
  left: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  min-width: 300px;
  min-height: 150px;
  padding: 50px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
}

.cancelClass {
  /* Your styles here */
  appearance: none;
  padding: 10px;
  border: none;
  background: lightgrey;

  margin-top: 15px;
}

.actionClass {
  /* Your styles here */
  appearance: none;
  padding: 10px;
  border: none;
  background-color: red;
  color: white;

  margin-top: 15px;
}

.titleClass {
  /* Your styles here */
}

.descriptionClass {
  /* Your styles here */
  margin-top: 15px;
}

/* Define styles object as standard CSS */
.styles {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;
}

/* Define styles for specific data states */
.styles[data-state="closed"] {
  border-color: red;
}

.styles[data-state="open"] {
  border-color: green;
}

/* Apply classes to elements */
.triggerAttrClass {
  /* Your styles here */
  @extend .styles;
}

.overlayAttrClass {
  /* Your styles here */
  @extend .overlayClass;
  @extend .styles;
}

.contentAttrClass {
  /* Your styles here */
  @extend .chromaticContentClass;
  @extend .styles;
}

.cancelAttrClass {
  /* Your styles here */
  @extend .styles;
}

.actionAttrClass {
  /* Your styles here */
  @extend .styles;
}

.titleAttrClass {
  /* Your styles here */
  @extend .styles;
}

.descriptionAttrClass {
  /* Your styles here */
  @extend .styles;
}
</style>
