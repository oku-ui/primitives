<script setup lang="ts">
import Styled from './Styled.vue'
import Controlled from './Controlled.vue'
import Chromatic from './Chromatic.vue'

export interface OkuAlertDialogProps {
  template: 'Styled' | 'Controlled' | 'Chromatic'
  allshow?: boolean
}

withDefaults(defineProps<OkuAlertDialogProps>(), {
  template: 'Styled',
})
</script>

<template>
  <div v-if="template === 'Styled' || allshow">
    <Styled />
  </div>

  <div v-if="template === 'Controlled' || allshow">
    <Controlled />
  </div>

  <div v-if="template === 'Chromatic' || allshow">
    <Chromatic />
  </div>
</template>

<style>
/* Define CSS classes without using css() */
.triggerClass {
  /* Your styles here */
}

.overlayClass {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: black;
  opacity: 0.2;
}

.contentClass {
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

.titleClass {}

.descriptionClass {}

.chromaticContentClass{
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

  padding: 10px;
  min-width: auto;
  min-height: auto;
}

/* Define styles object as standard CSS */
.styles {
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

  padding: 10px;
  min-width: 300px;
  min-height: 150px;
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
  background-color: black;
  opacity: 0.2;

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

  padding: 10px;
  min-width: 300px;
  min-height: 150px;

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

.cancelAttrClass {
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

.actionAttrClass {
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

.titleAttrClass {
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

.descriptionAttrClass {
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
