<script setup lang="tsx">
import CheckboxItems from '../../../packages/vue-primitives/src/context-menu/stories/CheckboxItems.vue'
import Modality from '../../../packages/vue-primitives/src/context-menu/stories/Modality.vue'
import Multiple from '../../../packages/vue-primitives/src/context-menu/stories/Multiple.vue'
import Nested from '../../../packages/vue-primitives/src/context-menu/stories/Nested.vue'
import PreventClosing from '../../../packages/vue-primitives/src/context-menu/stories/PreventClosing.vue'
import RadioItems from '../../../packages/vue-primitives/src/context-menu/stories/RadioItems.vue'
import Styled from '../../../packages/vue-primitives/src/context-menu/stories/Styled.vue'
import Submenus from '../../../packages/vue-primitives/src/context-menu/stories/Submenus.vue'
import WithLabels from '../../../packages/vue-primitives/src/context-menu/stories/WithLabels.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Styled />
    </Demo>
    <Demo title="Modality">
      <Modality />
    </Demo>
    <Demo title="Submenus">
      <Submenus />
    </Demo>
    <Demo title="WithLabels">
      <WithLabels />
    </Demo>
    <Demo title="CheckboxItems">
      <CheckboxItems />
    </Demo>
    <Demo title="RadioItems">
      <RadioItems />
    </Demo>
    <Demo title="PreventClosing">
      <PreventClosing />
    </Demo>
    <Demo title="Multiple">
      <Multiple />
    </Demo>
    <Demo title="Nested">
      <Nested />
    </Demo>
  </DemoList>
</template>
