<script setup lang="tsx">
import Styled from '../../../packages/vue-primitives/src/dropdown-menu/stories/Styled.vue'
import Modality from '../../../packages/vue-primitives/src/dropdown-menu/stories/Modality.vue'
import Submenus from '../../../packages/vue-primitives/src/dropdown-menu/stories/Submenus.vue'
import WithLabels from '../../../packages/vue-primitives/src/dropdown-menu/stories/WithLabels.vue'
import NestedComposition from '../../../packages/vue-primitives/src/dropdown-menu/stories/NestedComposition.vue'
import SingleItemAsDialogTrigger from '../../../packages/vue-primitives/src/dropdown-menu/stories/SingleItemAsDialogTrigger.vue'
import MultipleItemsAsDialogTriggers from '../../../packages/vue-primitives/src/dropdown-menu/stories/MultipleItemsAsDialogTriggers.vue'
import CheckboxItems from '../../../packages/vue-primitives/src/dropdown-menu/stories/CheckboxItems.vue'
import RadioItems from '../../../packages/vue-primitives/src/dropdown-menu/stories/RadioItems.vue'
import PreventClosing from '../../../packages/vue-primitives/src/dropdown-menu/stories/PreventClosing.vue'
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
    <Demo title="NestedComposition">
      <NestedComposition />
    </Demo>
    <Demo title="SingleItemAsDialogTrigger">
      <SingleItemAsDialogTrigger />
    </Demo>
    <Demo title="MultipleItemsAsDialogTriggers">
      <MultipleItemsAsDialogTriggers />
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
  </DemoList>
</template>
