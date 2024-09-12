<script setup lang="tsx">
import CheckboxItems from '../../../packages/vue-primitives/src/menu/stories/CheckboxItems.vue'
import RadioItems from '../../../packages/vue-primitives/src/menu/stories/RadioItems.vue'
import Styled from '../../../packages/vue-primitives/src/menu/stories/Styled.vue'
import Submenus from '../../../packages/vue-primitives/src/menu/stories/Submenus.vue'
import Typeahead from '../../../packages/vue-primitives/src/menu/stories/Typeahead.vue'
import WithLabels from '../../../packages/vue-primitives/src/menu/stories/WithLabels.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Styled class="menu_nuxtBoxClass" />
    </Demo>

    <Demo title="Submenus">
      <Submenus class="menu_nuxtBoxClass" />
    </Demo>

    <Demo title="WithLabels">
      <WithLabels class="menu_nuxtBoxClass" />
    </Demo>

    <Demo title="Typeahead">
      <Typeahead class="menu_nuxtBoxClass" />
    </Demo>

    <Demo title="CheckboxItems">
      <CheckboxItems class="menu_nuxtBoxClass" />
    </Demo>

    <Demo title="RadioItems">
      <RadioItems class="menu_nuxtBoxClass" />
    </Demo>
  </DemoList>
</template>
