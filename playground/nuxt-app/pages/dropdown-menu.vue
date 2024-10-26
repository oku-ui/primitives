<script setup lang="tsx">
import CheckboxItems from '../../../packages/core/src/dropdown-menu/stories/CheckboxItems.vue'
import Modality from '../../../packages/core/src/dropdown-menu/stories/Modality.vue'
import MultipleItemsAsDialogTriggers from '../../../packages/core/src/dropdown-menu/stories/MultipleItemsAsDialogTriggers.vue'
import NestedComposition from '../../../packages/core/src/dropdown-menu/stories/NestedComposition.vue'
import PreventClosing from '../../../packages/core/src/dropdown-menu/stories/PreventClosing.vue'
import RadioItems from '../../../packages/core/src/dropdown-menu/stories/RadioItems.vue'
import SingleItemAsDialogTrigger from '../../../packages/core/src/dropdown-menu/stories/SingleItemAsDialogTrigger.vue'
import Styled from '../../../packages/core/src/dropdown-menu/stories/Styled.vue'
import Submenus from '../../../packages/core/src/dropdown-menu/stories/Submenus.vue'
import WithLabels from '../../../packages/core/src/dropdown-menu/stories/WithLabels.vue'
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
