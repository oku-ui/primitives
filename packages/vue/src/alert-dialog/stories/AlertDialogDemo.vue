<script setup lang="ts">
import Chromatic from './Chromatic.vue'
import Controlled from './Controlled.vue'
import Styled from './Styled.vue'

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
.alert-dialog-trigger {
  /* Your alert-dialog-styles here */
}

.alert-dialog-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: black;
  opacity: 0.2;
}

.alert-dialog-content {
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

.alert-dialog-cancel {
  /* Your alert-dialog-styles here */
  appearance: none;
  padding: 10px;
  border: none;
  background: lightgrey;

  margin-top: 15px;
}

.alert-dialog-action {
  /* Your alert-dialog-styles here */
  appearance: none;
  padding: 10px;
  border: none;
  background-color: red;
  color: white;

  margin-top: 15px;
}

.alert-dialog-title {}

.alert-dialog-description {}

.alert-dialog-chromaticContent{
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

/* Define alert-dialog-styles object as standard CSS */
.alert-dialog-styles {
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

.alert-dialog-contentAttr {
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

.alert-dialog-triggerAttr {
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

.alert-dialog-overlayAttr {
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

.alert-dialog-contentAttr {
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

.alert-dialog-cancelAttr {
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

.alert-dialog-actionAttr {
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

.alert-dialog-titleAttr {
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

.alert-dialog-descriptionAttr {
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
