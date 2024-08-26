<script setup lang="tsx">
import Styled from '../../../packages/vue-primitives/src/dialog/stories/Styled.vue'
import NonModal from '../../../packages/vue-primitives/src/dialog/stories/NonModal.vue'
import Controlled from '../../../packages/vue-primitives/src/dialog/stories/Controlled.vue'
import FocusTrap from '../../../packages/vue-primitives/src/dialog/stories/FocusTrap.vue'
import CustomFocus from '../../../packages/vue-primitives/src/dialog/stories/CustomFocus.vue'
import NoEscapeDismiss from '../../../packages/vue-primitives/src/dialog/stories/NoEscapeDismiss.vue'
import NoPointerDownOutsideDismiss from '../../../packages/vue-primitives/src/dialog/stories/NoPointerDownOutsideDismiss.vue'
import WithPortalContainer from '../../../packages/vue-primitives/src/dialog/stories/WithPortalContainer.vue'
import Animated from '../../../packages/vue-primitives/src/dialog/stories/Animated.vue'
import InnerScrollable from '../../../packages/vue-primitives/src/dialog/stories/InnerScrollable.vue'
import OuterScrollable from '../../../packages/vue-primitives/src/dialog/stories/OuterScrollable.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Styled />
    </Demo>
    <Demo title="NonModal">
      <NonModal />
    </Demo>
    <Demo title="Controlled">
      <Controlled />
    </Demo>
    <Demo title="FocusTrap">
      <FocusTrap />
    </Demo>
    <Demo title="CustomFocus">
      <CustomFocus />
    </Demo>
    <Demo title="NoEscapeDismiss">
      <NoEscapeDismiss />
    </Demo>
    <Demo title="NoPointerDownOutsideDismiss">
      <NoPointerDownOutsideDismiss />
    </Demo>
    <Demo title="WithPortalContainer">
      <WithPortalContainer />
    </Demo>
    <Demo title="Animated">
      <Animated />
    </Demo>
    <Demo title="InnerScrollable">
      <InnerScrollable />
    </Demo>
    <Demo title="OuterScrollable">
      <OuterScrollable />
    </Demo>
  </DemoList>
</template>
